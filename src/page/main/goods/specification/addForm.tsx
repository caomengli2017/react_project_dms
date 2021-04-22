import React, { useEffect } from 'react';
import { Form, Input, Modal, ModalProps } from 'antd';
import intl from 'react-intl-universal';
const PREFIX = 'spec';
interface IAddFormProps extends ModalProps {
  onCreate: (values: any) => void;
  initialVal?: any;
}
const AddForm = (props: IAddFormProps) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((val) => {
      form.resetFields();
      props.onCreate(val);
    });
  };
  const specsList = props.initialVal?.specs.map((spec?: any) => (
    <span key={spec.v}>{spec.k}</span>
  ));
  useEffect(() => {
    if (props.initialVal) {
      form.setFieldsValue({ ...props.initialVal });
    } else {
      form.resetFields();
    }
  }, [props.initialVal, form]);
  return (
    <Modal
      title={props.title}
      maskClosable={false}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      forceRender
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={intl.get('c_specificationName')}
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder={intl.get('input_specs_name')} />
        </Form.Item>
        <Form.Item label={intl.get('remark')} name="remark">
          <Input placeholder={intl.get('input_remark')} />
        </Form.Item>
        {props.initialVal && (
          <Form.Item
            label={intl.get('current_specs')}
            className={`${PREFIX}-current`}
          >
            {specsList}
          </Form.Item>
        )}
        <Form.Item
          label={intl.get('newest_specs')}
          name="value"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder={intl.get('input_specs_tips')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddForm;
