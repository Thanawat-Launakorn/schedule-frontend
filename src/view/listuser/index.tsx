import {
  AppstoreOutlined,
  BarsOutlined,
  ContactsOutlined,
  FileExcelFilled,
  FileExcelTwoTone,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Row,
  Segmented,
  Space,
  Typography,
} from "antd";
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
import { openNotification } from "../../components/notifications";
import { useForm } from "antd/es/form/Form";
import scheduleAPI from "../../service/api/schedule";
import exportExcel from "../../utils/excel";

type Props = {};

export default function ListUser({}: Props) {
  // const [form] = useForm();
  const [selectTabs, setSelectTabs] = React.useState<String>("1");
  const navigate = useNavigate();
  const [userData, setData] = React.useState<Array<IUser>>([]);
  const [params, setParams] = React.useState<Array<IUser>>([]);

  const handleOnSearch = (values: any) => {
    console.log("Success:", values);
    setParams(values);
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

  const handleClickDeleteUser = async (record: object) => {
    const data = record as IUser;
    try {
      await userAPI.deleteUser(Number(data.id));
    } catch (err) {
    } finally {
      window.location.reload();
    }
  };

  const downloadBlobFileUser = (
    data: Blob,
    extension: string,
    fileName: string = "report report"
  ) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    // console.log(link);

    link.href = url;
    link.download = "reportuser.xlsx";
    document.body.appendChild(link);
    link.click();
  };

  const handleDownloadExportUser = () => {
    try {
      userAPI.exportExcelUser().then((res: Blob) => {
        console.log("exceluser", res);
        return downloadBlobFileUser(res, "xlsx", "");
      });
    } catch (err) {}
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
            onDelete={handleClickDeleteUser}
          />
        ),
      },
    },

    {
      key: "2",
      label: "Position",
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
      const res = await userAPI.getAllUser(params);

      setData(res.data);
    })();
  }, [params]);

  return (
    <React.Fragment>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <HeadTitle
            {...HeadTitleProps}
            onAdd={onAdd}
            actionName={
              selectTabs === "1" ? (
                <Space align="center">
                  <UserAddOutlined />
                  <Typography.Text style={{ color: "white", marginBottom: 0 }}>
                    Add User
                  </Typography.Text>
                </Space>
              ) : (
                <Space align="center">
                  {/* <ContactsOutlined /> */}
                  <Typography.Text style={{ color: "white", marginBottom: 0 }}>
                    Add Position
                  </Typography.Text>
                </Space>
              )
            }
          />
        </Col>

        <Col span={24}>
          <Tab items={items} onChange={handleOnTabChange} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
