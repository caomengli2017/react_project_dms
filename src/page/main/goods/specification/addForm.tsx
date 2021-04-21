import React from 'react';
import { Form, Input, Modal, ModalProps } from 'antd';
import intl from 'react-intl-universal';
const PREFIX = 'spec';
interface IAddFormProps extends ModalProps {
  onCreate: (values: any) => void;
}
const AddForm = (props: IAddFormProps) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((val) => {
      form.resetFields();
      props.onCreate(val);
    });
  };
  return (
    <Modal
      title={intl.get('add_spec')}
      maskClosable={false}
      destroyOnClose={true}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="规格名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入规格名称" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input placeholder="请输入备注" />
        </Form.Item>
        <Form.Item label="当前规格值" className={`${PREFIX}-current`}>
          <span>高级黑</span>
          <span>天蓝</span>
        </Form.Item>
        <Form.Item label="最新规格值" name="value" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请使用“|” 分割多个规格值，不要换行，规格值不允许包括“|”" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddForm;
