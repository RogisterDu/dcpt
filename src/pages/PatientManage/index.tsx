import React, { useEffect, useState } from 'react';
import PatientList from './components/PatientList';
import {
  Button,
  Cascader,
  Col,
  Empty,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Tabs,
} from 'antd';
import styles from './index.less';
import Info from './Info';
import MedicalRecord from '@/pages/MedicalRecord';
import ChargeRecord from '@/pages/ChargeRecord';
import DicomRecord from '@/pages/DicomRecord';
import { addNewPatient, editPatientInfo, queryFuzzyPatient } from '@/services/patient';
import DebounceSelect from '../components/DebounceSelect';
import { UserAddOutlined } from '@ant-design/icons';
import { patientInfoItems } from './data';
import './coverAntd.less';

const { TabPane } = Tabs;

const PatientManage: React.FC = () => {
  const [patientId, setPatientId] = useState('');
  const [tabkey, setTabkey] = useState('1');
  const [patientInfoVisable, setPatientInfoVisable] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [patientInfoForm] = Form.useForm();
  const [listrefresh, setListrefresh] = useState(0);
  const changePatientId = (id: string) => {
    console.log(id);
    setPatientId(id || '');
  };

  const fetchOptionsList = async (inputValue: string): Promise<any> => {
    const res = await queryFuzzyPatient({ fuzzy: inputValue });
    return (
      res?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
      })) || []
    );
  };

  function Tabscallback(key: any) {
    // history.replace({ pathname: '/center/patient/' + key, query: { id: patientId } });
    // console.log(key);
    setTabkey(key);
  }

  useEffect(() => {}, [patientId]);

  useEffect(() => {
    console.log(tabkey);
  }, [tabkey]);

  const setIdFromDebounce = (selected: any) => {
    console.log('111', selected);
    setPatientId(selected.value);
  };

  //空白页面渲染
  const renderBlank = () => {
    return (
      <div className={styles.blank}>
        <Empty description="请在左侧选择病人" />
      </div>
    );
  };

  const toAddNewPatient = () => {
    setPatientInfoVisable(true);
    patientInfoForm.resetFields();
  };

  const handleToFresh = () => {
    setListrefresh(Date.now());
  };

  const toSavePatient = () => {
    patientInfoForm.validateFields().then((values: any) => {
      console.log(values);
      setLoading(true);

      if (patientInfoForm.getFieldValue('id')) {
        values.id = patientInfoForm.getFieldValue('id');
        editPatientInfo(values)
          .then((res: any) => {
            if (res.code) {
              message.success('修改成功');
              setPatientInfoVisable(false);
              setListrefresh(Date.now());
            }
          })
          .finally(() => {
            setLoading(false);
          });
        return;
      }

      addNewPatient(values)
        .then((res: any) => {
          if (res.code) {
            message.success(res.message || '添加成功');
            setPatientInfoVisable(false);
            handleToFresh();
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleToEdit = (patientInfo: any) => {
    setPatientInfoVisable(true);
    patientInfoForm.setFieldsValue({
      ...patientInfo,
    });
  };

  //Tabs渲染
  const renderTabs = () => {
    return (
      // <Spin spinning={loading}>
      <Tabs
        defaultActiveKey="1"
        animated
        type="card"
        onChange={Tabscallback}
        className={`${styles.tabsRender}`}
      >
        <TabPane tab="个人信息" key="1" className={styles.tabContent}>
          {patientId && <Info patientId={patientId} handleToEdit={handleToEdit} />}
        </TabPane>
        <TabPane tab="电子病例" key="2">
          {patientId && <MedicalRecord patientId={patientId} />}
        </TabPane>
        <TabPane tab="收费记录" key="3">
          {patientId && <ChargeRecord patientId={patientId} handleToFresh={handleToFresh} />}
        </TabPane>
        <TabPane tab="医学影像" key="4">
          {patientId && <DicomRecord patientId={patientId} />}
        </TabPane>
      </Tabs>
      // </Spin>
    );
  };

  const renderFormItem = (item: any) => {
    switch (item.itemType) {
      case 'Input':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
            <Input {...item.itemProps} />
          </Form.Item>
        );
      case 'Select':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
            <Select {...item.itemProps} />
          </Form.Item>
        );
      case 'Number':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
            <InputNumber {...item.itemProps} style={{ width: '285px' }} />
          </Form.Item>
        );
      case 'Cascader':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
            <Cascader {...item.itemProps} />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        visible={patientInfoVisable}
        title="病人信息"
        width={1200}
        className="s-modal"
        destroyOnClose
        onCancel={() => {
          setPatientInfoVisable(false);
        }}
        mask
        footer={
          <>
            <Button loading={loading}>取消</Button>
            <Button loading={loading} onClick={toSavePatient}>
              保存
            </Button>
          </>
        }
      >
        <Form form={patientInfoForm} labelAlign="right">
          {patientInfoItems?.map((item: any) => {
            console.log('1', patientInfoItems);
            return (
              <>
                <h3 style={{ marginLeft: '40px' }}>{item.title}</h3>
                <Row gutter={8} justify="start" wrap key={item.name}>
                  {item.children.map((Ditem: any) => {
                    return (
                      <Col span={8} key={Ditem.name}>
                        {renderFormItem(Ditem)}
                      </Col>
                    );
                  })}
                </Row>
              </>
            );
          }) || null}
        </Form>
      </Modal>
      <div className={`${styles.flexRow}`}>
        <div className={`${styles.leftArea}`}>
          <DebounceSelect
            showSearch={true}
            placeholder="请输入患者姓名或者手机号"
            showArrow={true}
            fetchOptions={(value: any) => fetchOptionsList(value)}
            style={{ marginBottom: '20px' }}
            onChange={setIdFromDebounce}
          />
          <Button onClick={toAddNewPatient}>
            <UserAddOutlined />
          </Button>
          <PatientList handleId={changePatientId} refresh={listrefresh} />
        </div>
        <div className={`${styles.rightArea}`}> {patientId ? renderTabs() : renderBlank()}</div>
      </div>
    </>
  );
};
export default PatientManage;
