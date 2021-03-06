import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal, ModalProps, Tag } from 'antd';
import intl from 'react-intl-universal';
import { saveSpecs } from '@src/apis/main/goods';

const labelCol = {
  span: 6,
};
const wrapperCol = {
  span: 16,
};

interface IAddFormProps extends ModalProps {
  onClose: () => void;
  specData?: any;
}
const AddForm = (props: IAddFormProps) => {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    form.validateFields().then((val) => {
      setConfirmLoading(true);
      const obj = { ...val };
      if (props.specData) obj['oid'] = props.specData.oid;
      saveSpecs(obj)
        .then((val) => {
          message.success(intl.get('operatingOk'));
          props.onClose();
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    });
  };
  const specsList = props.specData?.specs.map((spec?: any) => (
    <Tag key={spec.v}>{spec.v}</Tag>
  ));

  useEffect(() => {
    if (!props.visible) return;
    form.resetFields();
    if (props.specData) {
      form.setFieldsValue({ ...props.specData });
    }
  }, [props.specData, form, props.visible]);
  return (
    <Modal
      maskClosable={false}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      title={props.specData ? intl.get('edit_spec') : intl.get('add_spec')}
      confirmLoading={confirmLoading}
    >
      <Form form={form} labelCol={labelCol} wrapperCol={wrapperCol}>
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
        {props.specData && (
          <Form.Item label={intl.get('current_specs')}>{specsList}</Form.Item>
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
