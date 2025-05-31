import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserDetails } from "../../../store/UserSlice/userSliceReducers";
import { useParams } from "react-router-dom";

const SingleEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleUserDetails } = useSelector((state) => state.auth);
  console.log(singleUserDetails);

  useEffect(() => {
    dispatch(getSingleUserDetails(id));
  }, []);
  return <div>SingleEmployee</div>;
};

export default SingleEmployee;
