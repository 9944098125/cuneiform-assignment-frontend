import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../Redux/Actions/login";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showUserMenu, setShowUserMenu] = React.useState(false);

  // showing user menu
  function onClickArrow() {
    setShowUserMenu(!showUserMenu);
  }

  // logout function
  function clickLogout() {
    dispatch(logout());
    navigate("/login", { replace: true });
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.dark",
          height: "100%",
          width: "100%",
          px: 2,
        }}
      >
        <Typography
          sx={{ fontSize: "23px", fontWeight: "800", color: "white" }}
        >
          Blogs
        </Typography>
        <Box sx={{ minWidth: "220px", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              height: "100%",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: "600", color: "white" }}
            >
              {user?.first_name} {user?.last_name}
            </Typography>
            <img
              src={user?.profilePicture}
              alt=""
              style={{ height: "80%", width: "20%", borderRadius: "50%" }}
            />
            <ArrowDropDownIcon
              sx={{ color: "white", fontSize: "25px", cursor: "pointer" }}
              onClick={onClickArrow}
            />
          </Box>
          {showUserMenu && (
            <Box
              sx={{
                backgroundColor: "secondary.dark",
                color: "white",
                p: 1.5,
                borderRadius: "12px",
                cursor: "pointer",
              }}
              onClick={clickLogout}
            >
              <Typography sx={{ fontSize: "15px", fontWeight: "800" }}>
                Logout
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Navbar;
