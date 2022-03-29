import React from 'react';
import { Card, Descriptions, Modal, Form } from 'antd';
import styles from '../../index.less';
import '../../antdCover.less';
import { AppstoreAddOutlined } from '@ant-design/icons';
interface RecordCardProps {
  recordItem: any;
}

interface infoInterface {
  main: string;
  now: string;
  cure: string;
  location: string;
  history: string;
  allergic: string;
}

const RecordCard: React.FC<RecordCardProps> = ({ recordItem }) => {
  const [editVisable, setEditVisable] = React.useState(false);
  const { time, info } = recordItem;

  const [editForm] = Form.useForm();

  const rendertitle = () => {
    return <div className={styles.time}>{time}</div>;
  };
  const renderInfo = (Detailinfo: infoInterface) => {
    console.log('Detailinfo', Detailinfo);
    const { main, now, cure, location, history, allergic } = Detailinfo;
    return (
      <div className={styles.details}>
        <Descriptions bordered>
          <Descriptions.Item label="主诉" span={4}>
            {main || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="现病史" span={2}>
            {now || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="既往史" span={2}>
            {history || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="流行病史" span={2}>
            流行病史
          </Descriptions.Item>
          <Descriptions.Item label="过敏史" span={4}>
            {allergic || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="检查" span={4}>
            {location || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="治疗方案" span={4}>
            {cure || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="医嘱" span={4}>
            医嘱
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  const toAddNewDetail = () => {
    setEditVisable(true);
  };

  const renderAddDetail = () => {
    return (
      <div className={`${styles.flexcenter} ${styles.detailsArea}`}>
        <a onClick={() => toAddNewDetail}>
          <AppstoreAddOutlined />
          &nbsp;&nbsp;添加诊断
        </a>
      </div>
    );
  };

  const submitEdit = () => {
    setEditVisable(false);
  };

  const toEdit = (id: any) => {
    console.log('id', id);
    setEditVisable(true);
  };

  const renderCardExtra = (id: any) => {
    console.log('id', id);
    return <a onClick={() => toEdit(id)}>编辑</a>;
  };

  return (
    <>
      <Modal
        destroyOnClose
        visible={editVisable}
        closable
        onOk={() => submitEdit}
        onCancel={() => {
          setEditVisable(false);
        }}
      >
        <Form form={editForm}>
          <Form.Item label="诊断">
            <input />
          </Form.Item>
        </Form>
      </Modal>
      <Card
        hoverable
        key={recordItem.id}
        title={rendertitle()}
        extra={info && Object.keys(info).length > 0 ? renderCardExtra(recordItem.id) : null}
        style={{ width: 800 }}
        className="cardCover"
      >
        {info && Object.keys(info).length > 0 ? renderInfo(info) : renderAddDetail()}
      </Card>
    </>
  );
};
export default RecordCard;
