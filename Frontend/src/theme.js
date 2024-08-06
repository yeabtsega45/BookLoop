import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00abff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#171b36",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  spacing: 8,
});

export default theme;
