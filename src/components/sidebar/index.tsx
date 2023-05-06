export type SiderTheme = "light" | "dark";
import type { MenuProps } from "antd";
import { Row, Col, Space, Avatar, Dropdown, Typography } from "antd";
import calendar from "../../assets/images/calendar.png";
import { defaultLayout } from "../../routes/default.router";
type MenuItem = Required<MenuProps>["items"][number];

import {
  DashboardOutlined,
  DashboardFilled,
  UserOutlined,
  UpSquareFilled,
  CaretDownOutlined,
  CalendarOutlined,
  CalendarFilled,
  SettingOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IItem } from "./sidebar-interface";

const { Sider } = Layout;
type Props = {
  trigger: boolean | null;
  collapsed: boolean;
  setTheme: SiderTheme;
};

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
) => {
  return { key, icon, children, label, type } as MenuItem;
};
export default function AppSidebar({ trigger, collapsed, setTheme }: Props) {
  const navigate = useNavigate();

  const sidebarMenu: Array<MenuItem> = [
    getItem("Dashboard", 1, <DashboardOutlined />),
    getItem("User", 2, <UserOutlined />),
    getItem("Calendar", 3, <CalendarOutlined />),
    getItem("Setting", 4, <SettingOutlined />),
  ];

  const handleMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case e.key:
        defaultLayout.children.find((routes) => {
          if (routes.key === Number(e.key)) {
            navigate(`${routes.path}`);
          }
        });

        break;
      default:
        alert("page not found");
    }
  };

  const handleMouseEnter: MenuProps["onClick"] = (e) => {
    console.log(e.key);
  };
  return (
    <Sider
      trigger={trigger}
      collapsible
      collapsed={collapsed}
      width={250}
      breakpoint="lg"
      collapsedWidth="75"
      theme={setTheme}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      className="!transition-all !ease-linear !delay-75"
    >
      <Row
        className="logo center"
        align="middle"
        style={collapsed ? { opacity: 0 } : {}}
      >
        <img
          src={calendar}
          alt="image-logo"
          className="object-fill h-14 w-14 "
        />
      </Row>
      <Menu
        theme={setTheme}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarMenu}
        onClick={handleMenu}
        onMouseEnter={() => handleMouseEnter}
        style={{ flex: 1, padding: "0px 5px" }}
      />
    </Sider>
  );
}
