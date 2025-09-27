import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3", // modern blue
    },
    background: {
      default: "#0d1b2a", // dark navy background
      paper: "#1b263b", // slightly lighter for cards/dialogs
    },
    text: {
      primary: "#e0e1dd", // light gray text
    },
  },
  typography: {
    fontSize: 22, // mobile-first base font size
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.9rem",
    },
    button: {
      textTransform: "none",
      fontSize: "0.9rem",
    },
  },
  shape: {
    borderRadius: 12, // modern rounded look
  },
});

export default theme;
