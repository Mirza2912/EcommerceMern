import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  clearAddToFeaturedProduct,
  clearCreateNewProductMessage,
  clearDeleteProductMessage,
  clearMakeProductUnFeaturedMessage,
} from "../../store/ProductSlice/productSlice.js";

import {
  clearDeleteOrderAdminMessage,
  clearGetAllOrdersMessage,
  clearOrderItems,
  clearOrderPlaceMessage,
  clearShippingAddress,
  clearUpdateOrderStatusMessage,
} from "../../store/OrderSlice/orderSlice.js";

import {
  clearAddToCartBackednMessage,
  clearAddToCartUpdateBackendMessage,
  clearDeleteCartItemFromBackendMessage,
  clearUpdateCartLocal,
  clearCartLocal,
} from "../../store/CartSlice/CartSlice.js";

import {
  clearAdminDeleteEmployeeMessage,
  clearAdminDeleteUserMessage,
  cleareResetPasswordMessage,
  clearError,
  cleareUpdateProfileMessage,
  cleareUserDeleteMessage,
  clearForgotPasswordMessage,
  clearLoginMessage,
  clearLogoutMessage,
  clearRegisterMessage,
  clearSingleUserDetailsMessage,
  clearSuspendUserMessage,
  clearUnSuspendUserMessage,
  clearUpdateUserRoleMessage,
  clearUserPasswordMessage,
  clearVerificationMessage,
} from "../../store/UserSlice/userSlice.js";
import {
  clearCreateSaleMessage,
  clearDeleteSaleMessage,
  clearReturnSalemessage,
} from "../../store/SalesSlice/saleSlice.js";
import { clearWholeCartBackend } from "../../store/CartSlice/CartSliceReducers.js";
import { clearCreateNewCategoryMessage } from "../../store/CategorySlice/categorySlice.js";

const ToastHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    resgisterMessage,
    tempUser,
    verificationMessage,
    loginMessage,
    logOutMessage,
    updateProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
    forgotPasswordMessage,
    resetPasswordMessage,
    error,
    adminDeleteUserMessage,
    adminDeleteEmployeeMessage,
    suspendUserMessage,
    unSuspendUserMessage,
    updateUserRoleMessage,
  } = useSelector((state) => state.auth);

  const { createNewCategoryMessage } = useSelector((state) => state.category);

  const {
    deleteProductMessage,
    makeProductUnFeaturedMessage,
    addToFeaturedProduct,
    createNewProductMessage,
  } = useSelector((state) => state.product);

  const {
    updateCartOfLocalMessage,
    addToCartBackendMessage,
    addToCartUpdateBackendMessage,
    deleteCartItemFromBackendMessage,
  } = useSelector((state) => state.cart);

  const { deleteSaleMessage, createSaleMessage, returnSalemessage } =
    useSelector((state) => state.sale);

  const {
    orderPlacedMessage,
    order,
    getAllOrdersMessage,
    deleteOrderAdminMessage,
    updateOrderStatusMessage,
  } = useSelector((state) => state.order);

  /* USEEFFCART FOR TOAST AND CLEAR MESSAGES*/
  useEffect(() => {
    let timeout;

    /* FOR USER AUTHENTICATION */

    if (error) {
      if (error === "No token, authorization denied..!") {
        dispatch(clearError());
      } else {
        toast.error(error);
        dispatch(clearError());
      }
    }

    //user reagisteration success message show
    if (resgisterMessage) {
      toast.success(resgisterMessage);
      if (resgisterMessage !== "Employee created successfully...!") {
        navigate(
          `/register/otp-verification/${tempUser?.data?.email}/${tempUser?.data?.phone}`,
          {
            replace: true,
          }
        );
      }
      dispatch(clearRegisterMessage());
    }

    //user verification success message show
    if (verificationMessage) {
      toast.success(verificationMessage);
      navigate(`/`, {
        replace: true,
      });
      dispatch(clearVerificationMessage());
    }

    //user login success message show
    if (loginMessage) {
      toast.success(loginMessage);
      dispatch(clearLoginMessage());
      navigate("/");
    }

    //user logout success message show
    if (logOutMessage) {
      dispatch(clearError());
      toast.success(logOutMessage);
      dispatch(clearLogoutMessage());
      dispatch(clearCartLocal());
      navigate("/", { replace: true });
    }

    //user update profile success message show
    if (updateProfileMessage) {
      toast.success(updateProfileMessage);
      dispatch(cleareUpdateProfileMessage());
      navigate("/");
    }

    //user update password message success message show
    if (changeUserPasswordMessage) {
      toast.success(changeUserPasswordMessage);
      dispatch(clearUserPasswordMessage());
      navigate("/user/profile", { replace: true });
    }

    //user delete success message show
    if (deleteUserMessage) {
      toast.success(deleteUserMessage);
      dispatch(cleareUserDeleteMessage());
      navigate("/", { replace: true });
    }

    if (forgotPasswordMessage) {
      toast.success(forgotPasswordMessage);

      dispatch(clearForgotPasswordMessage());
      navigate("/account", { replace: true });
    }

    if (resetPasswordMessage) {
      toast.success(resetPasswordMessage);

      dispatch(cleareResetPasswordMessage());
      navigate("/account", { replace: true });
    }

    // /* FOR USER CART */

    //Add to cart item to backend message -->when user logged in
    if (addToCartBackendMessage) {
      toast.success(addToCartBackendMessage);
      dispatch(clearAddToCartBackednMessage());
    }

    //add item of cart to backend message -->when user logged in
    if (addToCartUpdateBackendMessage) {
      toast.success(addToCartUpdateBackendMessage);
      dispatch(clearAddToCartUpdateBackendMessage());
    }

    //update item of cart to backend message
    if (updateCartOfLocalMessage) {
      toast.success(updateCartOfLocalMessage);
      dispatch(clearUpdateCartLocal());
    }

    //delet item of cart to backend message
    if (deleteCartItemFromBackendMessage) {
      toast.success(deleteCartItemFromBackendMessage);
      dispatch(clearDeleteCartItemFromBackendMessage());
    }

    ///* Order */
    if (orderPlacedMessage) {
      toast.success(orderPlacedMessage);
      dispatch(clearOrderPlaceMessage());
      dispatch(clearCartLocal());
      dispatch(clearWholeCartBackend());
      dispatch(clearShippingAddress());
      dispatch(clearOrderItems());
    }

    if (getAllOrdersMessage) {
      toast.success(getAllOrdersMessage);
      dispatch(clearGetAllOrdersMessage());
    }

    //admin
    if (adminDeleteUserMessage) {
      toast.success(adminDeleteUserMessage);
      dispatch(clearAdminDeleteUserMessage());
    }

    if (adminDeleteEmployeeMessage) {
      toast.success(adminDeleteEmployeeMessage);
      dispatch(clearAdminDeleteEmployeeMessage());
    }

    if (deleteProductMessage) {
      toast.success(deleteProductMessage);
      dispatch(clearDeleteProductMessage());
    }

    if (addToFeaturedProduct) {
      toast.success(addToFeaturedProduct);
      dispatch(clearAddToFeaturedProduct());
    }

    if (makeProductUnFeaturedMessage) {
      toast.success(makeProductUnFeaturedMessage);
      dispatch(clearMakeProductUnFeaturedMessage());
    }

    if (deleteOrderAdminMessage) {
      toast.success(deleteOrderAdminMessage);
      dispatch(clearDeleteOrderAdminMessage());
    }

    if (updateOrderStatusMessage) {
      toast.success(updateOrderStatusMessage);
      dispatch(clearUpdateOrderStatusMessage());
    }

    if (suspendUserMessage) {
      toast.success(suspendUserMessage);
      dispatch(clearSuspendUserMessage());
    }
    if (unSuspendUserMessage) {
      toast.success(unSuspendUserMessage);
      dispatch(clearUnSuspendUserMessage());
    }

    if (updateUserRoleMessage) {
      toast.success(updateUserRoleMessage);
      dispatch(clearUpdateUserRoleMessage());
    }

    if (deleteSaleMessage) {
      toast.success(deleteSaleMessage);
      dispatch(clearDeleteSaleMessage());
    }

    if (createSaleMessage) {
      toast.success(createSaleMessage);
      dispatch(clearCreateSaleMessage());
    }

    if (returnSalemessage) {
      toast.success(returnSalemessage);
      dispatch(clearReturnSalemessage());
    }

    if (createNewProductMessage) {
      toast.success(createNewProductMessage);
    }

    if (createNewCategoryMessage) {
      toast.success(createNewCategoryMessage);
      dispatch(clearCreateNewCategoryMessage());
    }

    return () => clearTimeout(timeout);
  }, [
    error,
    resgisterMessage,
    verificationMessage,
    loginMessage,
    logOutMessage,
    updateProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
    forgotPasswordMessage,
    resetPasswordMessage,
    updateCartOfLocalMessage,
    addToCartBackendMessage,
    addToCartUpdateBackendMessage,
    deleteCartItemFromBackendMessage,
    orderPlacedMessage,
    getAllOrdersMessage,
    adminDeleteUserMessage,
    deleteProductMessage,
    addToFeaturedProduct,
    makeProductUnFeaturedMessage,
    deleteOrderAdminMessage,
    updateOrderStatusMessage,
    adminDeleteEmployeeMessage,
    suspendUserMessage,
    unSuspendUserMessage,
    updateUserRoleMessage,
    deleteSaleMessage,
    createSaleMessage,
    returnSalemessage,
    createNewProductMessage,
    createNewCategoryMessage,
  ]);
  return null;
};

export default ToastHandler;
