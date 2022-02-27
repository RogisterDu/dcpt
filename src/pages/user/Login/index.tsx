import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './index.less';
import { login } from './services';
import { getToken, setToken } from '@/utils/token';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    setLoading(true);
    const { data, success } = await login(values);
    if (success) {
      setToken(data.token);
      window.location.href = '/';
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (getToken()) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div>
      <Form
        form={loginForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
