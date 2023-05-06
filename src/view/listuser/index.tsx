import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Button, Col, Row, Segmented } from "antd";
import React from "react";
import Container from "../../components/container";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";
import Tab from "../../components/tab";
import { IItemsTabLayout } from "../../components/tab/tab-interface";
import FormSearchUser from "../../components/form/search-user";
type Props = {};

export default function ListUser({}: Props) {
  const [selectTabs, setSelectTabs] = React.useState<String>("1");

  const handleOnSearch = (values: any) => {
    console.log("Success:", values);
  };
  const handleOnCancelSearch = () => {};

  const handleOnTabChange = (activeKey: string) => {
    setSelectTabs(activeKey);
  };
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
        table: <Table />,
      },
    },
  ];
  return (
    <React.Fragment>
      <Row gutter={[12, 12]}>
        <Col span={24}></Col>
        <Col span={24}>
          <Tab items={items} onChange={handleOnTabChange} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
