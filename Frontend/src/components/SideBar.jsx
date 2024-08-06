import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import group1 from "@/assets/Group 1.png";

const drawerWidth = 279;

const Sidebar = () => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          px: 5,
        },
      }}
    >
      <div className="flex items-center pt-4 pb-10">
        <MenuIcon />
        <img src={group1} alt="group1" className="pl-4" />
        <p className="text-primary pl-2">Book Rent</p>
      </div>
      <hr className="text-text-secondary pb-5" />
      <List>
        {["Home", "Inbox", "Mail", "Profile"].map((text, index) => (
          <ListItem key={text}>
            <ListItemIcon sx={{ color: theme.palette.secondary.contrastText }}>
              {index === 0 ? <HomeIcon /> : null}
              {index === 1 ? <InboxIcon /> : null}
              {index === 2 ? <MailIcon /> : null}
              {index === 3 ? <AccountCircleIcon /> : null}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
