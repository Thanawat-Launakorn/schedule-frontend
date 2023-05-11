import { ConfigProvider } from "antd";
import { useRoutes, HashRouter } from "react-router-dom";
import { AuthProvider } from "./provider/auth/Auth.Provider";
import routes from "./routes/routes";
import "./assets/css/App.css";
import "./assets/css/global.css";
import "./assets/scss/index.scss";
import { StyleProvider } from "@ant-design/cssinjs";
import { QueryClient, QueryClientProvider } from "react-query";
const AppRoute = () => {
  const appRoute = useRoutes(routes);
  return appRoute;
};
const client = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 0 },
  },
});

function App() {
  return (
    <QueryClientProvider client={client}>
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
    </QueryClientProvider>
  );
}

export default App;
