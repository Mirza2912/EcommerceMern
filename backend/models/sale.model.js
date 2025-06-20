import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    saleType: {
      type: String,
      enum: ["ONLINE", "PHYSICAL"],
      required: true,
    },
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
        discont: Number,
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        isReturned: {
          type: Boolean,
          default: false,
        },
        returnedQuantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    returnedAmount: {
      type: Number,
      default: 0, // 🆕 Total returned Rs. value
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
    },
    customerNumber: {
      type: Number,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    returnedAt: {
      type: Date,
    },
    saleId: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Sale = mongoose.model("Sale", saleSchema);
