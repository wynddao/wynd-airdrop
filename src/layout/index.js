import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BarlowRegular from "./Barlow-Regular.ttf";
import BarlowBold from "./Barlow-Bold.ttf";
import LatoRegular from "./Lato-Regular.ttf";
import LatoBold from "./Lato-Bold.ttf";

/**
 * Theming Colors
 */
const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Barlow Bold, sans-serif",
      fontSize: "36px",
      fontWeight: 300,
      lineHeight: "43px",
      letterSpacing: "0px",
      textAlign: "left",
    },
    h2: {
      fontFamily: "Barlow Bold, sans-serif",
      fontSize: "24px",
      fontWeight: 300,
      lineHeight: "24px",
      letterSpacing: "0px",
      textAlign: "left",
    },
    body1: {
      fontFamily: "Barlow Regular, sans-serif",
    },
    body2: {
      fontFamily: "Barlow Bold, sans-serif",
      fontSize: "16px"
    },
    subtitle1: {
      fontFamily: "Barlow Regular",
      fontSize: "64px",
      fontWeight: 400,
      lineHeight: "77px",
      letterSpacing: "0px",
      textAlign: "left",
    },
    subtitle2: {
      fontFamily: "Barlow Regular",
      fontSize: "28px",
      fontWeight: 400,
      lineHeight: "43px",
      letterSpacing: "0px",
      textAlign: "center",
    },
    button: {
      fontFamily: "Barlow Bold"
    }
  },
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

/**
 * Actual Layout
 */
const Layout = ({ children }) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      @font-face {
        font-family: 'Barlow Regular';
        font-style: normal;
        font-weight: 300;
        src: url('${BarlowRegular}');
      }
      @font-face {
        font-family: 'Barlow Bold';
        font-style: normal;
        font-weight: 300;
        src: url('${BarlowBold}');
      }
      @font-face {
        font-family: 'Lato Regular';
        font-style: normal;
        font-weight: 300;
        src: url('${LatoRegular}');
      }
      @font-face {
        font-family: 'Lato Bold';
        font-style: normal;
        font-weight: 700;
        src: url('${LatoBold}');
      }
      `,
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;
