import React, { useEffect, useState } from 'react';
import PatientList from './components/PatientList';
import { Tabs, Spin } from 'antd';
import styles from './index.less';
import Info from './Info';
import MedicalRecord from '@/pages/MedicalRecord';

const { TabPane } = Tabs;

const PatientManage: React.FC = () => {
  const [patientId, setPatientId] = useState('');
  const [patientInfo, setPatientInfo] = useState([]); //患者信息数据
  const [medicalRecord, setMedicalRecord] = useState([]); //患者电子病例数据
  const [tabkey, setTabkey] = useState('1');
  const [loading, setLoading] = useState(false);
  const changePatientId = (Id: string) => {
    setPatientId(Id || '');
  };

  function Tabscallback(key: any) {
    // history.replace({ pathname: '/center/patient/' + key, query: { id: patientId } });
    // console.log(key);
    setTabkey(key);
  }

  useEffect(() => {
    if (patientId) {
      setLoading(true);
      setPatientInfo([]);
      setMedicalRecord([]);
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    console.log(tabkey);
    setPatientInfo([]);
    setMedicalRecord([]);
  }, [tabkey]);

  //空白页面渲染
  const renderBlank = () => {
    return <div className={styles.blank}>暂无数据</div>;
  };

  //Tabs渲染
  const renderTabs = () => {
    return (
      <Spin spinning={loading}>
        <Tabs
          defaultActiveKey="1"
          animated
          type="card"
          onChange={Tabscallback}
          className={`${styles.tabsRender}`}
        >
          <TabPane tab="个人信息" key="1" className={styles.tabContent}>
            <Info patientInfo={patientInfo} />
          </TabPane>
          <TabPane tab="电子病例" key="2">
            <MedicalRecord medicalRecord={medicalRecord} />
          </TabPane>
          <TabPane tab="收费记录" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="医学影像" key="4">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Spin>
    );
  };
  return (
    <div className={`${styles.flexRow}`}>
      <div className={`${styles.leftArea}`}>
        <h1>病人列表</h1>
        <PatientList handleId={changePatientId} />
      </div>
      <div className={`${styles.rightArea}`}> {!patientId ? renderTabs() : renderBlank()}</div>
    </div>
  );
};
export default PatientManage;
