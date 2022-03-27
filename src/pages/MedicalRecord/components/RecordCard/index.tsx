import React from 'react';
import { Card } from 'antd';
import styles from '../../index.less';
import { AppstoreAddOutlined } from '@ant-design/icons';
interface RecordCardProps {
  recordItem: any;
}

interface infoInterface {
  title: string;
  content: string;
  recordTime: string;
  history: string;
}

const RecordCard: React.FC<RecordCardProps> = ({ recordItem }) => {
  const { time, info } = recordItem;
  const rendertitle = () => {
    return <div className={styles.time}>{time}</div>;
  };
  const renderInfo = (Detailinfo: infoInterface) => {
    console.log('Detailinfo', Detailinfo);
    return (
      <div className={styles.details}>
        <div className={styles.title}>{Detailinfo.title || ''}</div>
        <div className={styles.content}>{Detailinfo.content}</div>
        <div className={styles.history}>{Detailinfo.history}</div>
      </div>
    );
  };

  const renderAddDetail = () => {
    return (
      <div className={styles.flexcenter}>
        <a>
          <AppstoreAddOutlined />
          &nbsp;&nbsp;添加诊断
        </a>
      </div>
    );
  };

  return (
    <>
      <Card
        key={recordItem.id}
        title={rendertitle()}
        extra={<a href="#">操作</a>}
        style={{ width: 800 }}
      >
        {info && Object.keys(info).length > 0 ? renderInfo(info) : renderAddDetail()}
      </Card>
    </>
  );
};
export default RecordCard;
