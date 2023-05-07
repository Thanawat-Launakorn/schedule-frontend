import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Segmented } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../../components/tab";
import type { ColumnsType } from "antd/es/table";
import { IItemsTabLayout } from "../../components/tab/tab-interface";
import FormSearchUser from "../../components/form/search-user";
import TableLayout from "../../components/table";
import { IUser, IUserColumnType } from "../../service/api/user/user-interface";
import { columnsP, columnsU } from "../../components/table/columns-interface";
import userAPI from "../../service/api/user";
import FormSearchRole from "../../components/form/search-position";
import HeadTitle from "../../components/headtitle";

type Props = {};

export default function ListUser({}: Props) {
  const [selectTabs, setSelectTabs] = React.useState<String>("1");
  const navigate = useNavigate();
  const [userData, setData] = React.useState<Array<IUser>>([]);
  const handleOnSearch = (values: any) => {
    console.log("Success:", values);
  };
  const handleOnCancelSearch = () => {};

  const handleOnTabChange = (activeKey: string) => {
    setSelectTabs(activeKey);
  };

  const handleClickEditUser = (record: object) => {
    const data = record as IUser;
    console.log(data);

    navigate(`/user-management/edit`, { state: { id: data.id } });
  };

  const columnUser: ColumnsType<IUserColumnType> = [...columnsU];
  const columnPosition: ColumnsType<IUserColumnType> = [...columnsP];
  const items: IItemsTabLayout[] = [
    {
      key: "1",
      label: "User",
      children: {
        search: {
          item: <FormSearchUser />,
          onFinish: handleOnSearch,
          onCancel: handleOnCancelSearch,
        },
        table: (
          <TableLayout
            title="Table User"
            id=""
            columns={columnUser}
            data={userData}
            onEdit={handleClickEditUser}
          />
        ),
      },
    },

    {
      key: "2",
      label: "Role",
      children: {
        search: {
          item: <FormSearchRole />,
          onFinish: handleOnSearch,
          onCancel: handleOnCancelSearch,
        },
        table: (
          <TableLayout
            title="Table Role"
            id=""
            columns={columnPosition}
            data={userData}
            onEdit={handleClickEditUser}
          />
        ),
      },
    },
  ];

  const HeadTitleProps = {
    title: "User Management",
  };

  const onAdd = async () => {
    if (selectTabs == "1") {
      navigate("/user-management/create/user");
    } else {
      navigate("/user-management/create/role");
    }
  };

  React.useEffect(() => {
    (async () => {
      const res = await userAPI.getAllUser();
      console.log(res);

      setData(res);
    })();
  }, []);
  return (
    <React.Fragment>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <HeadTitle
            {...HeadTitleProps}
            onAdd={onAdd}
            actionName={selectTabs === "1" ? "Add user" : "Add role"}
          />
        </Col>
        <Col span={24}>
          <Tab items={items} onChange={handleOnTabChange} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
