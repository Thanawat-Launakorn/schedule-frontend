import { Button, Form, Input, Select, Upload } from "antd";
import React from "react";
import { IUser } from "../../service/api/user/user-interface";
import userAPI from "../../service/api/user";

type Props = {};

export default function EditUser({}: Props) {

  const onFinish = (values: IUser) => {
    userAPI.createUser
    
    console.log("Success:", values);
  };

  return (
    <div className="grid justify-center">
      <div>EditUser</div>
      <br />
      <Form className="" onFinish={onFinish}>
        <div className="">
          <Form.Item name="name" label="Name">
            <Input type="text" className="flex-initial w-80"></Input>
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input type="email" className="flex-initial w-80"></Input>
          </Form.Item>

          {/* <Form.Item name="password" label="Password">
            <Input.Password className="flex-initial w-80"></Input.Password>
          </Form.Item> */}

          <Form.Item name="tel" label="Telephone Number">
            <Input type="tel" className="flex-initial w-80"></Input>
          </Form.Item>

          <Form.Item
            name="position"
            label="Position"
            className="flex-initial w-80"
          >
            <Select
              // defaultValue={1}
              options={[
                { value: "1", label: "Backend Developer" },
                { value: "2", label: "Frontend Developer" },
                { value: "3", label: "Tester" },
                { value: "4", label: "ProjectManager" },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            name="img"
            label="Profile Image"
            valuePropName="img"
            getValueFromEvent={onFinish}
          >
            <Upload listType="picture-card" action="/images">
              <div>
                {/* <PlusOutlined></PlusOutlined> */}
                <div style={{ marginTop: 5 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5 }}>
            <Button htmlType="submit" className="">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
