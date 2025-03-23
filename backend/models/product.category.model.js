import { model, Schema } from "mongoose";

const productCategorySchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category name is required...!"],
      unique: [true, "Category must be unique...!"],
    },
  },
  { timestamps: true }
);
export const ProductCategory = model("ProductCategory", productCategorySchema);
