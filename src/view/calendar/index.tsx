import React from "react";
import { Calendar, Form, Modal, Select } from "antd";
import type { Dayjs } from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import userAPI from "../../service/api/user";

type Props = {};

export default function AppCalendar({}: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const [user, setUser] = React.useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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

  React.useEffect(() => {
    (async () => {
      const res = await userAPI.getAllUser();
      setUser(res);
      console.log(res);
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
          <Select className="">
            {...user.map((e: any) => {
              return <Select.Option key={e.id}>{e.name}</Select.Option>;
            })}
          </Select>
        </Form>
      </Modal>
    </>
  );
}
