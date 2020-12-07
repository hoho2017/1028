import { ConnectProps, connect, LoginModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './login.less';
import { Form, Input, Button, Col, Row } from 'antd';

interface PageProps extends ConnectProps {
  login: LoginModelState;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};
const Login: FC<PageProps> = ({ login, dispatch }) => {
  const { user } = login;
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.box}>
      <div className={styles.inner}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登入
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default connect(({ login }: { login: LoginModelState }) => ({ login }))(
  Login,
);
