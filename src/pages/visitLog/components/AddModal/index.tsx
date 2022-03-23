import React from 'react';
import { Form, Modal } from 'antd';

const AddModal: React.FC = () => {
  const [submitForm] = Form.useForm();

  const renderFormItem = () => {};
  const handletoSubmit = () => {
    submitForm.validateFields().then((values) => {
      console.log(values);
    });
  };
  return (
    <>
      <Modal centered onOk={handletoSubmit}>
        <Form>{renderFormItem}</Form>
      </Modal>
    </>
  );
};

export default AddModal;
