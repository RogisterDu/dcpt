import React from 'react';
import { Timeline } from 'antd';
import RecordCard from './components/RecordCard';
import styles from './index.less';
import './antdCover.less';
// import { AppstoreAddOutlined } from '@ant-design/icons';

interface MedicalRecordProps {
  medicalRecord: any;
}

const MedicalRecord: React.FC<MedicalRecordProps> = ({ medicalRecord }) => {
  // const handletoEdit = (id: any) => {
  //   console.log('id', id);
  // };

  const renderTimeLines = (recordItem: any) => {
    console.log('1111', recordItem);
    return (
      <Timeline.Item label={recordItem.time}>
        <RecordCard recordItem={recordItem} />
      </Timeline.Item>
    );
  };
  const mockdata = [
    {
      id: 1,
      time: '2020-01-01',
      isFirst: 0,
      doctor: '无',
      info: {
        title: '这是病例记录',
        // content: '这是病例记录',
        history: '123',
        allergic: '无',
        main: '牙疼',
        now: '无',
        cure: '治疗方案',
        location: '无',
      },
    },
    {
      id: 2,
      time: '2020-01-01',
      info: null,
    },
  ];

  return (
    <div className={styles.medicalArea}>
      <Timeline mode="left">
        {medicalRecord?.map((recordItem: any) => {
          renderTimeLines(recordItem);
        }) || null}
        {mockdata.map((recordItem: any) => {
          return renderTimeLines(recordItem);
        }) || null}
      </Timeline>
    </div>
  );
};
export default MedicalRecord;
