import {
  AppstoreOutlined,
  BarsOutlined,
  ContactsOutlined,
  ExclamationCircleFilled,
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
  Modal,
  Space,
  Typography,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../../components/tab";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { IItemsTabLayout } from "../../components/tab/tab-interface";
import FormSearchUser from "../../components/form/search-user";
import TableLayout from "../../components/table";
import { IUser, IUserColumnType } from "../../service/api/user/user-interface";
import { columnsP, columnsU } from "../../components/table/columns-interface";
import FormSearchRole from "../../components/form/search-position";
import HeadTitle from "../../components/headtitle";
import { openNotification } from "../../components/notifications";
import {} from "react-query";
import Table, { ColumnType } from "antd/es/table";
import userAPI, { useGetAllUser } from "../../service/api/user";
import { initParams, IPagination } from "../../config/axios/axios-interface";
import { useForm } from "antd/es/form/Form";
import { MAX_VERTICAL_CONTENT_RADIUS } from "antd/es/style/placementArrow";
type Props = {};

export default function ListUser({}: Props) {
  const [selectTabs, setSelectTabs] = React.useState<String>("1");
  const navigate = useNavigate();
  const [params, setParams] = React.useState<any>(initParams);
  const { data: getAllUser, isLoading: loadingAllUser } =
    userAPI.useGetAllUser(params);

  const [searchForm] = useForm();
  const handleOnSearch = (values: any) => {
    setParams({
      ...initParams,
      name: values.name || "",
      email: values.email || "",
      position: values.position || "",
      pagination: true,
    });
  };

  const handleOnCancelSearch = () => {
    searchForm.setFieldsValue({
      name: "",
      email: "",
      phone: "",
      status: "",
      position: "",
    });
  };

  const handleOnTabChange = (activeKey: string) => {
    setSelectTabs(activeKey);
  };

  const handleClickEditUser = (record: object) => {
    const data = record as IUser;

    navigate(`/user-management/edit/${data.id}`);
  };

  const handleClickDeleteUser = async (record: object) => {
    showDeleteConfirm(record);
  };

  const handlePagination = (pagenition: TablePaginationConfig) => {
    setParams({
      page: pagenition.current,
      limit: pagenition.pageSize,
    });
  };

  const showDeleteConfirm = (user: any) => {
    Modal.confirm({
      title: (
        <>
          Are u sure delete <span style={{ color: "red" }}>{user.name}</span>
        </>
      ),
      icon: <ExclamationCircleFilled />,
      content: "It will be deleted permanently. Are u sure? 🥹",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,

      onOk() {
        userAPI
          .deleteUser(user.id)
          .then(() => {
            openNotification({
              type: "success",
              title: "Delete user success ✅",
            });
          })
          .catch((err) => {
            openNotification({
              type: "error",
              title: "Cannot delete user ❌",
            });
          })
          .finally(() => {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          });
      },
      onCancel() {},
    });
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
            loading={loadingAllUser}
            id={"id"}
            columns={columnUser}
            data={getAllUser?.data}
            onEdit={handleClickEditUser}
            onDelete={handleClickDeleteUser}
            onChange={handlePagination}
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
            data={getAllUser?.data}
            onEdit={handleClickEditUser}
            onChange={handlePagination}
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

  React.useEffect(() => {});

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
          <Tab
            items={items}
            onChange={handleOnTabChange}
            searchForm={searchForm}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
// auifhuiesiufhieuhsfofuhesyhdfiuheiusfhe
