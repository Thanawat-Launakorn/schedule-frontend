import {
  EditFilled,
  EyeFilled,
  DeleteFilled,
  FileExcelFilled,
  CloudUploadOutlined,
} from "@ant-design/icons";
import {
  Col,
  Row,
  TablePaginationConfig,
  Typography,
  Table,
  Space,
  Button,
  Divider,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { IUser } from "../../service/api/user/user-interface";
import exportExcel from "../../utils/excel";

type Props = {
  id: string;
  title: string;
  loading?: boolean;
  columns: ColumnsType<any>;
  data?: readonly object[] | [];
  onEdit?: (record: object) => void;
  onDelete?: (record: object) => void;
  onView?: (record: object) => void;
  onChange?: (pagination: TablePaginationConfig) => void;
  pagination?: TablePaginationConfig;
};

export default function TableLayout({
  id = "id",
  title,
  loading,
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  onChange,
  pagination,
}: Props) {
  const columnBtnAction: ColumnsType<object> = [
    {
      title: "Action",
      key: "action",
      width: "1%",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {!!onEdit && (
            <Button type="ghost" onClick={() => onEdit(record)}>
              <EditFilled
                style={{
                  color: "#2F58CD",
                }}
              />
            </Button>
          )}
          {!!onView && (
            <Button type="ghost" onClick={() => onView(record)}>
              <EyeFilled />
            </Button>
          )}
          <Divider type="vertical" />
          {!!onDelete && (
            <Button type="ghost" onClick={() => onDelete(record)}>
              <DeleteFilled
                style={{
                  color: "tomato",
                }}
              />
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const columnMap: ColumnsType<object> = [...columns, ...columnBtnAction];
  return (
    <Row>
      <Col span={24}>
        <Row
          justify="space-between"
          align="middle"
          style={{ margin: 0, marginBottom: 20 }}
        >
          <Col span={12}>
            <Typography.Title level={5}>{title}</Typography.Title>
          </Col>
          {title === "Table User" && (
            <Col span={12} className="text-end">
              <Button className="w-28">
                <Row align="middle" justify="space-between">
                  <CloudUploadOutlined className="text-lg" />

                  <FileExcelFilled
                    onClick={exportExcel.handleDownloadExportUser}
                    style={{ display: "none" }}
                  />
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    import
                  </Typography.Title>
                </Row>
              </Button>
            </Col>
          )}
          {title === "Table Role" && (
            <Col>
              <Typography.Text style={{ fontSize: "16px", color: "green" }}>
                <FileExcelFilled
                  onClick={exportExcel.handleDownloadExportSchedule}
                  style={{ fontSize: "28px", color: "green" }}
                />
                schedule
              </Typography.Text>
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24}>
        <Table
          rowKey={"id"}
          scroll={{ x: 900 }}
          columns={columnMap}
          dataSource={data || []}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
}
