import React from "react";
import { Layout, Spin } from "antd";
import { useIsFetching } from "react-query";
type Props = {
  children: React.ReactNode;
};

export default function AppContent({ children }: Props) {
  const isFetching = useIsFetching();
  return (
    <Spin
      style={{ background: "rgba(0, 0, 0, 0.05)", minHeight: "100%" }}
      spinning={isFetching ? true : false}
      size="large"
      tip="กำลังโหลด..."
      delay={500}
    >
      <Layout.Content
        style={{
          margin: "18px 16px",
          padding: 24,
          minHeight: "85vh",
        }}
      >
        {children}
      </Layout.Content>
    </Spin>
  );
}
