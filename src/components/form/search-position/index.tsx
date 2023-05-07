import { Col, Form, Input, Row } from "antd";
import IconSearch from "../../../assets/icons/icon-search.png";
import React from "react";

type Props = {};

export default function FormSearchRole({}: Props) {
  return (
    <React.Fragment>
      <Col md={6}>
        <Form.Item label="Position" name="id">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search Position"
          />
        </Form.Item>
      </Col>
      <Col></Col>
    </React.Fragment>
  );
}
