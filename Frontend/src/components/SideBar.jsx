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
import group1 from "@/assets/Group 1.png";
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
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          borderRadius: "12px",
          ml: 1,
          mt: 2,
        },
      }}
    >
      <div className="flex flex-col px-5">
        <div className="flex items-center pt-4 pb-10">
          <MenuIcon />
          <img src={group1} alt="group1" className="pl-4" />
          <p className="text-primary text-xl pl-3">Book Rent</p>
        </div>
        <hr className="text-text-secondary pb-5" />
      </div>
      <List sx={{ px: 3 }}>
        {["Dashboard", "Book Upload", "Other", "Other", "other"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemIcon
                sx={{ color: theme.palette.secondary.contrastText }}
              >
                {index === 0 ? <SpaceDashboardOutlinedIcon /> : null}
                {index === 1 ? <AutoStoriesOutlinedIcon /> : null}
                {index === 2 ? <AddBoxOutlinedIcon /> : null}
                {index === 3 ? <AddBoxOutlinedIcon /> : null}
                {index === 4 ? <AddBoxOutlinedIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <hr className="text-text-secondary py-5 mx-5" />
      <List sx={{ px: 3 }}>
        {["Notification", "Setting", "Login as Admin"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemIcon sx={{ color: theme.palette.secondary.contrastText }}>
              {index === 0 ? <NotificationsOutlinedIcon /> : null}
              {index === 1 ? <SettingsOutlinedIcon /> : null}
              {index === 2 ? <AccountCircleOutlinedIcon /> : null}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <hr className="text-text-secondary py-5 mx-5" />
      <Button
        variant="contained"
        color="third"
        sx={{ width: "90%", mx: "auto" }}
      >
        <LogoutOutlinedIcon />
        <span>Logout</span>
      </Button>
    </Drawer>
  );
};

export default Sidebar;
