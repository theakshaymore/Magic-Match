import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: "https://app-vy70tcs4b00y.frontegg.com",
  clientId: "2c9d9bd1-e3ff-498d-bf2a-cfab0349c403",
};

ReactDOM.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
    <App />
  </FronteggProvider>,
  document.getElementById("root")
);
