import { Product } from "../models/product.model.js";
import { Sale } from "../models/sale.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const createPhysicalOrder = AsyncHandler(async (req, res, next) => {
  try {
    const { items, totalAmount, customerName, customerNumber } = req.body;

    if (req.user.role !== "employee") {
      return next(new ApiError("Unauthorized to create physical sale", 403));
    }

    function generateSaleId() {
      return Math.floor(10000000 + Math.random() * 90000000).toString();
    }

    const saleData = {
      saleType: "PHYSICAL",
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount || 0, // Optional discount field
        item: item.item, // 🟢 productId is passed now
      })),
      totalAmount,
      createdBy: req.user._id,
      customerName: customerName || "Unknown Customer",
      customerNumber: customerNumber || null,
      saleId: generateSaleId(),
    };

    const sale = await Sale.create(saleData);

    await Promise.all(
      sale.items.map((item) =>
        Product.findByIdAndUpdate(
          item?.item,
          { $inc: { stock: -item.quantity, sold: item.quantity } },
          { new: true }
        )
      )
    );
    // console.log(products);

    res.status(201).json(new ApiResponse(201, sale, "Physical sale recorded"));
  } catch (error) {
    console.log(error);
    return next(new ApiError(`Something went wrong while recording sale`, 500));
  }
});

