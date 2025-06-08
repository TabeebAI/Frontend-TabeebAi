import ReactDOM from "react-dom/client";
import { ToasterProvider } from "@contexts/toaster/toasterProvidor";
import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "@theme/index";
import { CssBaseline } from "@mui/material";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <LazyMotion features={domAnimation}>
      <ToasterProvider>
      <App />
      </ToasterProvider>
    </LazyMotion>
  </ThemeProvider>
);
