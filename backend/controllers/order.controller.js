import { Order } from "../models/order.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Sale } from "../models/sale.model.js";
import { Product } from "../models/product.model.js";

// placing new order
const newOrder = AsyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice = 0,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    // console.log(req.user._id);

    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    const duplicateOrder = await Order.findOne({
      user: req.user._id,
      totalPrice,
      "orderItems.name": { $in: orderItems?.map((item) => item.name) },
      createdAt: { $gte: oneMinuteAgo },
    });

    if (duplicateOrder) {
      return next(
        new ApiError(
          `Order not created...!Duplicate order detected. Please wait before trying again.`,
          400
        )
      );
    }

    const orderData = {
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
      paidAt: paymentMethod === "CARD" ? Date.now() : null,
      isPaid: paymentMethod === "CARD" ? true : false,
    };

    const order = await Order.create(orderData);

    if (!order) {
      return next(new ApiError(`Order not created...!`, 500));
    }

    res
      .status(201)
      .json(new ApiResponse(201, order, `Order placed successfully...!`));
  } catch (error) {
    return next(new ApiError(`Something went wrong placing order...!`, 500));
  }
});

//getting all orders
const allOrders = AsyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (!orders) {
      return next(new ApiError(`Orders not found...!`, 500));
    }
    res
      .status(200)
      .json(new ApiResponse(200, orders, `${req.user?.name}'s All Orders...!`));
  } catch (error) {
    return next(
      new ApiError(`Something went wrong while getting orders...!`, 500)
    );
  }
});

// getting single order
const singleOrder = AsyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log(id);

    if (!id) {
      return next(new ApiError(`Id is required...!`, 400));
    }
    const singleOrder = await Order.findById(id).populate(
      "user",
      "name , email"
    );

    if (!singleOrder) {
      return next(
        new ApiError(`Order with id : ${req.params.id} is not found...!`, 400)
      );
    }
    res.status(200).json(new ApiResponse(200, singleOrder, `Single order...!`));
  } catch (error) {
    return next(
      new ApiError(`Something went wrong while fetching order...!`, 500)
    );
  }
});

/* ADMIN METHODS  */
// getting all orders --->Admin
const getAllOrders = AsyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name , email , avatar")
      .populate("orderItems")
      .sort({ createdAt: -1 });

    if (!orders) {
      return next(new ApiError(`Orders not found...!`, 400));
    }
    res.status(200).json(new ApiResponse(200, orders, `All Orders...!`));
  } catch (error) {
    return next(
      new ApiError(`Something went wrong while fetching orderss...!`, 500)
    );
  }
});

//delete order --->Admin
const deleteOrderAdmin = AsyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(new ApiError(`Orders not found...!`, 400));
    }

    res
      .status(200)
      .json(new ApiResponse(200, order, `Order deleted successfully...!`));
  } catch (error) {
    return next(
      new ApiError(`Something went wrong while deleting orderss...!`, 500)
    );
  }
});

//get single order order --->Admin
const getOrderByIdAdmin = AsyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email role")
      .populate("orderItems.item", "name price images");

    if (!order) {
      return next(new ApiError(`Orders not found...!`, 400));
    }

    res
      .status(200)
      .json(new ApiResponse(200, order, `Single order details...!`));
  } catch (error) {
    return next(
      new ApiError(`Something went wrong while fetching order...!`, 500)
    );
  }
});

//update order status--->Admin
const updateOrderStatus = AsyncHandler(async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ApiError(`Order not found...!`, 400));
    }

    order.orderStatus = status;

    if (status === "Delivered") {
      order.deliveredAt = Date.now();
      order.isPaid = true; // Assuming delivered orders are paid
      if (order.paymentMethod === "COD") {
        order.paidAt = Date.now();
      } // Set paidAt if payment method is COD
      const existingSale = await Sale.findOne({ orderId: order._id });

      if (!existingSale) {
        const saleData = {
          orderId: order._id,
          saleType: "ONLINE",
          items: order.orderItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0,
            item: item.item,
          })),
          totalAmount: order.totalPrice,
          createdBy: req.user._id,
        };

        const sale = await Sale.create(saleData);

        await Promise.all(
          sale.items.map((item) =>
            Product.findByIdAndUpdate(
              item.item,
              { $inc: { stock: -item.quantity, sold: item.quantity } },
              { new: true }
            )
          )
        );
      }
    }

    await order.save();

    res
      .status(200)
      .json(new ApiResponse(200, order, `Order updated successfully...!`));
  } catch (error) {
    return next(
      new ApiError(`Something went wrong while fetching order...!`, 500)
    );
  }
});

//cancle request order from user
const cancelOrder = AsyncHandler(async (req, res, next) => {
  const { orderId, reason } = req.body;

  const order = await Order.findById(orderId);

  if (!order) return next(new ApiError("Order not found", 404));

  if (order.user.toString() !== req.user._id.toString()) {
    return next(new ApiError("Unauthorized to cancel this order", 403));
  }

  if (order.orderStatus === "Delivered" || order.isCancelled) {
    return next(new ApiError("Order already delivered or cancelled", 400));
  }

  // Restore product stock
  for (const item of order.orderItems) {
    await Product.findByIdAndUpdate(item.item, {
      $inc: { stock: item.quantity },
    });
  }

  order.orderStatus = "Cancelled";
  order.cancelReason = reason || "User cancelled the order";
  order.isCancelled = true;
  order.cancelledAt = Date.now();

  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order cancelled successfully"));
});

//request return from user
const requestReturn = AsyncHandler(async (req, res, next) => {
  const { orderId, reason } = req.body;

  const order = await Order.findById(orderId);

  if (!order) return next(new ApiError("Order not found", 404));

  if (order.user.toString() !== req.user._id.toString()) {
    return next(new ApiError("Unauthorized to return this order", 403));
  }

  if (order.orderStatus !== "Delivered") {
    return next(new ApiError("Only delivered orders can be returned", 400));
  }

  if (order.isReturned || order.orderStatus === "Return Requested") {
    return next(new ApiError("Return already requested or completed", 400));
  }

  order.orderStatus = "Return Requested";
  order.returnReason = reason || "User requested return";

  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Return requested successfully"));
});

//return approvel from admin
const approveReturn = AsyncHandler(async (req, res, next) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) return next(new ApiError("Order not found", 404));

  if (order.orderStatus !== "Return Requested") {
    return next(new ApiError("No return request found on this order", 400));
  }

  // Update stock for returned items
  for (const item of order.orderItems) {
    await Product.findByIdAndUpdate(item.item, {
      $inc: { stock: item.quantity },
    });
  }

  order.orderStatus = "Returned";
  order.isReturned = true;
  order.returnApprovedAt = Date.now();

  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Return approved successfully"));
});

//admin reject return
const rejectReturn = AsyncHandler(async (req, res, next) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) return next(new ApiError("Order not found", 404));

  if (order.orderStatus !== "Return Requested") {
    return next(new ApiError("No return request to reject", 400));
  }

  order.orderStatus = "Return Rejected";

  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Return rejected successfully"));
});

export {
  newOrder,
  allOrders,
  singleOrder,
  getAllOrders,
  deleteOrderAdmin,
  getOrderByIdAdmin,
  updateOrderStatus,
  cancelOrder,
  requestReturn,
  approveReturn,
  rejectReturn,
};
