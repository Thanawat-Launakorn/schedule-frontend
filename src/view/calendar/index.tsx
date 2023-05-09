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
} from "antd";
import dayjs, { Dayjs } from "dayjs";

import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import userAPI, { useGetAllUser } from "../../service/api/user";
import { IUser, IUserColumnType } from "../../service/api/user/user-interface";
import scheduleAPI from "../../service/api/schedule";
import { openNotification } from "../../components/notifications";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";
import { CellEllipsisType } from "rc-table/lib/interface";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { IScheduleGetAll } from "../../service/api/schedule/schedule-interface";
import TableLayout from "../../components/table";
import { columnModalU } from "../../components/table/columns-interface";
import { ColumnsType } from "antd/es/table";
import HeadTitle from "../../components/headtitle";
import { useGetAllPosition } from "../../service/api/position";
type Props = {};

export default function AppCalendar({}: Props) {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { isLoading, data } = useGetAllUser();
  const [getSchedule, setSchedule] = React.useState([]);
  const [date, setDate] = React.useState<any>();
  const columnModalUser: ColumnsType<IUserColumnType> = [...columnModalU];

  // Modal
  const showModal = () => {
    const booking = getSchedule.filter((e: any) => {
      const renderDate = dayjs(date).format("YYYY-MM-DD");
      const dateCalendar = dayjs(e.calendar.date).format("YYYY-MM-DD");

      return dateCalendar === renderDate; //ข้อมูลในวันที่
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
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

    showModal();
  };

  const handleChange = (e: any) => {
    console.log(e.id);
  };

  const options: SelectProps["options"] = data?.map((e: IUser) => {
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

  const handleEdit = () => {};

  const handleDelete = () => {};

  const onFinish = (values: any) => {
    // กด submit ได้อะไร
    scheduleAPI
      .getScheduleById("2023/05/08")
      .then(() => {
        openNotification({ type: "success", title: "success" });
      })
      .catch((err) => {
        openNotification({ type: "error", title: `${err}` });
      })
      .finally(() => {
        setIsModalOpen(false);
        window.location.reload();
      });
  };

  const HeadTitleProps = {
    title: "Calendar",
  };

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
            title="Input User"
            width={!!data ? 520 : "80%"}
            style={{
              top: -80,
            }}
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {!!data ? (
              // Create Form
              <Form onFinish={onFinish} form={form}>
                <Form.Item name="user">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </Form>
            ) : (
              // Edit Form
              <Form>
                <TableLayout
                  columns={columnModalUser}
                  id="id"
                  title="Table User"
                  data={[]}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </Form>
            )}
          </Modal>
        </Col>
      </Row>
    </>
  );
}
