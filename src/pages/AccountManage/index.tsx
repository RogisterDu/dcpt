import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, Form, Modal, Input, Switch, Badge, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryAccoutManage, addNewAccount, editAccount } from '@/services/account';
import './antdCover.less';
// import getCNChar from '@/utils/cnHelper';
// import cnchar from 'cnchar-all';

const AccountManage: React.FC = () => {
  // console.log('AccountManage', cnchar.spell('收费管理'));
  const [accountForm] = Form.useForm();
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [saveloading, setSaveloading] = useState(false);
  const actionRef = useRef<ActionType>();

  type GithubIssueItem = {
    url: string;
    code: number;
    state: string;
    status: number;
    type: number;
    realName: string;
    id: number;
    last_login: string;
    phone: string;
    account: string;
  };

  const toEditAccountItem = (item: GithubIssueItem) => {
    console.log('编辑页面', item);
    // const { code, unitPrice, unit, status, type, AccountItem, id } = item;
    const { status, ...rest } = item;
    setItemModalVisible(true);
    accountForm.setFieldsValue({
      status: status === 0 ? true : false,
      ...rest,
    });
  };

  const toAddNewAccountItem = () => {
    setItemModalVisible(true);
    accountForm.resetFields();
  };

  const toSaveItem = () => {
    // setSaveloading(true);
    accountForm.validateFields().then((values) => {
      console.log('values', values);
      const { status, ...rest } = values;
      rest.status = status ? 0 : 1;

      if (accountForm.getFieldValue('id')) {
        rest.id = accountForm.getFieldValue('id');
        editAccount(rest)
          .then((res: any) => {
            if (res.code) {
              message.success('修改成功');
              setItemModalVisible(false);
              actionRef.current?.reload();
            } else {
              message.error(res?.message || '修改失败');
            }
          })
          .finally(() => {
            setSaveloading(false);
          });
        return;
      }
      addNewAccount(rest)
        .then((res) => {
          if (res.code) {
            message.success('添加成功');
            setItemModalVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(res?.message || '添加失败');
          }
        })
        .finally(() => {
          setSaveloading(false);
        });

      // setSaveloading(false);
      // setItemModalVisible(false);
    });
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '账号名',
      dataIndex: 'account',
      width: 100,
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_text, record) => {
        return (
          <Badge
            status={record.status === 0 ? 'success' : 'error'}
            text={record.status === 0 ? '启用' : '禁用'}
          />
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 60,
      render: (_text, record) => [
        <a key="editable" onClick={() => toEditAccountItem(record)}>
          编辑
        </a>,
      ],
    },
    // {
    //   title: '单位',
    //   dataIndex: 'unit',
    //   hideInSearch: true,
    // },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Modal
        visible={itemModalVisible}
        onCancel={() => setItemModalVisible(false)}
        className="s-modal"
        closable={true}
        centered
        mask
        destroyOnClose
        bodyStyle={{
          padding: '24px 42px 4px',
        }}
        title="账号管理"
        footer={
          <>
            <Button onClick={() => setItemModalVisible(false)} loading={saveloading}>
              取消
            </Button>
            <Button type="primary" onClick={toSaveItem} loading={saveloading}>
              保存
            </Button>
          </>
        }
      >
        <div>
          <Form labelAlign="right" form={accountForm}>
            <Form.Item
              label="账号"
              name="account"
              key="account"
              rules={[{ required: true, message: '登录账号不能为空' }]}
            >
              <Input placeholder="请输入登录账号" />
            </Form.Item>
            <Form.Item
              label="姓名"
              name="realName"
              key="realName"
              rules={[{ required: true, message: '姓名不能为空' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              label="手机号"
              name="phone"
              key="phone"
              rules={[
                { required: true, message: '手机号不能为空' },
                {
                  pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                  message: '手机号格式不正确',
                },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            {!accountForm.getFieldValue('id') ? (
              <Form.Item
                label="密码"
                name="password"
                key="password"
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input placeholder="输入密码" />
              </Form.Item>
            ) : (
              <Form.Item label="修改密码" name="password" key="password">
                <Input placeholder="输入新密码" />
              </Form.Item>
            )}
            <Form.Item
              label="状态"
              name="status"
              valuePropName="checked"
              key="status"
              initialValue={true}
            >
              <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <ProTable<GithubIssueItem>
        columns={columns}
        dateFormatter="string"
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter, params);
          const res = await queryAccoutManage({
            pageNo: params.current,
            pageSize: params.pageSize,
            name: params.AccountItem,
          });
          return {
            data: res?.data?.data || [],
            success: true,
            total: res.data.total,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        headerTitle="收费项目管理"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={toAddNewAccountItem}>
            新建
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </>
  );
};
export default AccountManage;
