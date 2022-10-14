import React from "react";
import "./index.scss";

import { Navbar, AppHeader, AppSidebar, AppMain } from "fragments";
import { Provider } from "react-redux";
import { store } from "store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppHeader />
        <Navbar />
        <AppMain />

        <AppSidebar />
      </div>
    </Provider>
  );
}

export default App;
