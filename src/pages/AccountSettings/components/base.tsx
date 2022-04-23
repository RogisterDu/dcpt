import { editSelfAccount, getSelfAccountInfo } from '@/services/account';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';

import styles from './BaseView.less';

const BaseView: React.FC = () => {
  const [baseForm] = Form.useForm();

  useEffect(() => {
    getSelfAccountInfo().then((res) => {
      if (res.code) {
        baseForm.setFieldsValue(res.data || {});
      } else {
        message.error(res.message || '获取账户信息失败');
      }
    });
  }, []);

  const toSaveBaseInfo = () => {
    baseForm.validateFields().then((values) => {
      editSelfAccount(values).then((res) => {
        if (res.code) {
          message.success('保存成功');
        } else {
          message.error(res.message || '保存失败');
        }
      });
    });
  };
  return (
    <div className={styles.baseView}>
      <Form form={baseForm} labelAlign="right">
        <Form.Item
          label="姓名"
          name="realName"
          rules={[
            {
              required: true,
              message: '请输入姓名',
            },
            {
              whitespace: true,
              message: '姓名不能存在空格',
            },
          ]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
            {
              pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
              message: '手机号格式有误',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item>
          <Button onClick={toSaveBaseInfo}>保存</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BaseView;
