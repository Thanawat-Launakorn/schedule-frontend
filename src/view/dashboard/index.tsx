import React from "react";
import { Button, Form, Select, Row, Col, Typography, Divider } from "antd";
import { auth } from "../../routes/default.router";
import { useNavigate } from "react-router-dom";
import authAPI from "../../service/api/auth";
import HeadTitle from "../../components/headtitle";
import Container from "../../components/container";

type Props = {};

export default function Dashboard({}: Props) {
  const navigate = useNavigate();
  const HeadTitleProps = {
    title: "Dashboard",
  };
  return (
    <Row>
      <Col span={24}>
        <HeadTitle {...HeadTitleProps} />
      </Col>
      <Col>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <Typography.Text>Position User</Typography.Text>
                  <Divider />
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </Col>
    </Row>
  );
}
