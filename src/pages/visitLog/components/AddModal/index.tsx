import React from 'react';
import { Cascader, Form, Input, InputNumber, Modal, Select } from 'antd';
import type { ModalProps } from 'antd/lib/modal';

interface AddModalprops extends Omit<ModalProps, 'onOk'> {
  toSubmitForm: (values: any, hasId: any) => void;
  hasId?: string | number | undefined;
  formItems: any[];
}

const AddModal: React.FC<AddModalprops> = ({ toSubmitForm, hasId, formItems, ...props }) => {
  const [submitForm] = Form.useForm();
  const renderFormItem = (item: any) => {
    switch (item.itemType) {
      case 'Input':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
            <Input {...item.itemProps} />
          </Form.Item>
        );
      case 'Select':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
            <Select {...item.itemProps} />
          </Form.Item>
        );
      case 'Number':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
            <InputNumber {...item.itemProps} style={{ width: '285px' }} />
          </Form.Item>
        );
      case 'Cascader':
        return (
          <Form.Item label={item.label} name={item.name} key={item.name} rules={item.rules || []}>
            <Cascader {...item.itemProps} />
          </Form.Item>
        );
      default:
        return null;
    }
  };
  const handletoSubmit = () => {
    submitForm.validateFields().then((values) => {
      console.log('111');
      toSubmitForm(values, hasId);
    });
  };
  return (
    <Modal okText={hasId ? '保存' : '新增'} onOk={handletoSubmit} {...props}>
      <Form form={submitForm} labelAlign="right">
        {formItems.map((item: any) => {
          return renderFormItem(item);
        })}
      </Form>
    </Modal>
  );
};

export default AddModal;
