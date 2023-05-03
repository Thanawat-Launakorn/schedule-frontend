import React from "react";
import { Button, Form, Select, Row } from "antd";
import { auth } from "../../routes/default.router";
import { useNavigate } from "react-router-dom";
import authAPI from "../../service/api/auth";

type Props = {};

export default function Dashboard({}: Props) {
  const navigate = useNavigate();
  return <Row>Dashboard</Row>;
}
