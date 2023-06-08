import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      dark: colors.lightBlue[900],
      main: colors.lightBlue[500],
      light: colors.lightBlue[100],
      bg: colors.lightBlue[50],
    },
    secondary: {
      dark: colors.pink[900],
      main: colors.pink[500],
      light: colors.pink[100],
      bg: colors.pink[50],
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
  },
});

export default theme;
