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
      text: "#FFFFFF66",
    },
    third: {
      main: "#ffffff33",
      contrastText: "#ffffff",
    },
    action: {
      hover: "#00abff40",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f0f2ff",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
      },
    },
  },
});

export default theme;
