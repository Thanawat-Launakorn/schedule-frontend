import { Col, Form, Input } from "antd";
import IconSearch from "../../../assets/icons/icon-search.png";
import React from "react";

type Props = {};

export default function FormSearchUser({}: Props) {
  return (
    <React.Fragment>
      <Col md={6}>
        <Form.Item label="Fullname" name="name">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search name"
            size="large"
          />
        </Form.Item>
      </Col>
      <Col md={6}>
        <Form.Item label="Email" name="email">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search email"
            size="large"
          />
        </Form.Item>
      </Col>

      <Col md={6}>
        <Form.Item label="Telephone" name="phone">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search telephone"
            size="large"
          />
        </Form.Item>
      </Col>
      <Col md={6}>
        <Form.Item label="status" name="status">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search status"
            size="large"
          />
        </Form.Item>
      </Col>
    </React.Fragment>
  );
}
