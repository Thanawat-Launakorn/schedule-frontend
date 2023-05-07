import { Card } from "antd";
import React from "react";

interface Props {
  children?: React.ReactNode;
  height?: number | string;
  className?: string;
}

const Container = ({ children, height = "100%", className }: Props) => {
  return (
    <Card
      style={{ height: height, width: "100%", backgroundColor: "#FFFFFF " }}
      className={`${className}`}
    >
      {children}
    </Card>
  );
};

export default Container;
