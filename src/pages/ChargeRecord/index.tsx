import React, { useEffect, useState } from 'react';
import { Button, message, Spin, Timeline } from 'antd';
// import RecordCard from './components/RecordCard';
import ChargeCard from './components/ChargeCard';
import styles from './index.less';
import './antdCover.less';
import { addEmptyCharge, queryFeeList } from '@/services/fee';
import { AppstoreAddOutlined } from '@ant-design/icons';

interface chargeRecordProps {
  patientId: any;
}

const ChargeRecord: React.FC<chargeRecordProps> = ({ patientId }) => {
  const [record, setRecord] = useState<any>([]);
  const [queryLoading, setQueryLoading] = useState(false);

  const getFeeList = async () => {
    setQueryLoading(true);
    queryFeeList({ patientId })
      .then((res: any) => {
        console.log('res', res.data);
        setRecord([...res.data]);
      })
      .finally(() => {
        setQueryLoading(false);
      });
  };
  useEffect(() => {
    if (patientId) {
      console.log('patientId', patientId);
      getFeeList();
    }
  }, [patientId]);

  const toRefresh = () => {
    getFeeList();
  };

  const toAddNewCharge = () => {
    addEmptyCharge({ patientId }).then((res: any) => {
      if (res.code) {
        getFeeList();
      } else {
        message.error(res.message || '添加失败');
      }
    });
    // console.log('toAddNewCharge');
  };

  const renderTimeLines = (chargeItem: any) => {
    console.log('1111', chargeItem);
    return (
      <Timeline.Item label={chargeItem.time} key={chargeItem.id}>
        <ChargeCard chargeItem={chargeItem} handletoRefresh={toRefresh} />
        {/* <RecordCard chargeItem={chargeItem} /> */}
      </Timeline.Item>
    );
  };
  // const mockdata = [
  //   {
  //     id: 1,
  //     time: '2020-01-01',
  //     doctor: '李四',
  //     doctorId: 2,
  //     chargeDetail: [
  //       {
  //         serial: 1,
  //         code: 1244,
  //         chargeItem: '检查费',
  //         unitPrice: 100,
  //         unit: '元/件',
  //         quantity: 1,
  //       },
  //       {
  //         serial: 2,
  //         code: 1247,
  //         chargeItem: '一次性口腔包',
  //         unitPrice: 1500,
  //         unit: '元/人次',
  //         quantity: 1,
  //       },
  //     ],
  //     amount: '2000',
  //     shouldPay: 2000,
  //     paid: 2000,
  //     status: 0,
  //   },
  //   {
  //     id: 2,
  //     time: '2020-01-04',
  //     charger: '张三',
  //     chargerId: 1,
  //     doctor: '李四',
  //     doctorId: 2,
  //     chargeDetail: [
  //       {
  //         code: 1244,
  //         chargeItem: '检查费',
  //         unitprice: 10000,
  //         unit: '元/件',
  //         quantity: 1,
  //       },
  //       {
  //         chargeItem: '一次性口腔包',
  //         unitprice: 1500,
  //         unit: '元/人次',
  //         quantity: 1,
  //       },
  //     ],
  //     status: 1,
  //     amount: 2000,
  //     shouldPay: '2000',
  //     paid: 2000,
  //   },
  //   {
  //     id: 3,
  //     time: '2020-01-04',
  //     charger: '张三',
  //     chargerId: 1,
  //     doctor: '李四',
  //     doctorId: 2,
  //     chargeDetail: null,
  //     status: 0,
  //   },
  // ];

  return (
    <>
      <div style={{ marginLeft: '40px' }}>
        <Button onClick={toAddNewCharge} type="primary" icon={<AppstoreAddOutlined />} size="large">
          新增收费
        </Button>
      </div>
      <Spin spinning={queryLoading}>
        <div className={styles.medicalArea}>
          <Timeline mode="left">
            {record.map((chargeItem: any) => {
              return renderTimeLines(chargeItem);
            }) || null}
          </Timeline>
        </div>
      </Spin>
    </>
  );
};
export default ChargeRecord;
