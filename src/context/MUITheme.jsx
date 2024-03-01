import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const theme = createTheme({
  typography: {
    fontFamily: '"Vazir","Roboto","Arial"',
    fontWeightLight: 100,
    fontWeightRegular: 200,
    fontWeightMedium: 300,
    fontWeightBold: 400,
  },
  direction: "rtl",
  palette: {
    primary: {
      main: "#a62626",
    },
  },
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function ThemeContext({ children }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
ThemeContext.propTypes = {
  children: PropTypes.node.isRequired,
};
export { ThemeContext };
