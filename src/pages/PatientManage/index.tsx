import React from 'react';
import PatientList from './components/PatientList';
import styles from './index.less';

const PatientManage: React.FC = () => {
  return (
    <div className={`${styles.flexRow}`}>
      <div className={`${styles.leftArea}`}>
        <h1>病人列表</h1>
        <PatientList />
      </div>
      <div className="{`${styles.rightArea}`}">病人信息</div>
    </div>
  );
};
export default PatientManage;
