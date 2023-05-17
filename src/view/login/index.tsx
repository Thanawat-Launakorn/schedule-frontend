import React from "react";
import { Input, Form, Space, Typography, Row, Col, Button } from "antd";
import { ISignin } from "../../service/api/auth/auth-interface";
import authAPI from "../../service/api/auth";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../components/notifications";
import calendar from "../../assets/images/calendar.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
type Props = {};

export default function Signin({}: Props) {
  const navigate = useNavigate();
  const [userFocus, setUserFocus] = React.useState<boolean>(false);
  const [passFocus, setPassFocus] = React.useState<boolean>(false);

  const onFinish = (value: ISignin) => {
    authAPI
      .signin({
        email: value.email,
        password: value.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.accessToken);
        openNotification({ type: "success", title: "success" });
      })
      .catch((err) => {
        openNotification({ type: "error", title: "wrong email or password!" });
      })
      .finally(() => {
        navigate("/dashboard");
      });
  };

  const onFinishFailed = () => {};

  React.useEffect(() => {
    (async () => {})();
  }, []);
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={6}>
        <div className="center">
          <img
            src={calendar}
            alt="image-logo"
            className="w-16 h-16 object-cover"
          />
        </div>
        <Typography.Title level={5} style={{ color: "#ffffff" }}>
          เข้าสู่ระบบบัญชีของคุณเพื่อดำเนินการต่อ
        </Typography.Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your username!",
              },
            ]}
            className="input-signin"
          >
            <Input placeholder="Email" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="input-signin"
          >
            <Input.Password placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
