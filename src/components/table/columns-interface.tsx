import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Row, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import { IUserColumnType } from "../../service/api/user/user-interface";
import GetPosition from "../../utils/position";

export const columnsU: ColumnsType<IUserColumnType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "15%",

    render: (_: any, record: IUserColumnType) => {
      return (
        <Row align="middle">
          <Col style={{ marginRight: 10 }}>
            <Avatar src={record.img} alt="image-profile" size="large" />
          </Col>
          <Col>
            <Typography.Title level={5} style={{ margin: 0, color: "#2F58CD" }}>
              {`${record.name}`}
            </Typography.Title>
            <Typography.Text>{`${record.email}`}</Typography.Text>
          </Col>
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
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "15%",

    render: (_: any, record: IUserColumnType) => {
      return (
        <Row align="middle">
          <Col style={{ marginRight: 10 }}>
            <Avatar src={record.img} alt="image-profile" size="large" />
          </Col>
          <Col>
            <Typography.Title level={5} style={{ margin: 0, color: "#2F58CD" }}>
              {`${record.name}`}
            </Typography.Title>
            <Typography.Text>{`${record.email}`}</Typography.Text>
          </Col>
        </Row>
      );
    },
  },
  {
    title: "Position",
    key: "position",
    dataIndex: "position",
    width: "15%",
    render: (_: any, record: IUserColumnType) => {
      return (
        <Row>
          <div>{`${GetPosition(record.positionId)}`}</div>
        </Row>
      );
    },
  },
];

export const columnModalU: ColumnsType<IUserColumnType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "15%",

    render: (_: any, record: IUserColumnType) => {
      return (
        <Row align="middle">
          <Col style={{ marginRight: 10 }}>
            <Avatar src={record.img} alt="image-profile" size="large" />
          </Col>
          <Col>
            <Typography.Title level={5} style={{ margin: 0, color: "#2F58CD" }}>
              {`${record.name}`}
            </Typography.Title>
            <Typography.Text>{`${record.email}`}</Typography.Text>
          </Col>
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

  {
    title: "Position",
    key: "position",
    dataIndex: "position",
    width: "15%",
    render: (_: any, record: IUserColumnType) => {
      return (
        <Row>
          <div>{`${GetPosition(record.positionId)}`}</div>
        </Row>
      );
    },
  },
];
