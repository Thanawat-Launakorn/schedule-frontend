import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Row, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import { IUserColumnType } from "../../service/api/user/user-interface";
import GetPosition from "../../utils/position";

export const columnsU: ColumnsType<IUserColumnType> = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    width: "2.5%",
    align: "center",
    render: (_: any, record: IUserColumnType) => {
      return (
        <Row align="middle">
          <Col style={{ marginLeft: 20 }}>
            <Avatar src={record.img} alt="image-profile" size="large" />
          </Col>
        </Row>
      );
    },
  },

  {
    title: "Name",
    key: "name",
    dataIndex: "name",
    width: "15%",
    render: (_: any, record: IUserColumnType) => {
      return (
        <Row>
          <div>{`${record.name}`}</div>
        </Row>
      );
    },
  },

  {
    title: "Email",
    key: "email",
    dataIndex: "email",
    width: "15%",
    render: (_: any, record: IUserColumnType) => {
      return (
        <Row>
          <div>{`${record.email}`}</div>
        </Row>
      );
    },
  },

  {
    title: "Telephone",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
    width: "15%",
    render: (_: any, record: IUserColumnType) => {
      return (
        <Row>
          <div>{`${record.tel}`}</div>
        </Row>
      );
    },
  },
  // {
  //   title: "Status",
  //   key: "status",
  //   dataIndex: "status",
  //   width: "5%",
  //   render: (_: any, record: IUserColumnType) => {
  //     return (
  //       <Row>
  //         <Button type="dashed">Disabled</Button>
  //       </Row>
  //     );
  //   },
  // },
];

export const columnsP: ColumnsType<IUserColumnType> = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    width: "5%",
    align: "center",
    render: (_: any, record: IUserColumnType) => {
      return (
        <Row align="middle">
          <Col style={{ marginLeft: 20 }}>
            <Avatar src={record.img} alt="image-profile" size="large" />
          </Col>
        </Row>
      );
    },
  },
  {
    title: "Position",
    key: "position",
    dataIndex: "position",
    width: "20%",
    render: (_: any, record: IUserColumnType) => {
      return (
        <Row>
          <div>{`${record.position.position}`}</div>
        </Row>
      );
    },
  },
];
