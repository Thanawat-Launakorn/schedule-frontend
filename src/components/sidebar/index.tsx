export type SiderTheme = "light" | "dark";
import type { MenuProps } from "antd";
import { Row, Col, Space, Avatar, Dropdown, Typography } from "antd";
import { defaultLayout } from "../../routes/default.router";
type MenuItem = Required<MenuProps>["items"][number];

import {
  DashboardOutlined,
  UserOutlined,
  MoreOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

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
  const signout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const sidebarMenu: Array<MenuItem> = [
    getItem("Dashboard", 1, <DashboardOutlined />),
    getItem("User", 2, <UserOutlined />),
    getItem("Calendar", 3, <CalendarOutlined />),
    getItem("Setting", 4, <SettingOutlined />),
  ];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Typography.Text onClick={(id) => navigate(`/profile/${id}`)}>
          Profile
        </Typography.Text>
      ),
    },
    {
      key: "2",
      className: "dropdown-logout",
      label: <Typography.Text onClick={signout}>Logout</Typography.Text>,
    },
  ];

  const handleMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case e.key:
        defaultLayout.children.find((routes) => {
          if (routes.key === Number(e.key)) navigate(`${routes.path}`);
        });
        break;
      default:
        alert("page not found");
    }
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
    >
      <Row className="logo">
        <Space align="center" size="middle">
          <Col>
            <Avatar
              src={""}
              alt="image-profile"
              size="default"
              style={{
                marginLeft: 15,
              }}
            />
          </Col>
          <Col
            span={24}
            style={collapsed ? { display: "none" } : {}}
            className="logo-name"
          >
            Thanawat Launakorn
          </Col>
          <Col
            style={collapsed ? { display: "none" } : {}}
            className="logo-action"
          >
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <MoreOutlined style={{ fontSize: 15, cursor: "pointer" }} />
            </Dropdown>
          </Col>
        </Space>
      </Row>
      <Menu
        theme={setTheme}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarMenu}
        onClick={handleMenu}
      />
    </Sider>
  );
}
