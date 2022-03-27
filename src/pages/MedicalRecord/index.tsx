import React from 'react';
import { Timeline } from 'antd';
import RecordCard from './components/RecordCard';
// import styles from './index.less';
// import { AppstoreAddOutlined } from '@ant-design/icons';

interface MedicalRecordProps {
  medicalRecord: any;
}

const MedicalRecord: React.FC<MedicalRecordProps> = ({ medicalRecord }) => {
  const renderTimeLines = (recordItem: any) => {
    console.log('1111', recordItem);
    return (
      <Timeline.Item>
        <RecordCard recordItem={recordItem} />
      </Timeline.Item>
    );
  };
  const mockdata = [
    {
      id: 1,
      time: '2020-01-01',
      info: {
        title: '这是病例记录',
        content: '这是病例记录',
        // recordTime: '2020-01-01',
        history: '123',
      },
    },
    {
      id: 2,
      time: '2020-01-01',
      info: null,
    },
  ];

  return (
    <>
      <Timeline>
        {medicalRecord?.map((recordItem: any) => {
          renderTimeLines(recordItem);
        }) || null}
        {mockdata.map((recordItem: any) => {
          return renderTimeLines(recordItem);
        }) || null}
      </Timeline>
    </>
  );
};
export default MedicalRecord;
