import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleProductDetails } from "../../../store/ProductSlice/productSliceReducers";
import { useParams } from "react-router-dom";
import {
  getAllCategories,
  createNewCategory,
} from "../../../store/CategorySlice/categorySliceReducers";
import { FaTrash } from "react-icons/fa";
import {
  AiOutlineTag,
  AiOutlineDollar,
  AiOutlineStock,
  AiOutlinePercentage,
} from "react-icons/ai";
import { MdDescription, MdCategory } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { IoIosAddCircle, IoMdAdd } from "react-icons/io";
import SubmitButton from "../../../Components/SubmitButton/SubmitButton";
import { updateProduct } from "../../../store/ProductSlice/productSliceReducers";

const UpdateSingleProduct = () => {
  const { id } = useParams();

  const { singleProduct, loading } = useSelector((state) => state.product);

  let singleProductAdmin = singleProduct[id];
  console.log(singleProductAdmin);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isReturnAble, setIsReturnAble] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBannerProduct, setIsBannerProduct] = useState(false);
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(createNewCategory(newCategory));
      setNewCategory("");
    }
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagesPreview(imagesPreview.filter((_, i) => i !== index));
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    if (name) myForm.set("name", name);
    if (price) myForm.set("price", price);
    if (description) myForm.set("description", description);
    if (category) myForm.set("category", category);
    if (stock) myForm.set("Stock", stock);
    if (discount) myForm.set("discount", discount);

    myForm.set("isReturnAble", isReturnAble);
    myForm.set("isBannerProduct", isBannerProduct);
    myForm.set("isFeatured", isFeatured);

    images.forEach((base64, index) => {
      if (typeof base64 === "string") {
        const byteString = atob(base64.split(",")[1]);
        const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        myForm.append("images", blob, `image-${index}.png`);
      } else {
        myForm.append("images", base64); // If it's a File object
      }
    });

    dispatch(updateProduct({ myForm, productId: id }));
  };

  useEffect(() => {
    dispatch(singleProductDetails(id));
  }, []);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (singleProductAdmin) {
      setName(singleProductAdmin.name || "");
      setPrice(singleProductAdmin.price || "");
      setDescription(singleProductAdmin.description || "");
      setCategory(singleProductAdmin.category?._id || ""); // if category is populated
      setIsReturnAble(singleProductAdmin.isReturnAble || false);
      setIsFeatured(singleProductAdmin.isFeatured || false);
      setIsBannerProduct(singleProductAdmin.isBannerProduct || false);
      setStock(singleProductAdmin.stock || "");
      setDiscount(singleProductAdmin.discount || 0);
      setImages(singleProductAdmin.images || []);
      setImagesPreview(singleProductAdmin.images || []);
    }
  }, [singleProductAdmin]);

  return (
    <section className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-white text-4xl font-bold mb-4">Update Product</h2>
      <form
        encType="multipart/form-data"
        onSubmit={updateProductSubmitHandler}
        className="space-y-6 bg-black/60 backdrop-blur-lg shadow-md p-6 rounded-lg border border-gray-700"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white mb-1">
              Product Name:
            </label>
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                placeholder="Product Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9 text-white bg-transparent w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
              />
              <AiOutlineTag className="text-xl text-gold absolute left-2 top-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Price:</label>
            <div className="flex items-center gap-2 relative">
              <input
                type="number"
                placeholder="Product price..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-9  text-white bg-transparent w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
              />
              <AiOutlineDollar className="text-xl text-gold absolute left-2 top-3" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Description:</label>
          <div className="flex items-center gap-2 relative">
            <textarea
              rows="4"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pl-9 text-white pt-2 bg-transparent w-full  px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
            />
            <MdDescription className="text-xl text-gold absolute left-2 top-3" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 items-center relative">
          <div className="w-full">
            <label className="block text-sm text-white mb-1">Category:</label>
            <div className="relative">
              <MdCategory className="text-xl text-gold absolute left-2 top-3" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="pl-8 text-white bg-transparent font-normal w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
              >
                <option className="text-black" value="">
                  Select Category
                </option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm text-white mb-1">
              Add New Category:
            </label>
            <div className="flex gap-2 relative">
              <IoMdAdd className="text-xl text-gold absolute left-2 top-3" />
              <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="pl-8 text-white bg-transparent  font-normal w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3 py-2 bg-green-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white mb-1">Stock:</label>
            <div className="flex items-center gap-2 relative">
              <input
                type="number"
                placeholder="Stock..."
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="pl-9 bg-transparent text-white font-normal w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
              />
              <AiOutlineStock className="text-xl text-gold absolute left-2 top-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Discount:</label>
            <div className="flex items-center gap-2 relative">
              <input
                type="number"
                placeholder="Discount... Rs.00"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="pl-9 bg-transparent text-white font-normal w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
              />
              <AiOutlinePercentage className="text-xl text-gold absolute left-2 top-3" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isReturnAble}
              onChange={(e) => setIsReturnAble(e.target.checked)}
              className="w-4 h-4 accent-gold"
            />
            <label>Returnable</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 accent-gold"
            />
            <label>Featured</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isBannerProduct}
              onChange={(e) => setIsBannerProduct(e.target.checked)}
              className="w-4 h-4 accent-gold"
            />
            <label>Banner Product</label>
          </div>
        </div>
        <div className="flex items-center gap-2 relative col-span-2">
          <BiImageAdd className="text-xl text-gold absolute left-2 top-3" />
          <label
            htmlFor="imageUpload"
            className="pl-9 flex items-center bg-transparent cursor-pointer text-gray-400 font-normal w-full h-10 px-3 rounded-md border border-gray-700 hover:border-gold hover:ring-1 hover:ring-gold"
          >
            Choose Files
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
            className="hidden"
          />
        </div>
        <div className="flex flex-wrap gap-4 col-span-2">
          {imagesPreview.map((img, index) => (
            <div key={index} className="relative w-20 h-20">
              <img
                src={img.url || img}
                alt={img.public_id || "Preview"}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(index)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="w-[50%] mx-auto">
          <SubmitButton
            type="submit"
            isLoading={loading}
            input="Create Product"
            instead="Create Product"
          />
        </div>
      </form>
    </section>
  );
};

export default UpdateSingleProduct;
