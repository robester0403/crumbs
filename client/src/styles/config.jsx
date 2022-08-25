import { createTheme } from "@mui/material/styles";
import themecolors from "./partials/themecolors.scss";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const typography = {
  fontFamily: "Roboto, sans-serif",
};

const theme = createTheme({
  palette: {
    primary: {
      main: themecolors.mainBlack,
    },
    secondary: {
      main: themecolors.mainBlue,
    },
    error: {
      main: themecolors.mainRed,
    },
    ...themecolors,
  },
  breakpoints,
  typography,
  // component styles here
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: "16px", textTransform: "none" },
        containedPrimary: {
          backgroundColor: themecolors.mainBlack,
          color: themecolors.mainLightGrey,
          "&:hover": {
            backgroundColor: themecolors.mainLightBlack,
            color: themecolors.mainLightGrey,
          },
          "&:active": {
            backgroundColor: themecolors.mainBlack,
            color: themecolors.mainLightGrey,
          },
        },
        containedSecondary: {
          backgroundColor: themecolors.mainBlue,
          color: themecolors.mainLightGrey,
          "&:hover": {
            backgroundColor: themecolors.mainDarkBlue,
            color: themecolors.mainLightGrey,
          },
          "&:active": {
            backgroundColor: themecolors.mainBlue,
            color: themecolors.mainLightGrey,
          },
        },
        outlinedPrimary: {
          backgroundColor: themecolors.mainLightGrey,
          color: themecolors.mainBlack,

          "&:hover": {
            backgroundColor: themecolors.mainMediumGrey,
            color: themecolors.mainBlack,
          },
          "&:active": {
            backgroundColor: themecolors.mainLightBlack,
            color: themecolors.mainBlack,
          },
        },
        outlinedSecondary: {
          backgroundColor: themecolors.mainBlue,
          color: themecolors.mainLightGrey,
          "&:hover": {
            backgroundColor: themecolors.mainMediumBlue,
            color: themecolors.mainLightGrey,
          },
          "&:active": {
            backgroundColor: themecolors.mainDarkBlue,
            color: themecolors.mainLightGrey,
          },
        },
      },
    },
  },
});

export default theme;
