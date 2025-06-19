import React, { useEffect } from "react";
import Home from "./layout/Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import About from "./layout/Pages/About";
import Contact from "./layout/Pages/Contact";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./layout/Pages/Profile.jsx";
import Account from "./layout/Pages/Account.jsx";
import Navbar from "./layout/Components/Home/Navbar.jsx";
import OtpVerification from "./layout/Pages/OtpVerification.jsx";
import ProtectedRoute from "./layout/Routes/protectedRoute.jsx";
import { loadUser } from "./layout/store/UserSlice/userSliceReducers.js";
import EditProfile from "./layout/Components/User/EditProfile.jsx";
import UpdatePassword from "./layout/Components/User/UpdatePassword.jsx";
import ForgotPassword from "./layout/Components/User/ForgotPassword.jsx";
import ResetPassword from "./layout/Components/User/ResetPassword.jsx";

import Products from "./layout/Pages/Products.jsx";
import Footer from "./layout/Components/Footer/Footer.jsx";
import SingleProductDetails from "./layout/Pages/SingleProductDetail.jsx";
import Cart from "./layout/Pages/Cart.jsx";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "./layout/store/CartSlice/CartLocalStorageHandle.js";
import {
  addToCartBackend,
  getCart,
} from "./layout/store/CartSlice/CartSliceReducers.js";
import Checkout from "./layout/Pages/Order/Checkout.jsx";
import Shipping from "./layout/Pages/Order/Shipping.jsx";
import ConfirmOrder from "./layout/Pages/Order/ConfirmOrder.jsx";
import Payment from "./layout/Pages/Order/Payment.jsx";
import Order from "./layout/Pages/Order/Order.jsx";
import { getAllOrders } from "./layout/store/OrderSlice/orderSliceReducers.js";
import SingleOrderDetails from "./layout/Pages/Order/SingleOrderDetails.jsx";
import UserSpeedDial from "./layout/Components/Home/SpeedDial.jsx";
import NotFoundPage from "./layout/Components/NotFound/NotFoundPage.jsx";
import AdminRoute from "./layout/Routes/adminRoute.jsx";
import AllUsers from "./layout/Pages/Admin/Users/AllUsers.jsx";
import AllProducts from "./layout/Pages/Admin/Products/AllProducts.jsx";
import SingleUserDetails from "./layout/Pages/Admin/Users/SingleUserDetails.jsx";
import SingleProduct from "./layout/Pages/Admin/Products/SingleProductDetails.jsx";
import CreateNewProduct from "./layout/Pages/Admin/Products/CreateNewProduct.jsx";
import UpdateSingleProduct from "./layout/Pages/Admin/Products/UpdateSingleProduct.jsx";
import AllEmployee from "./layout/Pages/Admin/Employee/AllEmployee.jsx";
import SingleEmployee from "./layout/Pages/Admin/Employee/SingleEmployee.jsx";
import SingleEmployeeUpdate from "./layout/Pages/Admin/Employee/SingleEmployeeUpdate.jsx";
import CreateNewEmployee from "./layout/Pages/Admin/Employee/CreateNewEmployee.jsx";
import AllOrders from "./layout/Pages/Admin/Orders/AllOrders.jsx";
import SingleOrderDetailsAdmin from "./layout/Pages/Admin/Orders/SingleOrderDetailsAdmin.jsx";
import DashboardHome from "./layout/Pages/Admin/DashboardHome.jsx";
import ToastHandler from "./layout/Components/Utils/ToastHandler.jsx";
import AllSalesAdmin from "./layout/Pages/Admin/Sales/AllSalesAdmin.jsx";
import DashBoardLayout from "./layout/Pages/Admin/DashBoardLayout.jsx";
import SingleSaleAdmin from "./layout/Pages/Admin/Sales/SingleSaleAdmin.jsx";
import SingleEmployeeSales from "./layout/Pages/Admin/Employee/SingleEmployeeSales.jsx";
import EmployeeRoute from "./layout/Routes/employeeRoute.jsx";
import EmployeeDashboardHome from "./layout/Pages/Employee/EmployeeDashboardHome.jsx";
import EmployeeDashBoardLayout from "./layout/Pages/Employee/EmployeeDashboardLayout.jsx";
import CreateSaleByEmployee from "./layout/Pages/Employee/CreateSale/CreateSaleByEmployee.jsx";
import MySales from "./layout/Pages/Employee/MySale/MySales.jsx";
import SingleSaleByEmployee from "./layout/Pages/Employee/MySale/SingleSaleByEmployee.jsx";

