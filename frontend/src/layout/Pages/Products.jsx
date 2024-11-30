import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Components/Home/Toast";
import { useNavigate } from "react-router-dom";
import { clearError } from "../store/ProductSlice/productSlice";
import { getAllProducts } from "../store/ProductSlice/productSliceReducers";
import Card from "../Components/Home/Card";

const Products = () => {
  //useState for selecting category all notebook et
  const [selectProduct, setSelectProduct] = useState("All");

  //getting all products
  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );
  // console.log(products);

  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    if (error) {
      Toast(error, "error");
      Dispatch(clearError());
    }
    Dispatch(getAllProducts());
    // Toast("Data fetched successfully", "success");
  }, [Dispatch, error, Toast]);

  return (
    <div className="w-[100%] min-h-[100vh] font-roboto flex flex-col items-center justify-center gap-20 bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
      {/* products selection  */}

      <div className="w-full mt-[15vmax]  flex items-center justify-center gap-5">
        <div
          className="w-32 flex flex-col items-center justify-center gap-2 "
          onClick={() => setSelectProduct("All")}
        >
          <figure className="w-[100%] h-32 cursor-pointer ">
            <img
              className="w-[100%] hover:scale-105 transition-all duration-300 h-[100%] bg-cover bg-center rounded-full"
              src={`https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Republic_Of_Korea_Broadcasting-TV_Rating_System%28ALL%29.svg/1200px-Republic_Of_Korea_Broadcasting-TV_Rating_System%28ALL%29.svg.png`}
              alt=""
            />
          </figure>
          <p className=" font-semibold font-roboto text-lg text-gold cursor-pointer">
            All
          </p>
        </div>
        <div
          className="w-32 flex flex-col items-center justify-center gap-2 "
          onClick={() => setSelectProduct("Books")}
        >
          <figure className="w-[100%] h-32 cursor-pointer ">
            <img
              className="w-[100%] hover:scale-105 transition-all duration-300 h-[100%] bg-cover bg-center rounded-full"
              src={`https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip`}
              alt=""
            />
          </figure>
          <p className="font-semibold font-roboto text-lg text-gold cursor-pointer">
            Books
          </p>
        </div>
        <div
          className="w-32 flex flex-col items-center justify-center gap-2 "
          onClick={() => setSelectProduct("NoteBooks")}
        >
          <figure className="w-[100%] h-32 cursor-pointer ">
            <img
              className="w-[100%] hover:scale-105 transition-all duration-300 h-[100%] bg-cover bg-center rounded-full"
              src={`https://m.media-amazon.com/images/I/71u5-wVIYuL._AC_SL1500_.jpg`}
              alt=""
            />
          </figure>
          <p className="font-semibold font-roboto text-lg text-gold cursor-pointer">
            Note Books
          </p>
        </div>
        <div
          className="w-32 flex flex-col items-center justify-center gap-2 "
          onClick={() => setSelectProduct("Stationary")}
        >
          <figure className="w-[100%] h-32 cursor-pointer ">
            <img
              className="w-[100%] hover:scale-105 transition-all duration-300 h-[100%] bg-cover bg-center rounded-full"
              src={`https://profit.pakistantoday.com.pk/wp-content/uploads/2018/07/k%C4%B1rtasiye1.jpg`}
              alt=""
            />
          </figure>
          <p className="font-semibold font-roboto text-lg text-gold cursor-pointer">
            Stationary
          </p>
        </div>
      </div>
      {/* //All Products  */}
      <div className="w-[100%] flex flex-col items-center justify-center xxsm:w-[90%] xsm:w-[80%] sm:w-[95%] md:w-[90%] sml:w-[100%] slg:w-[95%] xlg:w-[1150px] sml:px-3  bg-bg-color font-roboto">
        <div className="filters text-white flex items-center justify-between w-[100%]">
          <div className="">display</div>
          <div className="">{productCount}</div>
          <div className="">dropdown</div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-10 sml:gap-4 slg:gap-5 my-[6vmax] w-[100%]">
          {products &&
            products.map((product) => {
              return <Card key={product._id} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Products;