//by admin
const getAllSales = AsyncHandler(async (req, res, next) => {
  try {
    const sales = await Sale.find()
      .populate("createdBy", "name role email")
      .populate({
        path: "orderId",
        populate: {
          path: "user",
          select: "name email role",
        },
      })
      .populate("items", "name price quantity")
      .populate({
        path: "items.item", // ✅ this is the nested path inside the arra
        select: "name price stock images", // fields you want from product
      })
      .sort({ createdAt: -1 });

    const onlineSales = await Sale.aggregate([
      { $match: { saleType: "ONLINE" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const physicalSales = await Sale.aggregate([
      { $match: { saleType: "PHYSICAL" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          sales,
          onlineSalesTotal: onlineSales[0]?.total || 0,
          physicalSalesTotal: physicalSales[0]?.total || 0,
          combinedTotal:
            (onlineSales[0]?.total || 0) + (physicalSales[0]?.total || 0),
        },
        "All sales fetched"
      )
    );
  } catch (error) {
    console.log(error);

    return next(
      new ApiError(`Something went wrong while fetching sales...!`, 500)
    );
  }
});

//get by employee
const getMyPhysicalSales = AsyncHandler(async (req, res, next) => {
  try {
    const { range, startDate, endDate } = req.query;

    let dateFilter = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to 00:00:00

    if (range === "today") {
      dateFilter = {
        createdAt: {
          $gte: today,
        },
      };
    } else if (range === "last7days") {
      const last7Days = new Date();
      last7Days.setDate(today.getDate() - 7);
      dateFilter = {
        createdAt: {
          $gte: last7Days,
          $lte: new Date(),
        },
      };
    } else if (range === "thisMonth") {
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      dateFilter = {
        createdAt: {
          $gte: firstDayOfMonth,
          $lte: new Date(),
        },
      };
    } else if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    }

    const filter = {
      saleType: "PHYSICAL",
      createdBy: req.user._id,
      ...dateFilter, // If empty, will not apply filter
    };

    const sales = await Sale.find(filter)
      .populate("createdBy", "name email role")
      .populate({
        path: "orderId",
        populate: {
          path: "user",
          select: "name email role",
        },
      })
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(
        new ApiResponse(200, sales, "Your physical sales fetched successfully")
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError("Something went wrong while fetching your sales", 500)
    );
  }
});

//get single sale by employee
const getSingleSaleEmployee = AsyncHandler(async (req, res, next) => {
  try {
    // console.log("hjgiug");

    const sale = await Sale.findOne({
      _id: req.params.id,
      createdBy: req.user._id, // only your own sales
    })
      .populate("createdBy", "name email role")
      .populate({
        path: "items.item", // ✅ this is the nested path inside the array
        select: "images", // fields you want from product
      });

    if (!sale) {
      return next(new ApiError("Sale not found", 404));
    }

    res.status(200).json(new ApiResponse(200, sale, "Sale details"));
  } catch (err) {
    return next(new ApiError("Failed to fetch sale", 500));
  }
});

//get sale of specific employee
const getSalesOfEmployee = AsyncHandler(async (req, res, next) => {
  try {
    // console.log("hjgiug");

    const sales = await Sale.find({
      createdBy: req.params.id,
      saleType: "PHYSICAL",
    })
      .populate("createdBy", "name email role")
      .populate("items", "name price quantity")
      .populate({
        path: "items.item",
        select: "images",
      });
    // console.log(sales);

    if (!sales) {
      return next(new ApiError("Sale not found", 404));
    }

    res.status(200).json(new ApiResponse(200, sales, "Sale details"));
  } catch (err) {
    return next(new ApiError("Failed to fetch sale", 500));
  }
});

//get single sale by employee
const getSingleSale = AsyncHandler(async (req, res, next) => {
  try {
    // console.log("hjgiug");

    const sale = await Sale.findById(req.params.id)
      .populate("createdBy", "name email role")
      .populate({
        path: "orderId",
        populate: {
          path: "user",
          select: "name email role",
        },
      })
      .populate({
        path: "items.item", // ✅ this is the nested path inside the array
        select: "images", // fields you want from product
      });

    if (!sale) {
      return next(new ApiError("Sale not found", 404));
    }

    res.status(200).json(new ApiResponse(200, sale, "Sale details"));
  } catch (err) {
    return next(new ApiError("Failed to fetch sale", 500));
  }
});

//cancel sale by employee
const cancelMySale = AsyncHandler(async (req, res, next) => {
  try {
    const sale = await Sale.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!sale) return next(new ApiError("Sale not found", 404));

    const timeLimit = new Date(Date.now() - 30 * 60 * 1000); // 30 min
    if (sale.createdAt < timeLimit) {
      return next(new ApiError("Too late to cancel", 400));
    }

    await Sale.deleteOne({ _id: sale._id });

    // Optional: restore stock logic

    res
      .status(200)
      .json(new ApiResponse(200, null, "Sale cancelled successfully"));
  } catch (err) {
    console.log(err);

    return next(new ApiError("Cancel failed", 500));
  }
});

const getMySaleSummary = AsyncHandler(async (req, res, next) => {
  try {
    console.log("helel");

    const sales = await Sale.aggregate([
      { $match: { createdBy: req.user._id, saleType: "PHYSICAL" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(200, sales[0] || { totalSales: 0, count: 0 }, "Summary")
      );
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to fetch summary", 500));
  }
});

const returnPhysicalSale = AsyncHandler(async (req, res, next) => {
  const saleId = req.params.id;
  const items = req.body.items; // Format: [{ _id, returnQuantity }]

  try {
    // Step 1: Find the sale
    const sale = await Sale.findOne({
      _id: saleId,
      createdBy: req.user._id,
      saleType: "PHYSICAL",
    });

    if (!sale) return next(new ApiError("Sale not found", 404));

    // Step 2: Return time check (7 days)
    const allowedReturnTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const timeSinceSale = Date.now() - new Date(sale.createdAt).getTime();

    if (timeSinceSale > allowedReturnTime) {
      return next(new ApiError("Return time has expired", 400));
    }

    // Step 3: Track returned amount
    let totalReturnedAmount = 0;

    // Step 4: Process return items
    for (const returned of items) {
      const saleItem = sale.items.find(
        (itm) => itm._id.toString() === returned._id
      );

      if (!saleItem) continue;

      const validQty =
        returned.returnQuantity &&
        returned.returnQuantity > 0 &&
        returned.returnQuantity + saleItem.returnedQuantity <=
          saleItem.quantity;

      if (validQty) {
        // Step 4a: Update product stock
        await Product.findByIdAndUpdate(saleItem.item, {
          $inc: { stock: returned.returnQuantity },
        });

        // Step 4b: Update return quantity
        saleItem.returnedQuantity += returned.returnQuantity;

        // Step 4c: Mark item as returned if fully returned
        if (saleItem.returnedQuantity >= saleItem.quantity) {
          saleItem.isReturned = true;
        }

        // Step 4d: Calculate returned value
        const itemReturnAmount =
          returned.returnQuantity * saleItem.price -
          returned.returnQuantity * (saleItem.discont || 0);

        totalReturnedAmount += itemReturnAmount;
      }
    }

    // Step 5: Mark sale as returned (even partial)
    sale.isReturned = true;
    sale.returnedAt = new Date();
    sale.returnedAmount = totalReturnedAmount;

    await sale.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, sale, "Selected items returned successfully.")
      );
  } catch (error) {
    console.error("Return error:", error);
    return next(new ApiError("Error while processing return", 500));
  }
});

const deleteSingleSale = AsyncHandler(async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return next(new ApiError("Sale not found", 404));
    }

    await Sale.deleteOne({ _id: sale._id });

    res.status(200).json(new ApiResponse(200, "Sale deleted successfully"));
  } catch (error) {
    console.error(error);
    return next(new ApiError("Failed to delete sale", 500));
  }
});
export {
  createPhysicalOrder,
  getAllSales,
  getMyPhysicalSales,
  getSingleSaleEmployee,
  cancelMySale,
  getMySaleSummary,
  deleteSingleSale,
  returnPhysicalSale,
  getSingleSale,
  getSalesOfEmployee,
};
