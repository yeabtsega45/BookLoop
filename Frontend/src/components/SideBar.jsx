import { useState } from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import group1dash from "@/assets/Group 1@2x.png";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";

const drawerWidth = "285px";
const drawerHeight = "96vh";

const Sidebar = ({ toggleSidebar }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const routes = [
    "/",
    "/bookupload",
    "/other",
    "/other",
    "/other",
    "/notifications",
    "/settings",
    "/login",
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        height: drawerHeight,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          height: drawerHeight,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.text,
          borderRadius: "12px",
          ml: 1,
          mt: 2,
        },
      }}
    >
      <div className="flex flex-col !w-[279px] self-center">
        <div className="flex flex-col px-5">
          <div className="flex items-center pt-4 pb-10">
            <div onClick={() => toggleSidebar()}>
              <MenuIcon
                sx={{
                  color: theme.palette.secondary.contrastText,
                }}
              />
            </div>
            <img src={group1dash} alt="group1dash" className="w-[20%] pl-4" />
            <p className="text-primary text-xl pl-3">Book Rent</p>
          </div>
          <hr className="text-text-secondary pb-5" />
        </div>
        <List sx={{ px: 3, pb: "20px" }}>
          {["Dashboard", "Book Upload", "Other", "Other", "Other"].map(
            (text, index) => (
              <NavLink
                to={routes[index]}
                style={{ textDecoration: "none" }}
                key={text}
              >
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    backgroundColor:
                      activeIndex === index
                        ? theme.palette.primary.main
                        : "inherit",
                    color:
                      activeIndex === index
                        ? theme.palette.primary.contrastText
                        : "inherit",
                    cursor: "pointer",
                    py: 1,
                    mb: 1,
                  }}
                  onClick={() => handleListItemClick(index)}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        activeIndex === index
                          ? theme.palette.primary.contrastText
                          : "inherit",
                      fontSize: 24,
                      pl: 2,
                    }}
                  >
                    {index === 0 ? <SpaceDashboardOutlinedIcon /> : null}
                    {index === 1 ? <AutoStoriesOutlinedIcon /> : null}
                    {index === 2 ? <AddBoxOutlinedIcon /> : null}
                    {index === 3 ? <AddBoxOutlinedIcon /> : null}
                    {index === 4 ? <AddBoxOutlinedIcon /> : null}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ fontSize: 14, fontWeight: "regular" }}
                  />
                </ListItem>
              </NavLink>
            )
          )}
        </List>
        <hr className="text-text-secondary mx-5" />
        <List sx={{ px: 3, pt: "20px" }}>
          {["Notification", "Setting", "Login as Admin"].map((text, index) => (
            <NavLink
              to={routes[index + 5]}
              style={{ textDecoration: "none" }}
              key={text}
            >
              <ListItem
                key={text}
                disablePadding
                sx={{
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  backgroundColor:
                    activeIndex === index + 5
                      ? theme.palette.primary.main
                      : "inherit",
                  color:
                    activeIndex === index + 5
                      ? theme.palette.primary.contrastText
                      : "inherit",
                  cursor: "pointer",
                  py: 1,
                  mb: 1,
                }}
                onClick={() => handleListItemClick(index + 5)}
              >
                <ListItemIcon
                  sx={{
                    color:
                      activeIndex === index + 5
                        ? theme.palette.primary.contrastText
                        : "inherit",
                    pl: 2,
                  }}
                >
                  {index === 0 ? <NotificationsOutlinedIcon /> : null}
                  {index === 1 ? <SettingsOutlinedIcon /> : null}
                  {index === 2 ? <AccountCircleOutlinedIcon /> : null}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ fontSize: 14, fontWeight: "regular" }}
                />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
      <Button
        variant="contained"
        color="third"
        sx={{ width: "90%", mx: "auto", mb: 5 }}
        onClick={handleLogout}
      >
        <LogoutOutlinedIcon />
        <span>Logout</span>
      </Button>
    </Drawer>
  );
};

Sidebar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
