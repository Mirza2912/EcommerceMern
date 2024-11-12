import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { userLogout } from "../store/Action/userActions.js";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // //fetching data from user state
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  console.log(user && user.data);

  return (
    <>
      <Title title={user && user.name} />
      <div className="w-[100%] h-auto py-[10rem] flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        <button
          className="text-white py-2 px-3 bg-red-400 hover:bg-red-800"
          onClick={() => {
            dispatch(userLogout());
            // dispatch(logOut());
            navigate("/account");
          }}
        >
          logout
        </button>
        <h2 className="text-white">{user && user.data.name}</h2>
      </div>
    </>
  );
};

export default UserProfile;
