import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  Row,
  Col,
  Divider,
  Typography,
  UploadProps,
} from "antd";

import Container from "../../components/container";
import React from "react";
import { IUser, IUserPost } from "../../service/api/user/user-interface";
import userAPI from "../../service/api/user";
import { Image } from "antd";
import HeadTitle from "../../components/headtitle";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { openNotification } from "../../components/notifications";
import { fileToDataUrl } from "../../utils/media";
import imageProfile from "../../assets/images/image-profile.jpeg";
import positionAPI, {  } from "../../service/api/position";
type Props = {
  onAny?: (value: IUser) => void;
  disabled?: boolean;
};
const accepts = {
  array: ["jpg", "jpeg", "png", "webp"],
  string: ".jpg,.jpeg,.png,.webp",
};

export default function FCreateUser({ onAny, disabled }: Props) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [getPosition, setPosition] = React.useState<Array<IPosition>>([]);

  const [statusUpload, setStatusUpload] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState<string>();
  // const profileId = Form.useWatch("profileId", form);
  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    setLoading(true);
    if (info.file && info.fileList?.length > 0) {
      try {
        const image = info.file as RcFile;
        const extension = image.name.split(".").pop()?.toLocaleLowerCase();
        if (!extension || !accepts.array.includes(extension)) {
          throw new Error("รองรับไฟล์ประเภท .jpg, .jpeg และ .png เท่านั้น");
        }
        const base64 = await fileToDataUrl(image);
        if (typeof base64 !== "string") {
          throw new Error("error-occured");
        }

        const isLt2M = image.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          throw new Error("กรุณาอัพไฟล์ไม่เกิน 2mb");
        }
        setTimeout(() => {
          uploadMedia();
        }, 2000);
        setImageUrl(base64);
        console.log("success");
      } catch (err: any) {
        openNotification({
          type: "error",
          title: "เกิดข้อผิดพลาด",
          description: err?.message,
        });
      }
    }
  };

  const uploadMedia = async () => {
    setStatusUpload(true);
    setLoading(false);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onSubmit = () => {
    form.submit();
  };
  const HeadTitleProps = {
    title: "Create User",
  };

  const onFinish = (values: IUserPost) => {
    userAPI
      .createUser({
        email: values.email,
        name: `${values.firstname} ${values.lastname}`,
        password: values.password,
        img: imageUrl,
        position: values.position,
        tel: values.tel,
      })
      .then(() => {
        openNotification({ type: "success", title: "success" });
      })
      .catch((err) => {
        openNotification({ type: "error", title: `${err}` });
      })
      .finally(() => {
        navigate(-1);
      });
  };

  React.useEffect(() => {
    (async () => {
      const res = await positionAPI.getAllPosition();
      setPosition(res);
    })();
  }, []);
  return (
    <>
      <Form
        name="create-user"
        labelCol={{ span: 24 }}
        layout="horizontal"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <HeadTitle
              {...HeadTitleProps}
              onSubmit={!disabled && onSubmit}
              onCancel={onCancel}
            />
          </Col>
          <Col span={24}>
            <Row gutter={[12, 20]}>
              <Col span={8}>
                {/* Profile */}
                <Container className="">
                  <Row>
                    <Col span={24}>
                      <Typography.Title level={5}>Profile</Typography.Title>
                      <Divider />
                    </Col>

                    <Col span={24}>
                      <center>
                        <Form.Item
                          name={"img"}
                          valuePropName="src"
                          className="w-full center"
                          style={{ margin: 0 }}
                        >
                          <Upload
                            name="img"
                            className="avatar-uploader"
                            showUploadList={false}
                            accept={accepts.string}
                            beforeUpload={() => false}
                            onChange={handleChange}
                          >
                            <div className="avatar-item">
                              {loading ? (
                                <LoadingOutlined />
                              ) : !!imageUrl ? (
                                <Image
                                  preview={false}
                                  src={imageUrl}
                                  alt="img"
                                  className="!h-52 !w-52 object-fill"
                                />
                              ) : (
                                <Image
                                  preview={false}
                                  src={imageProfile}
                                  alt="img"
                                  className="!h-52 !w-52 object-fill"
                                />
                              )}
                            </div>
                          </Upload>
                        </Form.Item>
                      </center>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col span={16}>
                <Container>
                  <Row>
                    <Col span={24}>
                      <Typography.Title level={5}>Position</Typography.Title>
                      <Divider />
                    </Col>
                    <Col span={24}>
                      <Form.Item name="position">
                        <Select
                          defaultValue={"Select position..."}
                          options={getPosition.map((it) => {
                            return { value: it.id, label: it.position };
                          })}
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col span={24}>
                {/* Personal Profile */}
                <Container>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>
                      <Typography.Title level={5}>
                        Personal Profile
                      </Typography.Title>
                      <Divider />
                    </Col>
                    <Col span={24}>
                      <Row gutter={[12, 0]}>
                        <Col span={12}>
                          <Form.Item
                            label="Firstname"
                            name="firstname"
                            rules={[
                              {
                                required: true,
                                message: "Please input your firstname!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Lastname"
                            name="lastname"
                            rules={[
                              {
                                required: true,
                                message: "Please input your lastname!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Row gutter={[12, 0]}>
                        <Col span={12}>
                          <Form.Item
                            label="Telephone"
                            name="tel"
                            rules={[
                              {
                                required: true,
                                message: "Please input your telephone!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please input your email!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col span={24}>
                {/* Password */}
                <Container>
                  <Row gutter={[0, 0]}>
                    <Col span={24}>
                      <Typography.Title level={5}>Password</Typography.Title>
                      <Divider />
                    </Col>
                    <Col span={24}>
                      <Row gutter={[12, 0]}>
                        <Col span={12}>
                          <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your password!",
                              },
                            ]}
                          >
                            <Input.Password type="password" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Confirm password"
                            name="confirm password"
                          >
                            <Input.Password type="password" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
}
