import { useEffect, useState } from "react";
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
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = "285px";
const drawerHeight = "96vh";

const Sidebar = ({ toggleSidebar }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [userRole, setUserRole] = useState("owner");

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/auth/verifytoken", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setUserRole(response.data.user.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, []);

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    console.log("token removed");
    navigate("/login");
  };

  const ownerListItems = [
    { text: "Dashboard", icon: <SpaceDashboardOutlinedIcon />, route: "/" },
    {
      text: "Book Upload",
      icon: <AutoStoriesOutlinedIcon />,
      route: "/bookupload",
    },
    { text: "Other", icon: <AddBoxOutlinedIcon />, route: "/other" },
    { text: "Other", icon: <AddBoxOutlinedIcon />, route: "/other" },
    { text: "Other", icon: <AddBoxOutlinedIcon />, route: "/other" },
    {
      text: "Notification",
      icon: <NotificationsOutlinedIcon />,
      route: "/notifications",
    },
    { text: "Setting", icon: <SettingsOutlinedIcon />, route: "/settings" },
    {
      text: "Login as Admin",
      icon: <AccountCircleOutlinedIcon />,
      route: "/login/admin",
    },
  ];

  const adminListItems = [
    {
      text: "Dashboard",
      icon: <SpaceDashboardOutlinedIcon />,
      route: "/admin",
    },
    {
      text: "Books",
      icon: <AutoStoriesOutlinedIcon />,
      route: "/admin/books",
    },
    { text: "Owners", icon: <Person2OutlinedIcon />, route: "/admin/owners" },
    { text: "Other", icon: <AddBoxOutlinedIcon />, route: "/admin/other" },
    { text: "Other", icon: <AddBoxOutlinedIcon />, route: "/admin/other" },
    {
      text: "Notifications",
      icon: <NotificationsOutlinedIcon />,
      route: "/admin/notifications",
    },
    {
      text: "Settings",
      icon: <SettingsOutlinedIcon />,
      route: "/admin/settings",
    },
    {
      text: "Login as Owner",
      icon: <AccountCircleOutlinedIcon />,
      route: "/login",
    },
  ];

  const listItems = userRole === "admin" ? adminListItems : ownerListItems;

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
          {listItems.slice(0, 5).map((item, index) => (
            <NavLink
              to={item.route}
              style={{ textDecoration: "none" }}
              key={`${item.text}-${index}`}
            >
              <ListItem
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
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ fontSize: 14, fontWeight: "regular" }}
                />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <hr className="text-text-secondary mx-5" />
        <List sx={{ px: 3, pt: "20px" }}>
          {listItems.slice(5).map((item, index) => (
            <NavLink
              to={item.route}
              style={{ textDecoration: "none" }}
              key={`${item.text}-${index + 5}`}
            >
              <ListItem
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
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
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
