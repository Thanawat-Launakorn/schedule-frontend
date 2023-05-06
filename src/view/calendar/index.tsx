import React from "react";
import { Calendar, Modal } from "antd";
import type { Dayjs } from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";

type Props = {};

export default function AppCalendar({}: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
  return (
    <>
      <Calendar onPanelChange={onPanelChange} onSelect={onPanelSelect} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}
