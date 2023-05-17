import React from "react";
import {
  Avatar,
  Calendar,
  Col,
  Form,
  Modal,
  Row,
  Select,
  SelectProps,
  Space,
  Typography,
  Popover,
  Divider,
  Input,
} from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import dayjs, { Dayjs } from "dayjs";

import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import userAPI from "../../service/api/user";
import { IUser, IUserColumnType } from "../../service/api/user/user-interface";
import scheduleAPI, { getSchedule } from "../../service/api/schedule";
import { openNotification } from "../../components/notifications";
import { useNavigate } from "react-router-dom";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { IScheduleGetAll } from "../../service/api/schedule/schedule-interface";
import Table, { ColumnsType } from "antd/es/table";
import HeadTitle from "../../components/headtitle";
import GetPosition from "../../utils/position";
import { useQueryClient } from "react-query";
type Props = {};

export default function AppCalendar({}: Props) {
  const queryClient = useQueryClient();
  const [modalForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const { data: scheduleData } = scheduleAPI.useGetSchedule();
  const { data: userData } = userAPI.useGetAllUser();
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [changeModal, setChangeModal] = React.useState(false);
  const [select, setSelect] = React.useState<Array<any>>([]);
  const [date, setDate] = React.useState<string>("");
  const [onAddOpen, setAddOpen] = React.useState<boolean>(false);
  const post_schedule = scheduleAPI.useCreateSchedule();
  const delete_scheduleTask = scheduleAPI.useScheduleDeleteTaskById();
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  interface DataType {
    key: React.Key;
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log(selectedRowKeys.map((e) => e));

    setSelectedRowKeys(newSelectedRowKeys);
  };
  // Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setAddOpen(false);
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

    if (!scheduleData) return;
    const checkUser: boolean = scheduleData.some(
      (e: any) => e.calendar.date === dateInput
    );

    setSelect(
      scheduleData.filter((user: any) => {
        return user.calendar.date === dateInput;
      })
    );

    checkUser ? setChangeModal(true) : setChangeModal(false);

    setDate(dateInput);
    showModal();
  };

  const options: SelectProps["options"] = userData?.data?.map((e: IUser) => {
    return { value: e.id, label: e.name };
  });

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const dateCellRender = (date: Dayjs): React.ReactNode => {
    if (!scheduleData) return;
    const booking = scheduleData.filter((e: any) => {
      const renderDate = dayjs(date).format("YYYY-MM-DD");
      const dateCalendar = dayjs(e.calendar.date).format("YYYY-MM-DD");

      return dateCalendar === renderDate;
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

  const onFinishModal = (values: any) => {
    const post = {
      calendar: date,
      user: values?.user?.map((e: number) => {
        return e;
      }),
      dopay: values?.dopay || "Do",
      howmuch: values?.howmuch || 0,
    };

    if (!values?.user) return;

    post_schedule.mutate(post, {
      onSuccess: () => {
        openNotification({ type: "success", title: "success ✅" });
        queryClient.invalidateQueries({ queryKey: ["get-schedule"] });
        handleOk();
      },

      onError: () => {
        openNotification({ type: "error", title: "error ❌" });
      },
    });
  };

  const HeadTitleProps = {
    title: "Calendar",
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const columnModal: ColumnsType<IUserColumnType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",

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
      width: "30%",
      render: (_: any, record: any) => {
        return (
          <Row>
            <div>{`${record.user.tel}`}</div>
          </Row>
        );
      },
    },

    {
      title: "Dopay",
      key: "dopay",
      dataIndex: "doPay",
      width: "20%",
      render: (_: any, record: any) => {
        return (
          <Row>
            <Col span={24}>
              <Select
                disabled={!openEdit}
                defaultValue={record.dopay}
                options={[
                  { value: "Do", label: "Do" },
                  { value: "Pay", label: "Pay" },
                ]}
                style={{
                  width: "100%",
                }}
              />
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      width: "30%",

      render: (_: any, record: any) => {
        return (
          <Row>
            <Col span={24}>
              <Input min={0} type={"number"} readOnly={!openEdit} />
            </Col>
          </Row>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: "20%",
      align: "center",
      render: (_: any, record: any) => {
        return (
          <Row>
            <Col span={24}>
              <DeleteOutlined
                onClick={() => {
                  console.log(record?.id);
                  delete_scheduleTask.mutate(record?.id, {
                    onSuccess: () => {
                      if (!scheduleData) return;
                      openNotification({
                        type: "success",
                        title: "delete success",
                      });

                      queryClient.invalidateQueries({
                        queryKey: "get-schedule",
                      });

                      handleOk();
                    },
                    onError: (err) => {
                      openNotification({ type: "error", title: `${err}` });
                    },
                  });
                }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  const ModalHeadProps = {
    title: "Table User",
  };

  const onAdd = () => setAddOpen(true);

  const confirm = () => {
    modalForm.submit();
  };

  React.useEffect(() => {
    setAddOpen(false);
    setOpenEdit(false);
  }, [isModalOpen, scheduleData]);

  return (
    <>
      <Row>
        <Col span={24}>
          <HeadTitle
            {...HeadTitleProps}
            actionName={
              <Row align="middle" justify="space-between">
                <Col>
                  <CloudUploadOutlined className="text-lg" />
                </Col>
                <Col>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                    }}
                  >
                    Export
                  </Typography.Title>
                </Col>
              </Row>
            }
            onExcel={() => {}}
          />
        </Col>
        <Col>
          <Calendar
            onPanelChange={onPanelChange}
            onSelect={onPanelSelect}
            cellRender={cellRender}
          />
          <Modal
            style={{}}
            width={changeModal ? "70%" : "30%"}
            centered
            okText={changeModal ? "Edit" : "Ok"}
            open={isModalOpen}
            onOk={() =>
              changeModal
                ? setOpenEdit((prevState) => !prevState)
                : modalForm.submit()
            }
            onCancel={handleCancel}
          >
            {/* // Create Form */}
            {changeModal ? (
              <React.Fragment>
                <HeadTitle
                  className="my-10"
                  {...ModalHeadProps}
                  onAdd={onAddOpen ? confirm : onAdd}
                  actionName={
                    <Space align="center" size={10}>
                      <UserAddOutlined
                        style={{
                          fontSize: 15,
                        }}
                      />
                      <Typography.Title
                        level={5}
                        style={{ margin: 0, color: "white" }}
                      >
                        {onAddOpen ? "Submit" : "Add User"}
                      </Typography.Title>
                    </Space>
                  }
                />

                <Form form={modalForm} onFinish={onFinishModal}>
                  <Row>
                    <Col span={24}>
                      {onAddOpen ? (
                        <Form.Item name="user">
                          <Select
                            size="large"
                            mode="multiple"
                            allowClear
                            placeholder="Please select"
                            options={options}
                          />
                        </Form.Item>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Table
                        rowKey="id"
                        rowSelection={rowSelection}
                        dataSource={select}
                        columns={columnModal}
                        scroll={{ y: 400 }}
                        pagination={false}
                        bordered
                      />
                    </Col>
                  </Row>
                </Form>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Form
                  onFinish={onFinishModal}
                  form={modalForm}
                  style={{
                    height: 250,
                  }}
                >
                  <Form.Item
                    name="user"
                    style={{
                      marginTop: 25,
                    }}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      placeholder="Please select"
                      options={options}
                    />
                  </Form.Item>
                </Form>
              </React.Fragment>
            )}
          </Modal>
        </Col>
      </Row>
    </>
  );
}
