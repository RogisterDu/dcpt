import { Modal } from 'antd';
import React from 'react';

interface RecordDetailModalProps {
  visible: boolean;
}

const RecordDetailModal: React.FC<RecordDetailModalProps> = ({ visible }) => {
  return (
    <Modal
      title="病例详情"
      visible={visible}
      onOk={() => {
        console.log('ok');
      }}
      onCancel={() => {
        console.log('cancel');
      }}
    >
      <p>Some contents...</p>
    </Modal>
  );
};

export default RecordDetailModal;
