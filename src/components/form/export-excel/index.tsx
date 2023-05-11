import { Col, Form } from "antd";
import React from "react";
import userAPI from "../../../service/api/user";
import scheduleAPI from "../../../service/api/schedule";

type Props = {};

export default function FormExport({}: Props) {
  const downloadBlobFileUser = (
    data: Blob,
    extension: string,
    fileName: string = "report report"
  ) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    // console.log(link);

    link.href = url;
    link.download = "reportuser.xlsx";
    document.body.appendChild(link);
    link.click();
  };

  const downloadBlobFileSchedule = (
    data: Blob,
    extension: string,
    fileName: string = "report report"
  ) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    // console.log(link);

    link.href = url;
    link.download = "reportschedule.xlsx";
    document.body.appendChild(link);
    link.click();
  };

  const handleDownloadExportUser = () => {
    try {
      userAPI.exportExcelUser().then((res: Blob) => {
        console.log("exceluser", res);
        return downloadBlobFileUser(res, "xlsx", "");
      });
    } catch (err) {}
  };

  const handleDownloadExportSchedule = () => {
    try {
      scheduleAPI.exportExcelSchedule().then((res: Blob) => {
        console.log("excelschdule", res);
        return downloadBlobFileSchedule(res, "xlsx", "");
      });
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Col md={6}>
        <Form.Item></Form.Item>
      </Col>
    </React.Fragment>
  );
}
