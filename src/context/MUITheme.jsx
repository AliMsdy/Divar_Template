import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const rootElement = document.getElementById("root");
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
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
  prepend:true,
});

function ThemeContext({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}
ThemeContext.propTypes = {
  children: PropTypes.node.isRequired,
};
export { ThemeContext };
