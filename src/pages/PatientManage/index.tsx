import React, { useEffect, useState } from 'react';
import PatientList from './components/PatientList';
import { Empty, Tabs } from 'antd';
import styles from './index.less';
import Info from './Info';
import MedicalRecord from '@/pages/MedicalRecord';
import ChargeRecord from '@/pages/ChargeRecord';
import DicomRecord from '@/pages/DicomRecord';

const { TabPane } = Tabs;

const PatientManage: React.FC = () => {
  const [patientId, setPatientId] = useState('');
  const [tabkey, setTabkey] = useState('1');
  // const [loading, setLoading] = useState(false);
  const changePatientId = (id: string) => {
    console.log(id);
    setPatientId(id || '');
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

  //空白页面渲染
  const renderBlank = () => {
    return (
      <div className={styles.blank}>
        <Empty description="请在左侧选择病人" />
      </div>
    );
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
          {patientId && <Info patientId={patientId} />}
        </TabPane>
        <TabPane tab="电子病例" key="2">
          {patientId && <MedicalRecord patientId={patientId} />}
        </TabPane>
        <TabPane tab="收费记录" key="3">
          {patientId && <ChargeRecord patientId={patientId} />}
        </TabPane>
        <TabPane tab="医学影像" key="4">
          {patientId && <DicomRecord patientId={patientId} />}
        </TabPane>
      </Tabs>
      // </Spin>
    );
  };
  return (
    <div className={`${styles.flexRow}`}>
      <div className={`${styles.leftArea}`}>
        <h1>病人列表</h1>
        <PatientList handleId={changePatientId} />
      </div>
      <div className={`${styles.rightArea}`}> {patientId ? renderTabs() : renderBlank()}</div>
    </div>
  );
};
export default PatientManage;
