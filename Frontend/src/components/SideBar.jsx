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

const drawerWidth = "19%";
const drawerHeight = "96.4%";

const Sidebar = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };

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
      <div className="flex flex-col">
        <div className="flex flex-col px-5">
          <div className="flex items-center pt-4 pb-10">
            <MenuIcon
              sx={{
                color: theme.palette.secondary.contrastText,
              }}
            />
            <img src={group1dash} alt="group1dash" className="w-[30%] pl-4" />
            <p className="text-primary text-xl pl-3">Book Rent</p>
          </div>
          <hr className="text-text-secondary pb-5" />
        </div>
        <List sx={{ px: 3 }}>
          {["Dashboard", "Book Upload", "Other", "Other", "other"].map(
            (text, index) => (
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
            )
          )}
        </List>
        <hr className="text-text-secondary py-5 mx-5" />
        <List sx={{ px: 3 }}>
          {["Notification", "Setting", "Login as Admin"].map((text, index) => (
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
          ))}
        </List>
        <hr className="text-text-secondary py-5 mx-5" />
      </div>
      <Button
        variant="contained"
        color="third"
        sx={{ width: "90%", mx: "auto", mb: 2 }}
      >
        <LogoutOutlinedIcon />
        <span>Logout</span>
      </Button>
    </Drawer>
  );
};

export default Sidebar;
