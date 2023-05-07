import { Row, Col, Typography, Space, Button } from "antd";
import React from "react";

type Props = {
  children?: React.ReactNode;
  title?: string;
  actionName?: string;
  breadcrumbNameMap?: Record<string, string>;
  onCancel?: VoidFunction | false;
  onSubmit?: VoidFunction | false;
  onAdd?: VoidFunction | false;
  action?: React.ReactElement;
};

export default function HeadTitle({
  title,
  onAdd,
  onCancel,
  onSubmit,
  action,
  actionName,
  children,
}: Props) {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        {title && (
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
        )}
      </Col>
      <Col>
        {!action && (
          <Space>
            {!!onCancel && (
              <Button style={{ width: 120, height: 48 }} onClick={onCancel}>
                ยกเลิก
              </Button>
            )}
            {!!onSubmit && (
              <Button
                style={{ width: 120, height: 48 }}
                type="primary"
                onClick={onSubmit}
              >
                บันทึก
              </Button>
            )}
            {!!onAdd && (
              <Button
                style={{ width: 120, height: 48 }}
                type="primary"
                onClick={onAdd}
              >
                {actionName}
              </Button>
            )}
          </Space>
        )}
        {action}
      </Col>
    </Row>
  );
}
