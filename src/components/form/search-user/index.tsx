import { Col, Form, Input } from "antd";
import IconSearch from "../../../assets/icons/icon-search.png";
import React from "react";

type Props = {};

export default function FormSearchUser({}: Props) {
  return (
    <React.Fragment>
      <Col md={6}>
        <Form.Item label="ชื่อ - นามสกุล" name="id">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="ชื่อ - นามสกุล"
          />
        </Form.Item>
      </Col>
      <Col md={6}>
        <Form.Item label="ค้นหาอีเมล" name="email">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="ค้นหาอีเมล"
          />
        </Form.Item>
      </Col>

      <Col md={6}>
        <Form.Item label="เบอร์โทรศัพท์ (มือถือ)" name="phone">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="เบอร์โทรศัพท์ (มือถือ)"
          />
        </Form.Item>
      </Col>
      <Col md={6}>
        <Form.Item label="สถานะ" name="status">
          <Input
            prefix={<img className="img-input-icons" src={IconSearch} />}
            placeholder="สถานะ"
          />
        </Form.Item>
      </Col>
    </React.Fragment>
  );
}