const App = () => {
  const { isVerified, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
    if (isVerified) {
      const guestCart = loadCartFromLocalStorage(); //this will be an array
      // console.log(guestCart);

      //if logged in user have alreay select items when loggedout this will be store in backend also
      if (guestCart?.length > 0) {
        guestCart.forEach((item) => {
          dispatch(
            addToCartBackend({
              productId: item?.product,
              quantity: item?.quantity,
              price: item?.price,
            })
          );
        });
        saveCartToLocalStorage([]); // Clear Local Cart after sending
      }

      //if user logged in then fetch user cart
      dispatch(getCart());
    }
  }, [isVerified]);
  return (
    <>
      <ToastHandler />
      <Navbar />
      {isVerified && isVerified === true && <UserSpeedDial user={user} />}
      <div className="w-[100%] min-h-screen relative flex items-center justify-center flex-col bg-[url('/src/assets//body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<SingleProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/products/:keyword" element={<Products />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/register/otp-verification/:email/:phone"
            element={<OtpVerification />}
          />

          <Route path="/user/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/user/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/me/profile/update" element={<EditProfile />} />
            <Route path="/me/update-password" element={<UpdatePassword />} />
            <Route path="/checkout/*" element={<Checkout />}>
              <Route index element={<Shipping />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="order-confirm" element={<ConfirmOrder />} />
              <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="/user/orders" element={<Order />} />
            <Route path="/user/order/:id" element={<SingleOrderDetails />} />
          </Route>

          {/* /* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<DashBoardLayout />}>
              <Route index element={<DashboardHome />} />

              {/* Users  */}
              <Route path="users" element={<AllUsers />} />
              <Route
                path="users/single-user/details/:id"
                element={<SingleUserDetails />}
              />

              {/* products  */}
              <Route path="products" element={<AllProducts />} />
              <Route
                path="products/single-product/details/:id"
                element={<SingleProduct />}
              />
              <Route
                path="products/create-new-product"
                element={<CreateNewProduct />}
              />
              <Route
                path="products/product/update-product/:id"
                element={<UpdateSingleProduct />}
              />

              {/* Orders  */}
              <Route path="orders" element={<AllOrders />} />
              <Route
                path="orders/order/details/:id"
                element={<SingleOrderDetailsAdmin />}
              />

              <Route path="employee" element={<AllEmployee />} />
              <Route
                path="employee/single-employee/details/:id"
                element={<SingleEmployee />}
              />
              <Route
                path="employee/single-employee/update/:id"
                element={<SingleEmployeeUpdate />}
              />
              <Route
                path="employee/create-new-employee"
                element={<CreateNewEmployee />}
              />
              <Route
                path="employee/single-employee-sales/:id"
                element={<SingleEmployeeSales />}
              />

              {/* sales  */}
              <Route path="sales" element={<AllSalesAdmin />} />
              <Route
                path="sales/single-sale/:id"
                element={<SingleSaleAdmin />}
              />
            </Route>

            {/* Employees  */}
          </Route>

          {/* Employee Routes  */}
          <Route element={<EmployeeRoute />}>
            <Route
              path="/employee/dashboard"
              element={<EmployeeDashBoardLayout />}
            >
              <Route index element={<EmployeeDashboardHome />} />

              {/* Create Sale  */}
              <Route path="create-sale" element={<CreateSaleByEmployee />} />

              {/* My sales  */}
              <Route path="my-sales" element={<MySales />} />

              {/* single sale  */}
              <Route
                path="my-sales/single-sale/:id"
                element={<SingleSaleByEmployee />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />

          {/* <Route path="/search" element={<Search />} /> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
