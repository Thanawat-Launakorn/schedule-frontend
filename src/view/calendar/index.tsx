import React from "react";
import { Calendar, Form, Modal, notification, Select, SelectProps } from "antd";
import type { Dayjs } from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import userAPI from "../../service/api/user";
import { IUser } from "../../service/api/user/user-interface";
import scheduleAPI from "../../service/api/schedule";
import { openNotification } from "../../components/notifications";

type Props = {};

export default function AppCalendar({}: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const [user, setUser] = React.useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    scheduleAPI
      .createSchedule()
      .then(() => {
        openNotification({ type: "success", title: "success" });
      })
      .catch((err) => {
        openNotification({ type: "success", title: "success" });
      })
      .finally(() => setIsModalOpen(false));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const onPanelSelect = (value: Dayjs) => {
    console.log(value.format("YYYY-MM-DD"));
    showModal();
  };

  const handleChange = () => {};

  const options: SelectProps["options"] = user.map((e: IUser) => {
    return { value: e.id, label: e.name };
  });

  React.useEffect(() => {
    (async () => {
      const res = await userAPI.getAllUser();
      setUser(res);
    })();
  }, []);

  return (
    <>
      <Calendar onPanelChange={onPanelChange} onSelect={onPanelSelect} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={handleChange}
            options={options}
          />
        </Form>
      </Modal>
    </>
  );
}
