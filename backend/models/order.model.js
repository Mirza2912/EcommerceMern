import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Shipping address is required...!"],
      },
      city: {
        type: String,
        required: [true, "Shipping City is required...!"],
      },
      state: {
        type: String,
        required: [true, "Shipping State is required...!"],
      },
      country: {
        type: String,
        required: [true, "Shipping Country is required...!"],
      },
      postalCode: {
        type: Number,
        required: [true, "PinCode is required...!"],
      },
      phoneNo: {
        type: Number,
        required: [true, "Phone number is required...!"],
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "Product name is required...!"],
        },
        quantity: {
          type: Number,
          required: [true, "Product quantity is required...!"],
        },
        price: {
          type: Number,
          required: [true, "Product price is required...!"],
        },
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required...!"],
        },
        image: {
          public_id: { type: String },
          url: { type: String },
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required...!"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    paidAt: {
      type: Date,
    },
    itemsPrice: {
      type: Number,
      default: 0,
      required: [true, "Items Price is required...!"],
    },
    taxPrice: {
      type: Number,
      required: [true, "Tax Price is required...!"],
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: [true, "Shipping Price is required...!"],
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is required...!"],
      default: 0,
    },
    orderStatus: {
      type: String,
      required: [true, "Order status is required...!"],
      default: "Processing",
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
