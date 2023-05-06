import { Card } from "antd";
import React from "react";

interface Props {
  children?: React.ReactNode;
  height?: number | string;
}

const Container = ({ children, height = "100%" }: Props) => {
  return (
    <Card
      style={{ height: height, width: "100%", backgroundColor: "#FFFFFF " }}
    >
      {children}
    </Card>
  );
};

export default Container;
