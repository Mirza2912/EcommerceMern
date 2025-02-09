import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../store/Action/userActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const UserSpeedDial = ({ user }) => {
  // for showing backdrop/blackish screen when focus on speed dial
  const [open, setOpen] = useState(false);

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  //options for showing speed dial actions
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: Orders },
    { icon: <PersonIcon />, name: "Profile", func: Account },
    {
      icon: <ShoppingCartIcon />,
      name: `Cart`,
      func: Cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: LogoutUser },
  ];

  console.log(user && user);

  //   If admin ios active then dashboard also displayed
  if (user.data.user.role && user.data.user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: Dashboard,
    });
  }

  //   Functions for speed dial actions
  function Dashboard() {
    Navigate("/");
  }

  function Orders() {
    Navigate("/");
  }
  function Account() {
    Navigate("/account");
  }
  function Cart() {
    Navigate("/");
  }
  function LogoutUser() {
    Dispatch(userLogout());
    // Toast("success", "Logged out successfully");
  }
  return (
    <>
      {/* <Backdrop open={open} className="w-full h-[100%] relative" /> */}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="z-50 fixed right-[3vmax] top-[3vmax]"
        icon={
          <img
            className="speedDialIcon w-[56px] h-[56px] bg-cover bg-center  rounded-full"
            src={
              user.data.user.avatar.url && user.data.user.avatar.url
                ? user.data.user.avatar.url
                : "/Profile.png"
            }
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserSpeedDial;
