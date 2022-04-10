import React, { useEffect } from 'react';
import { Button, message, Timeline } from 'antd';
import RecordCard from './components/RecordCard';
import styles from './index.less';
import './antdCover.less';
import { queryRecordList, addRecord } from '@/services/record';
// import { AppstoreAddOutlined } from '@ant-design/icons';

interface MedicalRecordProps {
  patientId: any;
}

const MedicalRecord: React.FC<MedicalRecordProps> = ({ patientId }) => {
  const [recordList, setRecordList] = React.useState([]);
  // const handletoEdit = (id: any) => {
  //   console.log('id', id);
  // };

  const getRecordList = () => {
    queryRecordList({ patientId }).then((res) => {
      setRecordList(res.data || []);
    });
  };

  useEffect(() => {
    if (patientId) {
      getRecordList();
    }
  }, [patientId]);

  const toAddNewMedical = () => {
    addRecord({ patientId }).then((res: any) => {
      if (res.code) {
        getRecordList();
      } else {
        message.error(res.message || '添加失败');
      }
    });
    // console.log('toAddNewMedical');
  };

  const renderTimeLines = (recordItem: any) => {
    // console.log('1111', recordItem);
    return (
      <Timeline.Item label={recordItem.time}>
        <RecordCard recordItem={recordItem} handletoRefresh={getRecordList} />
      </Timeline.Item>
    );
  };
  // const mockdata = [
  //   {
  //     id: 1,
  //     time: '2020-01-01',
  //     isFirst: 0,
  //     doctor: '无',
  //     info: {
  //       title: '这是病例记录',
  //       // content: '这是病例记录',
  //       history: '123',
  //       allergic: '无',
  //       main: '牙疼',
  //       now: '无',
  //       cure: '治疗方案',
  //       epidemic: '流行病',
  //       advice: '医嘱',
  //       check: [
  //         {
  //           location1: '1',
  //           location2: '2',
  //           location3: '3',
  //           location4: '4',
  //           content: '检查记录',
  //         },
  //         {
  //           location1: '1',
  //           location2: '2',
  //           location3: '3',
  //           location4: '4',
  //           content: '检查记录',
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     id: 2,
  //     time: '2020-01-01',
  //     info: null,
  //   },
  // ];

  return (
    <>
      <div className={styles.medicalAction}>
        <Button size="large" onClick={toAddNewMedical}>
          新增病例
        </Button>
      </div>
      <div className={styles.medicalArea}>
        <Timeline mode="left">
          {/* {medicalRecord?.map((recordItem: any) => {
         renderTimeLines(recordItem);
       }) || null} */}
          {recordList.map((recordItem: any) => {
            return renderTimeLines(recordItem);
          }) || null}
        </Timeline>
      </div>
    </>
  );
};
export default MedicalRecord;
