import { addGoodsBasicInfo } from '@src/apis/main/goods';
import { FFormItemUpload } from '@src/component';
import { Form, Row, Col, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { SystemGoodsModal } from '@src/types/model/goods';

const labelCol = {
  flex: '100px',
};

type IBasicnfoViewProps = {
  data?: SystemGoodsModal;
};
const BasicInfoView = ({ data }: IBasicnfoViewProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (value: any) => {
    setLoading(true);
    addGoodsBasicInfo(value)
      .then(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [form, data]);
  return (
    <Form form={form} labelCol={labelCol} onFinish={onFinish}>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_brandName')}
            name="brandName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_name')}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_goodsNumber')}
            name="goodsNumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.get('c_stock')}
            name="stock"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label={intl.get('goodsDesc')}
        name="desc"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label={intl.get('goodsImage')}
        name="picUrl"
        rules={[{ required: true }]}
      >
        <FFormItemUpload
          maxLength={3}
          uploadState={{ listType: 'picture-card' }}
        />
      </Form.Item>
      <Row justify="center">
        <Button loading={loading} type="primary" htmlType="submit">
          {intl.get('save')}
        </Button>
      </Row>
    </Form>
  );
};
export default BasicInfoView;
