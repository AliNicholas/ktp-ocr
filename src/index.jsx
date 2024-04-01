import "./style.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeWrapper } from "@mindee/web-elements.ui.theme-wrapper";

ReactDOM.render(
  <React.StrictMode>
    <ThemeWrapper style={{ padding: 0, color: "#001E3C" }}>
      <App />
    </ThemeWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
