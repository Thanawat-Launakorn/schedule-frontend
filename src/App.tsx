import { ConfigProvider } from "antd";
import { useRoutes, HashRouter } from "react-router-dom";
import { AuthProvider } from "./provider/auth/Auth.Provider";
import routes from "./routes/routes";
import { StyleProvider } from "@ant-design/cssinjs";
const AppRoute = () => {
  const appRoute = useRoutes(routes);
  return appRoute;
};

function App() {
  return (
    <HashRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2F58CD",
          },
        }}
      >
        <StyleProvider hashPriority="high">
          <AuthProvider>
            <AppRoute />
          </AuthProvider>
        </StyleProvider>
      </ConfigProvider>
    </HashRouter>
  );
}

export default App;
