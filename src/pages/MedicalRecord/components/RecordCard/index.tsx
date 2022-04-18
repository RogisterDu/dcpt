import type { ReactText } from 'react';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Descriptions,
  Modal,
  Form,
  Space,
  Button,
  Input,
  Row,
  Col,
  Radio,
  Divider,
  message,
  Spin,
  Popconfirm,
} from 'antd';
import styles from '../../index.less';
import '../../antdCover.less';
import { AppstoreAddOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DropSelect from '@/pages/components/DropSelect';
import ProList from '@ant-design/pro-list';
interface RecordCardProps {
  recordItem: any;
  handletoRefresh: () => void;
}
import {
  deleteSingleTemplate,
  editRecord,
  queryTemplateList,
  saveTemplateApi,
} from '@/services/record';
// import InfiniteScroll from 'react-infinite-scroll-component';

interface infoInterface {
  main: string;
  now: string;
  cure: string;
  check: any;
  history: string;
  allergic: string;
  epidemic: string;
  advice: string;
}

interface templateInterface {
  id: number | string;
  main: string;
  now: string;
  cure: string;
  // check: string;
  history: string;
  allergic: string;
  epidemic: string;
  advice: string;
}

const RecordCard: React.FC<RecordCardProps> = ({ recordItem, handletoRefresh }) => {
  const [editVisable, setEditVisable] = useState(false); //病例数据编辑弹窗
  const [temaplateData, setTemaplateData] = useState<any>([]); //病例模板数据
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const { info, ...rest } = recordItem;

  const [editForm] = Form.useForm();
  const [templateNameForm] = Form.useForm();

  // loading
  const [templateLoading, setTemplateLoading] = useState(false);

  // const mockTemplateData = [
  //   {
  //     id: 1,
  //     title: '牙周炎',
  //     main: '主诉',
  //     now: '现病史',
  //     cure: '治疗方案',
  //     history: '既往史',
  //     allergic: '过敏史',
  //     epidemic: '传染病史',
  //     advice: '医嘱',
  //   },
  //   {
  //     id: 2,
  //     title: '牙周炎',
  //     main: '',
  //   },
  // ];

  const getTemplateList = async () => {
    setTemplateLoading(true);
    await queryTemplateList()
      .then((res: any) => {
        setTemaplateData(res.data || []);
      })
      .finally(() => {
        setTemplateLoading(false);
      });
  };

  useEffect(() => {
    if (editVisable) {
      getTemplateList();
    }
  }, [editVisable]);

  const EmptyRecord = {
    main: '',
    now: '',
    cure: '',
    check: [
      {
        location1: '',
        location2: '',
        location3: '',
        location4: '',
        content: '',
      },
    ],
    history: '',
    allergic: '',
    epidemic: '',
  };

  const toFillWithTemplate = (template: any) => {
    const { id, ...butId } = template;
    editForm.setFieldsValue({
      ...butId,
    });
  };

  //展示病例Card
  const rendertitle = () => {
    const { time } = recordItem;
    return <div className={styles.time}>{time}</div>;
  };

  const renderCheckDetail = (checkItem: any) => {
    const { location1, location2, location3, location4, content } = checkItem;
    return (
      <div className={styles.check}>
        <Row gutter={[0, 0]}>
          <Col span={12} className={`${styles.location1} ${styles.locationShow}`}>
            {location1 || ''}
          </Col>
          <Col span={12} className={`${styles.location2} ${styles.locationShow}`}>
            {location2 || ''}
          </Col>
          <Col span={12} className={`${styles.location3} ${styles.locationShow}`}>
            {location3 || ''}
          </Col>
          <Col span={12} className={`${styles.location4} ${styles.locationShow}`}>
            {location4 || ''}
          </Col>
        </Row>
        <div style={{ marginLeft: '20px' }}>{content || ''}</div>
      </div>
    );
  };

  //Card病例详情内容
  const renderInfo = (Detailinfo: infoInterface) => {
    console.log('Detailinfo', Detailinfo);
    const { main, now, cure, check, history, allergic, epidemic } = Detailinfo;
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
            {epidemic || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="过敏史" span={2}>
            {allergic || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="检查" span={4}>
            {check?.map((item: any) => {
              return renderCheckDetail(item);
            }) || '-'}
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

  //添加病例
  const toAddNewDetail = () => {
    setEditVisable(true);
    editForm.setFieldsValue({
      ...EmptyRecord,
    });
  };

  //提交病例Form表单
  const onSubmitEditForm = () => {
    const { id } = recordItem;
    console.log('111');

    editForm.validateFields().then((Formvalues) => {
      const { doctor, ...trueValues } = Formvalues;
      console.log('Formvalues', Formvalues, doctor);
      trueValues.doctor = doctor.value;
      editRecord({ id, ...trueValues }).then((res) => {
        console.log('res', res);
        if (res.code) {
          message.success('修改成功');
          handletoRefresh();
          setEditVisable(false);
        } else {
          message.error('修改失败');
        }
      });

      // console.log('Formvalues', Formvalues);
      // console.log(Formvalues);
    });
  };

  //Card添加诊断内容
  const renderAddDetail = () => {
    return (
      <div className={`${styles.flexcenter} ${styles.detailsArea}`}>
        <a onClick={toAddNewDetail}>
          <AppstoreAddOutlined />
          &nbsp;&nbsp;添加诊断
        </a>
      </div>
    );
  };

  //
  const toEdit = () => {
    const { doctor_id, doctor, ...restInfo } = info;
    restInfo.doctor = {
      value: doctor_id,
      label: doctor,
    };
    // console.log('rItem', rItem);
    setEditVisable(true);
    editForm.setFieldsValue({
      ...restInfo,
      ...rest,
    });
  };

  const saveAsTemplate = () => {
    // console.log('saveAsTemplate');
    //getEditFromALlValues
    // const FormValues = editForm.getFieldsValue();
    // console.log('FormValues', FormValues);
    // 检查每项是否为空
    templateNameForm.resetFields();
    Modal.confirm({
      title: '请输入病例模板名称',
      mask: true,
      style: { marginTop: '200px' },
      content: (
        //antd V4
        <Form name="form_in_modal" form={templateNameForm}>
          <Form.Item
            name="templateName"
            label="模板名称"
            rules={[{ required: true, message: '请输入模板名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
      onOk() {
        templateNameForm.validateFields().then((values) => {
          const { templateName } = values;
          const FormValues = editForm.getFieldsValue();
          console.log('FormValues', FormValues, templateName);
          saveTemplateApi({ ...FormValues, name: templateName }).then((res: any) => {
            if (res.code) {
              message.success('保存成功');
              getTemplateList();
            } else {
              message.error(res?.message || '保存失败');
              return new Promise((_resolve, reject) => {
                reject();
              });
            }
          });
        });
      },
    });
  };

  const renderCardExtra = (id: any) => {
    console.log('id', id);
    return <a onClick={() => toEdit()}>编辑</a>;
  };

  const toDeleteTemplate = (id: any) => {
    console.log('id', id);
    deleteSingleTemplate({ id }).then((res: any) => {
      if (res.code) {
        message.success('删除成功');
      }
      getTemplateList();
    });
  };

  return (
    <>
      <Modal
        //编辑弹窗
        destroyOnClose
        visible={editVisable}
        closable
        // onOk={onSubmitEditForm}
        onCancel={() => {
          setEditVisable(false);
        }}
        mask
        className="s-modal"
        width={1500}
        title="病例诊断"
        footer={[
          <Button key="back" onClick={() => setEditVisable(false)}>
            cancel
          </Button>,
          <Button key="saveTemplate" onClick={saveAsTemplate}>
            另存为模板
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmitEditForm}>
            提交
          </Button>,
        ]}
      >
        <div className={styles.editModalArea}>
          <div className={styles.leftArea}>
            <div className={styles.templateListArea}>
              <Spin spinning={templateLoading}>
                {/* <InfiniteScroll
                  next={() => {}}
                  hasMore={false}
                  dataLength={temaplateData.length}
                  loader={<></>}
                > */}
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
                    actions: {
                      render: (_, record: any) => {
                        return (
                          <div className={styles.action}>
                            <a onClick={() => toFillWithTemplate(record)}>导入</a>
                            <Divider type="vertical" />
                            {/* <Popconfirm
                              title="Are you sure to delete this task?"
                              onConfirm={() => toDeleteTemplate(record.id)}
                              okText="Yes"
                              cancelText="No"
                            > */}
                            <a onClick={() => toDeleteTemplate(record.id)}>删除</a>
                            {/* </Popconfirm> */}
                          </div>
                        );
                      },
                    },
                    description: {
                      render: (_, value: any) => {
                        const { main, now, cure, history, allergic, advice } = value;
                        return (
                          <>
                            <div className={styles.templateDesc}>
                              {/* <span className={styles.templateText}>病例号:{id || '-'}</span> */}
                              <span className={styles.templateText}>主诉:{main || '-'}</span>
                              <span className={styles.templateText}>现病史:{now || '-'}</span>
                              <span className={styles.templateText}>既往史:{history || '-'}</span>
                              <span className={styles.templateText}>过敏史:{allergic || '-'}</span>
                              {/* <div>检查:</div> */}
                              <span className={styles.templateText}>治疗方案:{cure || '-'}</span>
                              <span className={styles.templateText}>医嘱:{advice || '-'}</span>
                            </div>
                          </>
                        );
                      },
                    },
                  }}
                />
                {/* </InfiniteScroll> */}
              </Spin>
            </div>
          </div>
          {/* <Divider type="vertical" style={{ height: '100%' }} /> */}
          <div className={styles.rightArea}>
            <Form form={editForm} labelAlign="right">
              <Row>
                <Col span={8}>
                  <Form.Item label="主治医师" name="doctor">
                    <DropSelect
                      searchInfo={{
                        api: '/api/doctor/query/list',
                      }}
                      placeholder="请选择主治医生"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="初诊/复诊" name="isFirst">
                    <Radio.Group>
                      <Radio value="0">初诊</Radio>
                      <Radio value="1">复诊</Radio>
                    </Radio.Group>
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
                  <Form.Item
                    label="现病史"
                    name="now"
                    rules={[{ required: true, message: '请输入现病史' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="既往史"
                    name="history"
                    rules={[{ required: true, message: '请输入既往史' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="流行病学史" name="epidemic">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="过敏史" name="allergic">
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
        extra={info && Object.keys(info).length > 0 ? renderCardExtra(recordItem) : null}
        style={{ width: 1000 }}
        className="cardCover"
      >
        {info && Object.keys(info).length > 0 ? renderInfo(info) : renderAddDetail()}
      </Card>
    </>
  );
};
export default RecordCard;
