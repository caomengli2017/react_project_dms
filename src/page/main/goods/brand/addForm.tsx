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
      getBrandList({ parentId: 0 }).then((res) => {
        setBrandList(res.data?.list);
      });
  }, [props.visible]);
  useEffect(() => {
    if (!props.visible) return;
    if (props.initialVal) {
      // 重置上级品牌select
      if (props.initialVal.parentId === 0) {
        props.initialVal.parentId = undefined;
      }

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
        <Form.Item name="parentId" label={intl.get('c_supBrand')}>
          <Select
            placeholder="请选择上级品牌，留空创建一级品牌"
            disabled={props.initialVal ? true : false}
          >
            {brandList.map((brandItem: any) => (
              <Option value={brandItem.oid} key={brandItem.oid}>
                {brandItem.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="enabled" label="状态" initialValue={1}>
          <Select>
            <Option value={1}>启用</Option>
            <Option value={0}>禁用</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddForm;
