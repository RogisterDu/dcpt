import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Form, InputNumber, List, Row } from 'antd';
import styles from '../../index.less';
import '../../antdCover.less';
import { AppstoreAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import request from '@/utils/request';
interface ChargeCardProps {
  chargeItem: any;
}

type GithubIssueItem = {
  url: string;
  code: number;
  state: string;
  unitPrice: number;
};

type DataSourceType = {
  code: string;
  chargeItem: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

const ChargeCard: React.FC<ChargeCardProps> = ({ chargeItem }) => {
  const actionRef = useRef<ActionType>();
  const editActionRef = useRef<ActionType>();
  const [chargeModal, setChargeModal] = useState(false);
  const [tempChargeList, setTempChargeList] = useState<DataSourceType[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<any>([]);
  const { chargeDetail } = chargeItem;
  const [totalPrice, setTotalPrice] = useState(0);
  const [payForm] = Form.useForm();
  const [tempChargeForm] = Form.useForm();
  const renderInfo = () => {
    return (
      <>
        <List split style={{ width: '860px' }}>
          <List.Item className={styles.listItem}>
            <div className={styles.listArea}>序号</div>
            <div className={styles.listArea}>收费项目</div>
            <div className={styles.listArea}>单价</div>
            <div className={styles.listArea}>数量</div>
            <div className={styles.listArea}>总价</div>
          </List.Item>
          {chargeDetail.map((item: any) => {
            return (
              <List.Item key={item.serial} className={styles.listItem}>
                <div className={styles.listArea}>{item.serial}</div>
                <div className={styles.listArea}>{item.chargeItem}</div>
                <div className={styles.listArea}>
                  {item.unitprice}&nbsp;
                  {item.unit}
                </div>
                <div className={styles.listArea}>{item.quantity}</div>
                <div className={styles.listArea}>{item.total}</div>
              </List.Item>
            );
          })}
        </List>
      </>
    );
  };

  const rendertitle = () => {
    const { time } = chargeItem;
    return <div className={styles.time}>{time}</div>;
  };

  const toShowCharge = () => {
    console.log('chargeItem', chargeItem);
    setChargeModal(true);
  };

  const renderCardExtra = (id: any) => {
    console.log('id', id);
    return (
      <>
        <a onClick={() => toShowCharge()}>收费</a>
      </>
    );
  };

  const toAddNewDetail = () => {
    console.log('toAddNewDetail');
  };

  const justToSave = () => {
    console.log('justToSave');
  };

  const toCharge = () => {
    console.log('toCharge');
  };

  // console.log('editableKeys', editableKeys);
  useEffect(() => {
    setTotalPrice(
      tempChargeList.reduce((total: number, item: any) => {
        return total + item.totalPrice;
      }, 0),
    );
    setEditableRowKeys(
      tempChargeList?.map((item: any) => {
        return item.code;
      }) || [],
    );
    editActionRef.current?.reload();
    console.log('tempChargeForm', tempChargeForm.getFieldsValue());
  }, [tempChargeList]);

  //Card添加诊断内容
  const renderAddDetail = () => {
    return (
      <div className={`${styles.flexcenter} ${styles.detailsArea}`}>
        <a onClick={toAddNewDetail}>
          <AppstoreAddOutlined />
          &nbsp;&nbsp;添加处置收费
        </a>
      </div>
    );
  };
  const toAddAsChargeItem = (record: any) => {
    //find the index of the record
    const index = tempChargeList.findIndex((item: any) => item.id === record.id);
    if (index === -1) {
      //add new record
      setTempChargeList([
        ...tempChargeList,
        { ...record, quantity: 1, totalPrice: record.unitPrice },
      ]);
    } else {
      //update the quantity
      const newList = [...tempChargeList];
      newList[index].quantity += 1;
      newList[index].totalPrice = newList[index].quantity * newList[index].unitPrice;
      setTempChargeList(newList);
      const { code, quantity } = newList[index];
      if (tempChargeForm.getFieldValue(code)) {
        tempChargeForm.setFieldsValue({
          [code]: { quantity: quantity },
        });
      }
    }
    console.log('toAddAsChargeItem', record);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 60,
      render: (_text, record) => [
        <a
          key="editable"
          onClick={() => {
            toAddAsChargeItem(record);
          }}
        >
          <PlusCircleOutlined />
        </a>,
      ],
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
    },
  ];

  const realChargecolumns: ProColumns<DataSourceType>[] = [
    {
      title: '项目编码',
      dataIndex: 'code',
      width: '30%',
      editable: false,
    },
    {
      title: '收费项目',
      dataIndex: 'chargeItem',
      editable: false,
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      editable: false,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      // editable: false,
    },
    {
      title: '总价',
      render: (_text, record) => {
        return record.quantity * record.unitPrice;
      },
      valueType: 'money',
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <Modal
        width={1400}
        centered
        visible={chargeModal}
        footer={[
          <Button key="back" onClick={() => setChargeModal(false)}>
            cancel
          </Button>,
          <Button key="saveTemplate" onClick={justToSave}>
            保存
          </Button>,
          <Button key="submit" type="primary" onClick={toCharge}>
            保存并收费
          </Button>,
        ]}
      >
        <div className={styles.chargeModalArea}>
          <div className={styles.chargeListLeft}>
            收费项目
            <ProTable
              columns={columns}
              rowKey="code"
              actionRef={actionRef}
              dateFormatter="string"
              headerTitle="收费项目"
              request={async (params = {}, sort, filter) => {
                console.log(sort, filter);
                return request<{
                  data: GithubIssueItem[];
                }>('/dcpt/chargeList/chargeItem', {
                  params,
                });
              }}
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
              }}
            />
            <EditableProTable<DataSourceType>
              actionRef={editActionRef}
              headerTitle="可编辑表格"
              columns={realChargecolumns}
              rowKey="code"
              scroll={{
                x: 960,
              }}
              value={tempChargeList}
              onChange={setTempChargeList}
              recordCreatorProps={false}
              editable={{
                form: tempChargeForm,
                type: 'multiple',
                editableKeys,
                actionRender: (_row, _config, defaultDoms) => {
                  return [defaultDoms.delete];
                },
                onValuesChange: (record, recordList) => {
                  setTempChargeList(recordList);
                },
              }}
            />
          </div>
          <div>
            <div className={styles.chargeDetailRight}>
              <Form form={payForm}>
                <Row>
                  <Col span={24}>
                    <Form.Item label="总价">￥{totalPrice.toFixed(2)}</Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="已收">￥</Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="收款">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
      <Card
        hoverable
        key={chargeItem.id}
        title={rendertitle()}
        extra={
          chargeDetail && Object.keys(chargeDetail).length > 0 ? renderCardExtra(chargeItem) : null
        }
        style={{ width: 1000 }}
      >
        {chargeDetail && Object.keys(chargeDetail).length > 0 ? renderInfo() : renderAddDetail()}
      </Card>
    </>
  );
};
export default ChargeCard;
