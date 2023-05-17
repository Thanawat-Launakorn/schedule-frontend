import React from "react";
import { Card, Divider, Form, Input, MenuProps, Select, theme } from "antd";
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
import { IProfile } from "../../service/api/auth/auth-interface";
import GetPosition from "../../utils/position";
import Container from "../container";
import authAPI from "../../service/api/auth";
import positionAPI from "../../service/api/position";

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AppHeader({ collapsed, setCollapsed }: Props) {
  const navigate = useNavigate();
  const [modalProfile] = Form.useForm();
  const { data: getProfile } = authAPI.UseGetProfile();
  const { data: getAllPosition } = positionAPI.useGetAllPosition();
  const [getData, setData] = React.useState({} as Partial<IProfile>);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editPass, setEditpass] = React.useState(false);

  const {
    token: { colorTextLabel, colorPrimary },
  } = theme.useToken();

  const showModal = () => {
    if (!getData) return;
    modalProfile.setFieldsValue({
      firstname: getData.firstName,
      lastname: getData.lastName,
      position: getAllPosition
        ?.filter((e) => e.id === getData.positionId)
        .map((e) => e.position)
        .join(),
      ...getData,
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditpass(false);
  };

  const signout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const onFinishModal = (values: any) => {
    setEditpass(false);
    setIsModalOpen(false);
  };

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

  React.useEffect(() => {
    (async () => {
      const res = await authAPI.getProfile().then((res) => {
        setData({
          ...res,
          firstName: res.name.split(" ")[0],
          lastName: res.name.split(" ")[1],
        });
      });
    })();
  }, [isModalOpen]);

  return (
    <Layout.Header
      style={{ padding: 0, background: "white", height: 80 }}
      className="!transition-all !ease-linear !delay-75"
    >
      <Modal
        centered
        style={{ top: -30 }}
        width="60%"
        title="Profile"
        okText="Save Changes"
        cancelText="Cancel"
        open={isModalOpen}
        onOk={() => modalProfile.submit()}
        onCancel={handleCancel}
        closeIcon={<CloseCircleOutlined />}
      >
        <Form layout="vertical" form={modalProfile} onFinish={onFinishModal}>
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
                  <Container className="!bg-themeWhiteContainer !h-[440px]">
                    <center>
                      <Space direction="vertical">
                        <Avatar
                          src={getData.img}
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
                            <Form.Item label="Firstname" name="firstname">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Lastname" name="lastname">
                              <Input disabled={!getData.lastName} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24} style={{ marginBottom: 2.5 }}>
                        <Row gutter={[12, 12]}>
                          <Col span={12}>
                            <Form.Item label="Email" name="email">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Telephone: (123-456-7890)"
                              name="tel"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24} style={{ marginBottom: 2.5 }}>
                        <Row gutter={[12, 12]}>
                          <Col span={12}>
                            <Form.Item label="Address" name="address">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Position" name="position">
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Button
                          onClick={() => setEditpass((prevState) => !prevState)}
                          style={{
                            display: editPass ? "none" : "block",
                          }}
                          type="primary"
                        >
                          Edit password
                        </Button>
                        {editPass && (
                          <>
                            <Row gutter={[12, 12]}>
                              <Col span={12}>
                                <Form.Item
                                  label="Oldpassword"
                                  name="oldpassword"
                                >
                                  <Input.Password placeholder="Oldpassword"></Input.Password>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  label="Newpassword"
                                  name="newpassword"
                                >
                                  <Input.Password placeholder="Newpassword"></Input.Password>
                                </Form.Item>
                              </Col>
                            </Row>
                          </>
                        )}
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
        <Col>
          <Button
            type="link"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: 20,
              width: 64,
              height: "100%",
              color: "#001529",
            }}
          />
        </Col>
        <Col>
          <Row gutter={[24, 0]}>
            <Col style={{ marginRight: 23 }}>
              <Row justify="space-around" align="middle">
                <Col>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  >
                    EN
                  </Typography.Title>
                </Col>
                <Col>
                  <Divider type="vertical" />
                </Col>
                <Col>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  >
                    TH
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <Col>
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                trigger={["hover"]}
              >
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
                    <Avatar
                      src={getData.img}
                      alt="image-profile"
                      size="large"
                    />
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
                      {getAllPosition
                        ?.filter((e) => getData.positionId === e.id)
                        .map((e) => e.position)
                        .join()}
                    </Typography.Title>
                  </Col>
                  <Col>
                    <CaretDownOutlined
                      style={{ fontSize: 15, cursor: "pointer" }}
                    />
                  </Col>
                </Row>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
}
