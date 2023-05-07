import React from "react";
import { IItemsTabLayout, ISearch } from "./tab-interface";
import { Button, Col, Form, Row, Tabs, TabsProps } from "antd";
import Container from "../container";
import "./tab-layout.css";
type Props = {
  items: IItemsTabLayout[];
  onChange: (value: string) => void;
};

export default function TabLayout({ items, onChange }: Props) {
  const tabItems: TabsProps["items"] = items.map((item, _index) => ({
    label: item.label,
    key: item.key,
    children: (
      <Layout search={item.children.search} table={item.children.table} />
    ),
  }));
  return (
    <div>
      {items.length > 1 ? (
        <Tabs
          defaultActiveKey={"1"}
          items={tabItems}
          onChange={onChange}
          type="card"
        />
      ) : (
        <Layout
          search={items[0].children.search}
          table={items[0].children.table}
        />
      )}
    </div>
  );
}

interface ILayout {
  search: ISearch;
  table: React.ReactElement;
}
const Layout = ({ search, table }: ILayout) => {
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <React.Fragment>
      <Container className="!my-5">
        <Row>
          <Col span={24}>
            <Form
              name="search"
              onFinish={search.onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Row gutter={[8, 0]} justify="space-between">
                {search.item}
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={24}
                  style={{ alignItems: "end", display: "flex" }}
                >
                  <Row justify="start" style={{ flex: 1 }} gutter={[12, 0]}>
                    <Col span={5}>
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          className="w-full bnt-search"
                          type="primary"
                        >
                          Search
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item>
                        <Button className="w-full" onClick={search.onCancel}>
                          Cancel
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col span={24}>{table}</Col>
      </Row>
    </React.Fragment>
  );
};
