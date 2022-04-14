import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
  Button,
  Menu,
  Dropdown,
  Form,
  Modal,
  Input,
  Switch,
  InputNumber,
  Badge,
  message,
  Select,
} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryChargeManage, addNewCharge, editCharge } from '@/services/charge';
import './antdCover.less';
// import getCNChar from '@/utils/cnHelper';
// import cnchar from 'cnchar-all';

const ChargeManage: React.FC = () => {
  // console.log('ChargeManage', cnchar.spell('收费管理'));
  const [ChargeItemForm] = Form.useForm();
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [saveloading, setSaveloading] = useState(false);
  const actionRef = useRef<ActionType>();

  type GithubIssueItem = {
    url: string;
    code: number;
    state: string;
    unitPrice: number;
    unit: string;
    status: number;
    type: number;
    name: string;
    id: number;
    chargeItem: string;
  };

  const toEditChargeItem = (item: GithubIssueItem) => {
    console.log('编辑页面', item);
    const { code, unitPrice, unit, status, type, chargeItem, id } = item;
    setItemModalVisible(true);
    ChargeItemForm.setFieldsValue({
      id,
      code,
      unitPrice,
      name: chargeItem,
      unit,
      status: status === 0 ? true : false,
      type,
    });
  };

  const toAddNewChargeItem = () => {
    setItemModalVisible(true);
    ChargeItemForm.resetFields();
  };

  const toSaveItem = () => {
    // setSaveloading(true);
    ChargeItemForm.validateFields().then((values) => {
      console.log('values', values);
      const { status, ...rest } = values;
      rest.status = status ? 0 : 1;

      if (ChargeItemForm.getFieldValue('id')) {
        rest.id = ChargeItemForm.getFieldValue('id');
        editCharge(rest)
          .then((res: any) => {
            if (res.code) {
              message.success('修改成功');
              setItemModalVisible(false);
              actionRef.current?.reload();
            } else {
              message.error(res?.message || '添加失败');
            }
          })
          .finally(() => {
            setSaveloading(false);
          });
        return;
      }
      addNewCharge(rest)
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
      title: '项目编码',
      dataIndex: 'code',
      width: 100,
      hideInSearch: true,
    },
    {
      title: '收费项目',
      dataIndex: 'chargeItem',
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      hideInSearch: true,
      render: (_text, record) => {
        return `${record.unitPrice.toFixed(2)}元/${record.unit}`;
      },
    },
    {
      title: '医保类别',
      dataIndex: 'type',
      hideInSearch: true,
      render: (_text, record) => {
        return `${['甲', '乙', '丙'][record.type]}`;
      },
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
        <a key="editable" onClick={() => toEditChargeItem(record)}>
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
        title="收费项目"
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
          <Form labelAlign="right" form={ChargeItemForm}>
            <Form.Item
              label="项目编号"
              name="code"
              key="code"
              rules={[{ required: true, message: '项目编号不能为空' }]}
            >
              <Input placeholder="请输入项目编号" />
            </Form.Item>
            <Form.Item
              label="收费项目"
              name="name"
              key="name"
              rules={[{ required: true, message: '收费项目名称不能为空' }]}
            >
              <Input placeholder="请输入收费项目名称" />
            </Form.Item>
            <Form.Item
              label="医保类别"
              name="type"
              key="type"
              rules={[{ required: true, message: '医保类别不能为空' }]}
            >
              <Select>
                <Select.Option value="0">甲</Select.Option>
                <Select.Option value="1">乙</Select.Option>
                <Select.Option value="1">丙</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item
              label="项目缩写"
              name="name"
              key="name"
              rules={[{ required: true, message: '收费项目名称不能为空' }]}
            >
              <Input placeholder="请输入收费项目名称" />
            </Form.Item> */}
            <Form.Item
              label="状态"
              name="status"
              valuePropName="checked"
              key="status"
              initialValue={true}
            >
              <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
            </Form.Item>
            <Form.Item label="单价" name="unitPrice" key="unitPrice">
              <InputNumber placeholder="请输入单价" />
            </Form.Item>
            <Form.Item
              label="单位"
              name="unit"
              key="unit"
              rules={[
                { required: true, message: '单位不能为空' },
                { max: 10, message: '单位不能超过10个字符' },
              ]}
            >
              <Input placeholder="请输入单位" />
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
          const res = await queryChargeManage({
            pageNo: params.current,
            pageSize: params.pageSize,
            name: params.chargeItem,
          });
          return {
            data: res.data.data,
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
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={toAddNewChargeItem}>
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
export default ChargeManage;
