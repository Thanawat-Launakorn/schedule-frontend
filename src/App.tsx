import { useState } from "react";
import { RouterProvider, useRoutes, HashRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./provider/auth/Auth.Provider";
import routes from "./routes/routes";

const AppRoute = () => {
  const appRoute = useRoutes(routes);
  return appRoute;
};

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
