import { Row, Col, Typography, Space, Button, theme } from "antd";
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
  const {
    token: { colorTextLabel, colorPrimary },
  } = theme.useToken();

  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        marginBottom: 10,
      }}
    >
      <Col>
        {title && (
          <Typography.Title
            level={4}
            style={{
              marginBottom: 0,
              color: colorPrimary,
              backgroundColor: "#FFFFFF",
              padding: "10px 30px",
              borderRadius: 10,
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            {title}
          </Typography.Title>
        )}
      </Col>
      <Col>
        {!action && (
          <Space>
            {!!onCancel && (
              <Button style={{ width: 120, height: 48 }} onClick={onCancel}>
                Cancel
              </Button>
            )}
            {!!onSubmit && (
              <Button
                style={{ width: 120, height: 48 }}
                type="primary"
                onClick={onSubmit}
                htmlType="submit"
              >
                Save Changes
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
