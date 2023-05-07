import React from "react";
import { Card, Divider, Form, Input, MenuProps, Select, theme } from "antd";
import images1 from "../../assets/images/images1.png";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  Row,
  Space,
  Modal,
  Typography,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { CSSProperties } from "@ant-design/cssinjs/lib/hooks/useStyleRegister";
import authAPI from "../../service/api/auth";
import { openNotification } from "../notifications";
import { IProfile } from "../../service/api/auth/auth-interface";
import GetPosition from "../../utils/position";
import Container from "../container";
import TextArea from "antd/es/input/TextArea";

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AppHeader({ collapsed, setCollapsed }: Props) {
  const navigate = useNavigate();
  const [getData, setData] = React.useState({} as Partial<IProfile>);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const {
    token: { colorTextLabel, colorPrimary },
  } = theme.useToken();

  const [componentDisabled, setComponentDisabled] =
    React.useState<boolean>(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const signout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const getProfile = async () => {
    await authAPI
      .getProfile()
      .then((res: IProfile) => {
        setData({
          ...res,
          firstName: res.name.split(" ")[0],
          lastName: res.name.split(" ")[1],
        });
      })
      .catch((err) => alert(err));
  };

  React.useEffect(() => {
    getProfile();
  }, []);
  const titleStyle = {
    fontSize: 12,
    fontWeight: "bold",
    margin: 0,
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Row className="center">
          <Typography.Text onClick={showModal}>Profile</Typography.Text>
        </Row>
      ),
    },
    {
      key: "2",
      className: "dropdown-logout",
      label: (
        <Row className="center">
          <Typography.Text onClick={signout}>Logout</Typography.Text>
        </Row>
      ),
    },
  ];

  return (
    <Layout.Header
      style={{ padding: 0, background: "white", height: 80 }}
      className="!transition-all !ease-linear !delay-75"
    >
      <Modal
        centered
        style={{ top: -10 }}
        width="60%"
        title="Profile"
        okText="Save Changes"
        cancelText="Cancel"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={<CloseCircleOutlined />}
      >
        <Form layout="vertical">
          <Row gutter={[24, 20]}>
            <Col span={24}>
              <Row justify="space-between">
                <Col>
                  <Typography.Text
                    style={{
                      fontWeight: "normal",
                      margin: 0,
                      textTransform: "capitalize",
                    }}
                  >
                    Personal Profile
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[12, 12]}>
                <Col span={8}>
                  <Container className="!bg-themeWhiteContainer">
                    <center>
                      <Space direction="vertical">
                        <Avatar
                          src={images1}
                          alt="image-profile"
                          style={{
                            width: 150,
                            height: 150,
                          }}
                          // size={64}
                        />
                        <Typography.Title
                          level={3}
                          style={{
                            margin: "5px 0",
                            color: "#FFFFFF",
                          }}
                        >
                          {getData.name}
                        </Typography.Title>
                        <Typography.Text
                          style={{
                            color: "#FFFFFF",
                          }}
                        >
                          {`${GetPosition(getData.positionId)}`}
                        </Typography.Text>
                        <Typography.Text
                          style={{
                            color: "#FFFFFF",
                          }}
                        >
                          Thailand, Bangkok
                        </Typography.Text>
                      </Space>
                    </center>
                  </Container>
                </Col>
                <Col span={16}>
                  {" "}
                  {/* Personal User */}
                  <Container>
                    <Row>
                      <Col span={24}>
                        <Typography.Title level={5}>
                          Personal User
                        </Typography.Title>
                        <Divider style={{ margin: "5px 0" }} />
                      </Col>
                      <Col span={24} style={{ marginBottom: 2.5 }}>
                        <Row gutter={[12, 12]}>
                          <Col span={12}>
                            <Form.Item label="Firstname">
                              <Input value={getData.firstName} />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Lastname">
                              <Input
                                value={getData.lastName}
                                disabled={!getData.lastName}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24} style={{ marginBottom: 2.5 }}>
                        <Row gutter={[12, 12]}>
                          <Col span={12}>
                            <Form.Item label="Email">
                              <Input value={getData.email} />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Telephone: (123-456-7890)">
                              <Input value={getData.tel} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24} style={{ marginBottom: 2.5 }}>
                        <Row gutter={[12, 12]}>
                          <Col span={12}>
                            <Form.Item label="Address">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Position">
                              <Input
                                value={`${GetPosition(getData.positionId)}`}
                                disabled
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row gutter={[12, 12]}>
                <Col span={8}>
                  {/* Social */}
                  <Container>
                    <Row gutter={[12, 12]}>
                      <Col span={24}>
                        <Row justify="space-between" align="middle">
                          <Typography.Title level={5}>Social</Typography.Title>
                          <PlusOutlined
                            className="cursor-pointer"
                            onClick={showModal}
                          />
                          {/* <Modal
                            title="Socials"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                          </Modal> */}
                        </Row>
                        <Divider style={{ margin: "5px 0" }} />
                      </Col>
                      <Col span={24}></Col>
                    </Row>
                  </Container>
                </Col>
                <Col span={16}>
                  {/* About me */}
                  <Container>
                    <Row gutter={[12, 12]}>
                      <Col span={24}>
                        <Typography.Title level={5}>About me</Typography.Title>
                        <Divider style={{ margin: "5px 0" }} />
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <TextArea placeholder="about me..." rows={4} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Row justify="space-between" align="middle" style={{ height: "100%" }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: 20,
            width: 64,
            height: "100%",
          }}
        />
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["hover"]}>
          <Row
            justify="space-between"
            className="card-profile"
            align="middle"
            gutter={[16, 0]}
            style={{
              marginRight: 40,
              borderRadius: 5,
              overflow: "hidden",
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            <Col style={{}} className="bg-themeWhiteContainer">
              <Avatar src={images1} alt="image-profile" size="large" />
            </Col>
            <Col>
              <Typography.Title level={5} style={titleStyle}>
                {getData.name}
              </Typography.Title>
              <Typography.Title
                style={{
                  color: "gray",
                  fontSize: 10,
                  fontWeight: "initial",
                  margin: 0,
                }}
              >
                {`${GetPosition(getData.positionId)}`}
              </Typography.Title>
            </Col>
            <Col>
              <CaretDownOutlined style={{ fontSize: 15, cursor: "pointer" }} />
            </Col>
          </Row>
        </Dropdown>
      </Row>
    </Layout.Header>
  );
}
