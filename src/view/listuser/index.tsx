import React from "react";

import { IUser } from "../../service/api/user/user-interface";
import Table, { ColumnType, ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import userAPI from "../../service/api/user";
import { Avatar, Button, Col, Row, Space } from "antd";
type Props = {};
export default function ListUser({}: Props) {
  const [getData, setData] = React.useState<IUser[]>([]);
  const navigate = useNavigate();
  const handleEdit = (id: string | number) => {
    navigate(`/listuser/edit/${id}`);
  };
  const handleCreate = () => {
    navigate(`/listuser/create/`);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const res = await userAPI.getAllUser();
        console.log("data", res);
        setData(res);
      } catch (err) {
        // console.log(err);
      }
    })();
  }, []);

  const dataTable = getData.map((item, index) => {
    // console.log("item", item);

    return {
      ...item,
      key: index,
    };
  });

  const columnUser: ColumnsType<IUser> = [
    {
      title: "Name",
      render: (_, rc) => {
        const img = rc.img || "-";
        const name = rc.name || "-";
        const email = rc.email || "-";
        return (
          <div>
            <Space align="center" size="middle">
              <Row>
                <Col>
                  {" "}
                  <Avatar src={img} alt="image-profile" size={50} />
                </Col>
                <Col className="ms-5">
                  <div>{name}</div>
                  <div>Email: {email}</div>
                </Col>
              </Row>
            </Space>
          </div>
        );
      },
    },
    {
      title: "Position",
      render: (_, rc) => {
        const position = rc?.position?.position || "-";
        // console.log(position);
        return <div>{position}</div>;
      },
    },
    {
      title: "Phone",
      render: (_, rc) => {
        const tel = rc?.tel || "-";
        // console.log(tel);
        return <div>{tel}</div>;
      },
    },
    {
      title: "Actions",
      align: "center",
      render: (_, rc) => {
        return (
          <div className="grid grid-cols-2">
            <span className="text-center">
              <button
                onClick={() => handleEdit(rc.id || "-")}
                className="text-red-500"
              >
                Edit
              </button>
            </span>
            <span className="text-center">
              <button
                // onClick={() => handleDelete(rc.id || "-")}
                className=" text-red-600"
              >
                Delete
              </button>
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="">
        <div>ListUser</div>

        <div className="text-end mr-5 mb-2">
          <Button onClick={() => handleCreate()}>Add</Button>
        </div>
      </div>

      <div>
        <Table columns={columnUser} dataSource={dataTable}></Table>
      </div>
    </div>
  );
}
