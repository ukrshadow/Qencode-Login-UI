import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Routing from "./routing/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Routing />
  </React.StrictMode>
);
