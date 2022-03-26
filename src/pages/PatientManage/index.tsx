import React, { useEffect, useState } from 'react';
import PatientList from './components/PatientList';
import { Tabs } from 'antd';
import styles from './index.less';
import Info from './Info';

const { TabPane } = Tabs;

const PatientManage: React.FC = () => {
  const [patientId, setPatientId] = useState('');
  const [patientInfo, setPatientInfo] = useState([]);
  const [tabkey, setTabkey] = useState('1');
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
      setPatientInfo([]);
    }
  }, [patientId, tabkey]);

  //空白页面渲染
  const renderBlank = () => {
    return <div className={styles.blank}>暂无数据</div>;
  };

  //Tabs渲染
  const renderTabs = () => {
    return (
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
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="收费记录" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="医学影像" key="4">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
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
