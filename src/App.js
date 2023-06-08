import React from "react";
import BaseRoutes from "./Routing/BaseRoutes";
import { Provider } from "react-redux";

import store from "./Redux/Store/Store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BaseRoutes />
    </Provider>
  );
}

export default App;
