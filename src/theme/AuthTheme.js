import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#58a5f0",
      main: "#0277bd",
      dark: "#004c8c",
      contrastText: "#fff",
    },
    secondary: {
      light: "#a7c0cd",
      main: "#78909c",
      dark: "#4b636e",
      contrastText: "#000",
    },
  },
  status: {
    danger: "#F44336",
  },
});

export default theme;
