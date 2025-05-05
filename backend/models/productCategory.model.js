import mongoose, { model, Schema } from "mongoose";

const productCategorySchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category name is required...!"],
      unique: [true, "Category must be unique...!"],
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const ProductCategory = model("ProductCategory", productCategorySchema);
