import { EditFilled, EyeFilled, DeleteFilled } from "@ant-design/icons";
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
      width: "5%",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {!!onEdit && (
            <Button type="ghost" onClick={() => onEdit(record)}>
              <EditFilled />
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
              <DeleteFilled />
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
        <Row justify="space-between">
          <Col>
            <Typography.Title level={5} style={{ margin: 0, marginBottom: 20 }}>
              {title}
            </Typography.Title>
          </Col>
          <Col></Col>
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
