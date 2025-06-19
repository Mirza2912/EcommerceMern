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
          ref: "Product", // 🟢 Add this to track which product was sold
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // could be admin, employee, or user
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
