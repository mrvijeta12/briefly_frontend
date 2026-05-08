import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  // console.log("user", user);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              //   display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Briefly
          </Typography>

          {user?.name ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar>{user?.name.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
            </Box>
          ) : (
            <button
              className="cursor-pointer px-5 py-2 rounded-md hover:bg-[#539ce4] font-semibold "
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
