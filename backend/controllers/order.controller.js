import { Order } from "../models/order.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// placing new order
const newOrder = AsyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, order, `Order placed successfully...!`));
});

//getting all orders
const allOrders = AsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res
    .status(200)
    .json(new ApiResponse(200, orders, `${req.user.name}'s All Orders...!`));
});

// getting single order
const singleOrder = AsyncHandler(async (req, res, next) => {
  const singleOrder = await Order.findById(req.params.id).populate(
    "user",
    "name , email"
  );

  if (!singleOrder) {
    return next(
      new ApiError(`Order with id : ${req.params.id} is not found...!`, 400)
    );
  }
  res.status(200).json(new ApiResponse(200, singleOrder, `Single order...!`));
});

// getting all orders --->Admin
const getAllOrders = AsyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json(new ApiResponse(200, orders, `All Orders...!`));
});

//update single order --->Admin
const updateOrder = AsyncHandler(async (req, res, next) => {});
export { newOrder, allOrders, singleOrder, getAllOrders, updateOrder };
