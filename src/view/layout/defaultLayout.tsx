import React from "react";
import { Layout } from "antd";
import AppSidebar from "../../components/sidebar";
import AppHeader from "../../components/header";
import AppContent from "../../components/content";

import { Outlet } from "react-router-dom";

type Props = {};

export default function DefaultLayout({}: Props) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <AppSidebar trigger={null} collapsed={collapsed} setTheme={"light"} />
      <Layout>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <AppContent>
          <Outlet />
        </AppContent>
      </Layout>
    </Layout>
  );
}
