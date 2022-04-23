import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Divider, Form, InputNumber, List, message, Row } from 'antd';
import styles from '../../index.less';
import '../../antdCover.less';
import { AppstoreAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryChargeList } from '@/services/charge';
import { saveChargeItem, payToCharge, toVaildCharge } from '@/services/fee';
interface ChargeCardProps {
  chargeItem: any;
  handletoRefresh: () => void;
}

type GithubIssueItem = {
  url: string;
  code: number;
  state: string;
  unitPrice: number;
  unit: string;
};

type DataSourceType = {
  code: string;
  chargeItem: string;
  quantity: number;
  unitPrice: number;
  unit: string;
  totalPrice: number;
};

const ChargeCard: React.FC<ChargeCardProps> = ({ chargeItem, handletoRefresh }) => {
  console.log('chargeItem', chargeItem.status);
  const statusText = ['0', '待结算', '未付清', '已完成', '已作废'][chargeItem.status];
  // console.log('statusText', statusText, chargeItem.status);
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
            <div className={styles.listArea}>项目编码</div>
            <div className={styles.listArea}>收费项目</div>
            <div className={styles.listArea}>单价</div>
            <div className={styles.listArea}>数量</div>
            <div className={styles.listArea}>总价</div>
          </List.Item>
          {chargeDetail.map((item: any) => {
            return (
              <List.Item key={item.serial} className={styles.listItem}>
                <div className={styles.listArea}>{item.code}</div>
                <div className={styles.listArea}>{item.chargeItem}</div>
                <div className={styles.listArea}>
                  {item?.unitPrice?.toFixed(2) || 0}元 &nbsp;/&nbsp;
                  {item.unit}
                </div>
                <div className={styles.listArea}>{item.quantity}</div>
                <div className={styles.listArea}>
                  {(item?.unitPrice * item?.quantity).toFixed(2) || 0}&nbsp;元
                </div>
              </List.Item>
            );
          })}
        </List>
      </>
    );
  };
  const [saveLoading, setSaveLoading] = useState(false);

  const rendertitle = () => {
    const { time } = chargeItem;
    return <div className={styles.time}>{time}</div>;
  };

  const toShowCharge = () => {
    console.log('chargeItem', chargeItem);
    setChargeModal(true);
    payForm.resetFields();
    //calculate each item total price
    const temp = chargeDetail.map((item: any) => {
      return {
        code: item.code,
        chargeItem: item.chargeItem,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        unit: item.unit,
        totalPrice: item.quantity * item.unitPrice,
      };
    });
    console.log('temp', temp);
    setTempChargeList(temp);
  };

  const toInvaidCharge = () => {
    const { id } = chargeItem;
    toVaildCharge({ id }).then((res: any) => {
      if (res.code) {
        message.success('作废成功');
        handletoRefresh();
      } else {
        message.error(res.message || '作废失败');
      }
    });
  };

  const renderCardExtra = () => {
    const { status } = chargeItem;
    const btnRender = ['编辑', '收费', '支付'];
    return (
      <>
        {status !== 3 && status !== 4 ? (
          <a onClick={() => toShowCharge()}>{btnRender[status]}</a>
        ) : null}
        {status !== 4 && status !== 3 ? <Divider type="vertical" /> : null}
        {status !== 4 && <a onClick={() => toInvaidCharge()}>作废</a>}
      </>
    );
  };

  const toAddNewDetail = () => {
    console.log('toAddNewDetail');
    setChargeModal(true);
    setTempChargeList([]);
  };

  const justToSave = () => {
    console.log('justToSave');
    console.log('template', tempChargeList);
    if (tempChargeList.length === 0) {
      message.error('请先添加收费项目');
      return;
    }
    setSaveLoading(true);
    const params = {
      chargeDetail: tempChargeList,
      fee_id: chargeItem.id,
    };
    saveChargeItem(params)
      .then((res) => {
        if (res.code) {
          setChargeModal(false);
          handletoRefresh();
          message.success('保存成功');
        } else {
          message.error(res.message);
        }
      })
      .finally(() => {
        setSaveLoading(false);
      });

    // handletoRefresh();
  };

  const toCharge = () => {
    console.log('toCharge');
    const newPay = payForm.getFieldValue('newPay');
    if (!newPay) {
      message.error('请输入支付金额');
      return;
    }
    console.log('justToSave');
    console.log('template', tempChargeList);
    if (tempChargeList.length === 0) {
      message.error('请先添加收费项目');
      return;
    }
    setSaveLoading(true);
    const params = {
      chargeDetail: tempChargeList,
      fee_id: chargeItem.id,
    };
    if (chargeItem.status === 0 || chargeItem.status === 1) {
      saveChargeItem(params)
        .then((res1) => {
          if (res1.code) {
            payToCharge({
              fee_id: chargeItem.id,
              newPay: newPay,
              total: totalPrice,
            }).then((res2: any) => {
              if (res2.code) {
                message.success('支付成功');
                setChargeModal(false);
                handletoRefresh();
              } else {
                message.error(res2.message || '支付失败');
              }
            });
          } else {
            message.error(res1.message || '收费记录保存失败');
          }
        })
        .finally(() => {
          setSaveLoading(false);
        });
    } else {
      payToCharge({
        fee_id: chargeItem.id,
        newPay: newPay,
        total: totalPrice,
      })
        .then((res2: any) => {
          if (res2.code) {
            message.success('支付成功');
            setChargeModal(false);
            handletoRefresh();
          } else {
            message.error(res2.message || '支付失败');
          }
        })
        .finally(() => {
          setSaveLoading(false);
        });
    }
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
    const index = tempChargeList.findIndex((item: any) => item.code === record.code);
    if (index === -1) {
      //add new record
      setTempChargeList([
        ...tempChargeList,
        { ...record, quantity: 1, totalPrice: record.unitPrice },
      ]);
      tempChargeForm.setFieldsValue({
        [record.code]: 1,
      });
    } else {
      //update the quantity
      const newList = [...tempChargeList];
      newList[index].quantity = Number(newList[index].quantity) + 1;
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
      render: (_text, record) => {
        return `${record.unitPrice.toFixed(2)}元/${record.unit}`;
      },
    },
    // {
    //   title: '单位',
    //   dataIndex: 'unit',
    //   hideInSearch: true,
    // },
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
      render: (_text, record) => {
        return `${record.unitPrice.toFixed(2)}元/${record.unit}`;
      },
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      renderFormItem: (item, { value, onChange }) => (
        <InputNumber
          min={1}
          disabled={chargeItem.status !== 0 && chargeItem.status !== 1}
          value={value}
          onChange={onChange}
        />
      ),
    },
    {
      title: '总价',
      render: (_text, record) => {
        return record.quantity * record.unitPrice;
      },
      valueType: 'money',
      editable: false,
    },
  ];

  const Realaction: any = {
    title: '操作',
    valueType: 'option',
    width: 250,
    render: () => {
      return null;
    },
  };
  return (
    <>
      <Modal
        width={1400}
        centered
        visible={chargeModal}
        footer={
          <>
            <Button key="back" onClick={() => setChargeModal(false)} loading={saveLoading}>
              cancel
            </Button>
            {chargeItem.status < 2 ? (
              <Button key="saveTemplate" onClick={justToSave} loading={saveLoading}>
                保存
              </Button>
            ) : null}
            <Button key="submit" type="primary" onClick={toCharge} loading={saveLoading}>
              保存并收费
            </Button>
          </>
        }
        onCancel={() => setChargeModal(false)}
        title="收费详情"
      >
        <div className={styles.chargeModalArea}>
          <div className={styles.chargeListLeft}>
            收费项目
            {chargeItem.status == 0 || chargeItem.status == 1 ? (
              <ProTable
                columns={columns}
                rowKey="code"
                actionRef={actionRef}
                dateFormatter="string"
                headerTitle="收费项目"
                request={async (params = {}, sort, filter) => {
                  console.log(sort, filter, params);
                  const res = await queryChargeList({
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
                scroll={{ x: 'max-content', y: 300 }}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                }}
              />
            ) : null}
            <EditableProTable<DataSourceType>
              actionRef={editActionRef}
              headerTitle="收费列表"
              columns={
                chargeItem.status == 0 || chargeItem.status == 1
                  ? realChargecolumns.concat(Realaction)
                  : realChargecolumns
              }
              rowKey="code"
              scroll={{
                x: 960,
                y: 300,
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
                  console.log('onValuesChange', record, recordList);
                  const temp = recordList.map((item: any) => {
                    return {
                      code: item.code,
                      chargeItem: item.chargeItem,
                      quantity: item.quantity,
                      unitPrice: item.unitPrice,
                      unit: item.unit,
                      totalPrice: item.quantity * item.unitPrice,
                    };
                  });
                  setTempChargeList(temp);
                },
              }}
            />
          </div>
          <div>
            <div className={styles.chargeDetailRight}>
              <Form form={payForm}>
                <Row>
                  <Col span={24}>
                    <Form.Item label="总价">￥{totalPrice?.toFixed(2) || 0}</Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="已收">￥{chargeItem?.paid?.toFixed(2) || 0}</Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="收款" name="newPay">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles.cardContainer}>
        {/* <Image
          src="https://rogister.oss-cn-hangzhou.aliyuncs.com/img/1.png"
          preview={false}
          className={styles.statusImg}
        /> */}
        {chargeItem.status !== 0 && (
          <div
            className={`${styles.statusText} ${
              chargeItem.status === 4 ? styles.disabledText : styles.normalText
            }`}
          >
            <div className={styles.textinner}>{statusText}</div>
          </div>
        )}
        <Card
          hoverable
          key={chargeItem.id}
          title={rendertitle()}
          extra={chargeDetail && Object.keys(chargeDetail).length > 0 ? renderCardExtra() : null}
          style={{ width: 1000 }}
        >
          {chargeDetail && Object.keys(chargeDetail).length > 0 ? renderInfo() : renderAddDetail()}
        </Card>
      </div>
    </>
  );
};
export default ChargeCard;
