import { Col, Form, Input } from "antd";
import IconSearch from "../../../assets/icons/icon-search.png";
import React from "react";

type Props = {};

export default function FormSearchUser({}: Props) {
  return (
    <React.Fragment>
      <Col md={6}>
        <Form.Item label="Fullname" name="id">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search name"
          />
        </Form.Item>
      </Col>
      <Col md={6}>
        <Form.Item label="Email" name="email">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search email"
          />
        </Form.Item>
      </Col>

      <Col md={6}>
        <Form.Item label="Telephone" name="phone">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search telephone"
          />
        </Form.Item>
      </Col>
      <Col md={6}>
        <Form.Item label="status" name="status">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="Search status"
          />
        </Form.Item>
      </Col>
    </React.Fragment>
  );
}
