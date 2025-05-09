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

// getting all orders --->Admin
const getAllOrders = AsyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json(new ApiResponse(200, orders, `All Orders...!`));
});

//update single order --->Admin
const updateOrder = AsyncHandler(async (req, res, next) => {});
export { newOrder, allOrders, singleOrder, getAllOrders, updateOrder };
