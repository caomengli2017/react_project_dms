import { Form, Input, Modal, ModalProps, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { getBrandList } from '@src/apis/main/goods';
import { BrandListModal } from '@src/types/model/goods';
const { Option } = Select;

interface IAddFormProps extends ModalProps {
  onCreate: (values: any) => void;
  initialVal?: any;
}

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
  const handleOk = () => {
    form.validateFields().then((val) => {
      // form.resetFields();
      props.onCreate(val);
    });
  };
  const [brandList, setBrandList] = useState<BrandListModal[]>([]);
  useEffect(() => {
    if (props.visible)
      getBrandList().then((res) => {
        setBrandList(res.data?.list);
      });
  }, [props.visible]);
  useEffect(() => {
    if (!props.visible) return;
    if (props.initialVal) {
      form.setFieldsValue({ ...props.initialVal });
    } else {
      form.resetFields();
    }
  }, [props.initialVal, props.visible, form]);
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={handleOk}
      confirmLoading={props.confirmLoading}
    >
      <Form form={form} labelCol={labelCol} wrapperCol={wrapperCol}>
        <Form.Item
          name="name"
          label={intl.get('fc_brandName')}
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入品牌名称" />
        </Form.Item>
        <Form.Item
          name="parentId"
          label={intl.get('c_supBrand')}
          rules={[{ required: true, message: '请选择上级品牌' }]}
        >
          <Select placeholder="请选择上级品牌">
            {brandList.map((brandItem: any) => (
              <Option value={brandItem.parentId} key={brandItem.parentId}>
                {brandItem.parentName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddForm;
