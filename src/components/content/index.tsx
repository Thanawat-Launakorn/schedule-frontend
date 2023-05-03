import React from "react";
import { Layout } from "antd";
type Props = {
  children: React.ReactNode;
};

export default function AppContent({ children }: Props) {
  return (
    <Layout.Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: "transparent",
      }}
    >
      {children}
    </Layout.Content>
  );
}
