import type { ReactText } from 'react';
import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Modal, Form, Divider, Space, Button, Input, Row, Col } from 'antd';
import styles from '../../index.less';
import '../../antdCover.less';
import { AppstoreAddOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DropSelect from '@/pages/components/DropSelect';
import ProList from '@ant-design/pro-list';
interface RecordCardProps {
  recordItem: any;
}

interface infoInterface {
  main: string;
  now: string;
  cure: string;
  location: string;
  history: string;
  allergic: string;
}

interface templateInterface {
  id: number | string;
  main: string;
  now: string;
  cure: string;
  location: string;
  history: string;
  allergic: string;
}

const RecordCard: React.FC<RecordCardProps> = ({ recordItem }) => {
  const [editVisable, setEditVisable] = useState(false); //病例数据编辑弹窗
  const [temaplateData, setTemaplateData] = useState<any>([]); //病例模板数据
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const { time, info } = recordItem;

  const [editForm] = Form.useForm();

  const mockTemplateData = [
    {
      id: 1,
      title: '牙周炎',
      main: '',
    },
    {
      id: 2,
      title: '牙周炎',
      main: '',
    },
  ];
  useEffect(() => {
    if (editVisable) {
      setTemaplateData(mockTemplateData);
    }
  }, [editVisable]);

  // const fillWithTemplate = (data: any) => {
  //   console.log(data);
  // };

  //展示病例Card
  const rendertitle = () => {
    return <div className={styles.time}>{time}</div>;
  };
  const renderInfo = (Detailinfo: infoInterface) => {
    // console.log('Detailinfo', Detailinfo);
    const { main, now, cure, location, history, allergic } = Detailinfo;
    return (
      <div className={styles.details}>
        <Descriptions bordered column={4}>
          <Descriptions.Item label="主诉" span={4}>
            {main || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="现病史" span={2}>
            {now || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="既往史" span={2}>
            {history || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="流行病史" span={2}>
            流行病史
          </Descriptions.Item>
          <Descriptions.Item label="过敏史" span={2}>
            {allergic || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="检查" span={4}>
            {location || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="治疗方案" span={4}>
            {cure || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="医嘱" span={4}>
            医嘱
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  const toAddNewDetail = () => {
    setEditVisable(true);
  };

  const onSubmitEditForm = () => {
    console.log('111');
    editForm.validateFields().then((Formvalues) => {
      console.log('Formvalues', Formvalues);
      console.log(Formvalues);
    });
  };

  const renderAddDetail = () => {
    return (
      <div className={`${styles.flexcenter} ${styles.detailsArea}`}>
        <a onClick={() => toAddNewDetail}>
          <AppstoreAddOutlined />
          &nbsp;&nbsp;添加诊断
        </a>
      </div>
    );
  };

  const toEdit = (id: any) => {
    console.log('id', id);
    setEditVisable(true);
  };

  const renderCardExtra = (id: any) => {
    console.log('id', id);
    return <a onClick={() => toEdit(id)}>编辑</a>;
  };

  return (
    <>
      <Modal
        //编辑弹窗
        destroyOnClose
        visible={editVisable}
        closable
        onOk={onSubmitEditForm}
        onCancel={() => {
          setEditVisable(false);
        }}
        className="s-modal"
        width={1200}
        title="病例诊断"
      >
        <div className={styles.editModalArea}>
          <div className={styles.leftArea}>
            <div className={styles.templateListArea}>
              <ProList<templateInterface>
                className={styles.templateList}
                bordered={true}
                split={true}
                dataSource={temaplateData || []}
                rowKey="id"
                headerTitle="病例模板"
                expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                metas={{
                  title: {},
                  description: {
                    render: (_, value: any) => {
                      const { id, main, now, cure, history, allergic } = value;
                      return (
                        <>
                          <div className={styles.templateDesc}>
                            <span className={styles.templateText}>病例号:{id || '-'}</span>
                            <span className={styles.templateText}>主诉:{main || '-'}</span>
                            <span className={styles.templateText}>现病史:{now || '-'}</span>
                            <span className={styles.templateText}>既往史:{history || '-'}</span>
                            <span className={styles.templateText}>过敏史:{allergic || '-'}</span>
                            {/* <div>检查:</div> */}
                            <span className={styles.templateText}>治疗方案:{cure || '-'}</span>
                            <span className={styles.templateText}>医嘱:{main || '-'}</span>
                          </div>
                        </>
                      );
                    },
                  },
                }}
              />
            </div>
          </div>
          <Divider type="vertical" style={{ height: '100%' }} />
          <div className={styles.rightArea}>
            <Form form={editForm} labelAlign="right">
              <Row>
                <Col>
                  <Form.Item label="主治医师">
                    <DropSelect
                      searchInfo={{
                        api: '/dcpt/api/doctor/search',
                      }}
                      placeholder="请选择主治医生"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="主诉"
                    name="main"
                    rules={[{ required: true, message: '请输入主诉' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="现病史" name="now">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="既往史" name="history">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="流行病学史">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="过敏史">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="检查" />
                </Col>
                <Col span={18}>
                  <Form.List name="check">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key}>
                            <div className={styles.check}>
                              <div className={styles.location}>
                                <Row gutter={[0, 0]} align="middle">
                                  <Col span={10}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'location1']}
                                      className={`${styles.removeBottom} ${styles.location1}`}
                                    >
                                      <Input />
                                    </Form.Item>
                                  </Col>
                                  <Col span={10}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'location2']}
                                      className={`${styles.removeBottom} ${styles.location2}`}
                                    >
                                      <Input />
                                    </Form.Item>
                                  </Col>
                                  <Col span={10}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'location3']}
                                      className={`${styles.removeBottom} ${styles.location3}`}
                                    >
                                      <Input />
                                    </Form.Item>
                                  </Col>
                                  <Col span={10}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'location4']}
                                      className={`${styles.removeBottom} ${styles.location4}`}
                                    >
                                      <Input />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </div>
                              <Form.Item
                                {...restField}
                                name={[name, 'content']}
                                rules={[{ required: true, message: '检查' }]}
                                className={styles.checkContent}
                              >
                                <Input placeholder="请输入检查" />
                              </Form.Item>
                              <MinusCircleOutlined
                                style={{ marginLeft: '10px' }}
                                onClick={() => remove(name)}
                              />
                            </div>
                          </Space>
                        ))}
                        <Form.Item style={{ marginTop: '20px' }}>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            新增牙位
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="cure"
                    label="治疗方案"
                    rules={[{ required: true, message: '请输入治疗方案' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="医嘱"
                    name="advice"
                    rules={[{ required: true, message: '请输入医嘱' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Modal>
      <Card
        hoverable
        key={recordItem.id}
        title={rendertitle()}
        extra={info && Object.keys(info).length > 0 ? renderCardExtra(recordItem.id) : null}
        style={{ width: 1000 }}
        className="cardCover"
      >
        {info && Object.keys(info).length > 0 ? renderInfo(info) : renderAddDetail()}
      </Card>
    </>
  );
};
export default RecordCard;
