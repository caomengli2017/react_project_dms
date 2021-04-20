import { Form, Input, Modal, ModalProps, Select } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';

interface IAddFormProps extends ModalProps {}

const labelCol = {
  xs: { span: 24 },
  sm: { span: 6 },
};
const wrapperCol = {
  xs: { span: 24 },
  sm: { span: 16 },
};
const AddForm = (props: IAddFormProps) => {
  const [form] = Form.useForm();
  const onFinish = () => {
    form.validateFields().then((val) => {
      console.log(val);
    });
  };
  return (
    <Modal
      title={intl.get('add_goods')}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={onFinish}
    >
      <Form form={form} labelCol={labelCol} wrapperCol={wrapperCol}>
        <Form.Item name="name" label={intl.get('fc_brandName')}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label={intl.get('c_supBrand')}>
          <Select />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddForm;
