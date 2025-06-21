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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: [true, "Category is required...!"],
    },
    description: {
      type: String,
      required: [true, "Description is required...!"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required...!"],
      maxLength: [8, "Price cannot exceed 8 characters...!"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required...!"],
      maxLength: [4, "Stock cannot exceed 4 characters...!"],
      default: 1,
    },
    discount: {
      type: Number,
      required: [true, "Discount field is required...!"],
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
          required: [true, "Image url is required...!"],
        },
      },
    ],
    isReturnAble: {
      type: Boolean,
      required: [true, "isReturnAble field is required...!"],
      default: false,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productDetails: {
      type: mongoose.Schema.Types.Mixed, //scalable field
      default: {},
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBannerProduct: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
