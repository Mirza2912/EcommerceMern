import { Order } from "../models/order.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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
      .populate("orderItems.item")
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

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return next(new ApiError(`Order not found...!`, 400));
    }

    res
      .status(200)
      .json(new ApiResponse(200, order, `Order updated successfully...!`));
  } catch (error) {
    return next(
      new ApiError(`Something went wrong while fetching order...!`, 500)
    );
  }
});

export {
  newOrder,
  allOrders,
  singleOrder,
  getAllOrders,
  deleteOrderAdmin,
  getOrderByIdAdmin,
  updateOrderStatus,
};
