import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required...!"],
      min: [3, "Name must be at least of 3 characters...!"],
      max: [100, "Name must no be more than 100 characters...!"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required...!"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: [true, "Product image is required...!"],
          trim: true,
        },
        url: {
          type: String,
          required: [true, "Image url is required...!"],
          trim: true,
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Product price is required...!"],
      maxLength: [8, "Price cannot exceed 8 characters...!"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required...!"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required...!"],
      maxLength: [4, "Stock cannot exceed 4 characters...!"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    // reviews: [
    //   {
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       required: true,
    //     },
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     rating: {
    //       type: Number,
    //       required: true,
    //     },
    //     comment: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
