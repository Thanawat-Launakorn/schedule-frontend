import React from "react";
import {
  Avatar,
  Calendar,
  Col,
  Form,
  Modal,
  notification,
  Row,
  Select,
  SelectProps,
  Space,
  Tooltip,
  Typography,
  Popover,
  Divider,
} from "antd";
import dayjs, { Dayjs } from "dayjs";

import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import userAPI, { useGetAllUser } from "../../service/api/user";
import { IUser, IUserColumnType } from "../../service/api/user/user-interface";
import scheduleAPI, { useGetSchedule } from "../../service/api/schedule";
import { openNotification } from "../../components/notifications";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";
import { CellEllipsisType } from "rc-table/lib/interface";
import { useNavigate } from "react-router-dom";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import {
  UserOutlined,
  AntDesignOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  IScheduleGetAll,
  ISchedulePost,
} from "../../service/api/schedule/schedule-interface";
import Table, { ColumnsType } from "antd/es/table";
import HeadTitle from "../../components/headtitle";
import { useGetAllPosition } from "../../service/api/position";
import GetPosition from "../../utils/position";

type Props = {};

export default function AppCalendar({}: Props) {
  const [modalForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  // const { data: scheduleData } = useGetSchedule();
  const { data: userData } = userAPI.useGetAllUser();
  const [changeModal, setChangeModal] = React.useState(false);
  const [getSchedule, setSchedule] = React.useState([]);
  const [select, setSelect] = React.useState<Array<any>>([]);
  const [date, setDate] = React.useState<string>("");
  // console.log(getSchedule);

  // Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    modalForm.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Calendar
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const onPanelSelect = async (value: Dayjs) => {
    const dateInput = value.format("YYYY-MM-DD");
    console.log(dateInput);

    const checkUser: boolean = getSchedule.some(
      (e: any) => e.calendar.date === dateInput
    );
    // console.log(checkUser);

    setSelect(
      getSchedule.filter((user: any) => {
        return user.calendar.date === dateInput;
      })
    );

    checkUser ? setChangeModal(true) : setChangeModal(false);

    setDate(dateInput);
    showModal();
  };

  const handleChange = (e: any) => {
    console.log(e.id);
  };

  const options: SelectProps["options"] = userData?.data?.map((e: IUser) => {
    return { value: e.id, label: e.name };
  });

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const dateCellRender = (date: Dayjs): React.ReactNode => {
    const booking = getSchedule.filter((e: any) => {
      const renderDate = dayjs(date).format("YYYY-MM-DD");
      const dateCalendar = dayjs(e.calendar.date).format("YYYY-MM-DD");

      return dateCalendar === renderDate; //ข้อมูลในวันที่
    });

    return (
      <React.Fragment>
        {booking.map((e: IScheduleGetAll) => {
          return (
            <span key={e.id}>
              <Popover
                content={
                  <Space>
                    <Typography.Text style={{ color: "#2F58CD" }}>
                      {e.user?.name}
                    </Typography.Text>
                  </Space>
                }
              >
                <Avatar src={e.user?.img} alt="image-profile" />
              </Popover>
            </span>
          );
        })}
      </React.Fragment>
    );
  };

  const onFinish = (values: any) => {
    const post = {
      calendar: date,
      users: values.user?.map((e: number) => {
        return e;
      }),
      dopay: values.dopay || "Do",
      howmuch: values.howmuch || 0,
    };

    console.log("post", post);

    // scheduleAPI.useCreateSchedule().mutate(post, {
    //   onSuccess: () => {
    //     openNotification({ type: "success", title: "success ✅" });
    //   },

    //   onError: () => {
    //     openNotification({ type: "error", title: "error ❌" });
    //   },
    // });

    scheduleAPI
      .createSchedule(post)
      .then(() => {
        openNotification({ type: "success", title: "success ✅" });
      })
      .catch((res) => {
        openNotification({ type: "error", title: `${res.message} ❌` });
      });
  };

  const HeadTitleProps = {
    title: "Calendar",
  };

  const columnModal: ColumnsType<IUserColumnType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",

      render: (_: any, record: any) => {
        return (
          <Row align="middle">
            <Col style={{ marginRight: 10 }}>
              <Avatar src={record.user.img} alt="image-profile" size="large" />
            </Col>
            <Col>
              <Typography.Title
                level={5}
                style={{ margin: 0, color: "#2F58CD" }}
              >
                {`${record.user.name}`}
              </Typography.Title>
              <Typography.Text>{`${record.user.email}`}</Typography.Text>
            </Col>
          </Row>
        );
      },
    },

    {
      title: "Telephone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      width: "15%",
      render: (_: any, record: any) => {
        return (
          <Row>
            <div>{`${record.user.tel}`}</div>
          </Row>
        );
      },
    },

    {
      title: "Position",
      key: "position",
      dataIndex: "position",
      width: "15%",
      render: (_: any, record: any) => {
        return (
          <Row>
            <div>{`${GetPosition(record.user.positionId)}`}</div>
          </Row>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: "10%",
      render: (_: any, record: any) => {
        return (
          <Row>
            <Col span={8}>
              <EditOutlined
                onClick={() => {
                  navigate(`/user-management/edit/${record.user.id}`);
                }}
              />
            </Col>
            <Col span={8}>
              <Divider type="vertical" />
            </Col>
            <Col span={8}>
              <DeleteOutlined
                onClick={() => {
                  userAPI
                    .deleteUser(record.user.id)
                    .then(() => {
                      openNotification({
                        type: "success",
                        title: "Delete completed",
                      });
                    })
                    .catch((res) => {
                      openNotification({
                        type: "error",
                        title: `${res.message}`,
                      });
                    });
                }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  React.useEffect(() => {
    (async () => {
      try {
        const resSchedule = await scheduleAPI.getSchedule();
        setSchedule(resSchedule);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <HeadTitle {...HeadTitleProps} />
        </Col>
        <Col>
          <Calendar
            onPanelChange={onPanelChange}
            onSelect={onPanelSelect}
            cellRender={cellRender}
          />
          <Modal
            title={changeModal ? "Table User" : "Input User"}
            style={{
              top: -80,
            }}
            width={changeModal ? "80%" : "30%"}
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {/* // Create Form */}
            {changeModal ? (
              <Form>
                <Table
                  rowKey="id"
                  dataSource={select}
                  columns={columnModal}
                  scroll={{ y: 900 }}
                  pagination={false}
                />
              </Form>
            ) : (
              <Form
                onFinish={onFinish}
                form={modalForm}
                style={{
                  height: 200,
                }}
              >
                <Form.Item name="user">
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </Form>
            )}
          </Modal>
        </Col>
      </Row>
    </>
  );
}
