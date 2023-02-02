import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/global.css";
import reportWebVitals from "./reportWebVitals";
import Routing from "./routing";
import rootStore from "./store";
// import dotenv from "dotenv";
// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <Routing></Routing>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
