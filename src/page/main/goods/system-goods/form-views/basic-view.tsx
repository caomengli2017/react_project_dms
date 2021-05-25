import {
  addGoodsBasicInfo,
  getAdminGoodsDetail,
  getBrandList,
} from '@src/apis/main/goods';
import { FFormItemUpload } from '@src/component';
import { Form, Row, Col, Input, Button, Select, message, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { SystemGoodsModal } from '@src/types/model/goods';
import { BrandListModal } from '../../../../../types/model/goods';

const labelCol = {
  flex: '100px',
};

type IBasicnfoViewProps = {
  data?: SystemGoodsModal;
  onRefresh: () => void;
};
const BasicInfoView = ({ onRefresh, data }: IBasicnfoViewProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [brandData, setBrandData] = useState<BrandListModal[]>();
  const onFinish = (value: any) => {
    setLoading(true);

    addGoodsBasicInfo({ ...value, oid: data?.oid })
      .then(() => {
        message.success(intl.get('saveOk'));
        onRefresh();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (data) {
      getAdminGoodsDetail(data.oid).then((res) => {
        form.setFieldsValue({ ...res.data });
      });
    } else {
      form.resetFields();
    }
  }, [form, data]);

  useEffect(() => {
    getBrandList().then((res) => {
      setBrandData(res.data.list);
    });
  }, []);

  return (
    <Form form={form} labelCol={labelCol} onFinish={onFinish}>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_brandName')}
            name="brandId"
            rules={[{ required: true }]}
          >
            <Select placeholder="请选择品牌">
              {brandData?.map((e, index) => (
                <Select.Option key={e.oid} value={e.oid}>
                  {e.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_name')}
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_goodsNumber')}
            name="bn"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入商品编码" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.get('c_stock')}
            name="stock"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入库存" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label={intl.get('goodsDesc')}
        name="desc"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={3} placeholder="请输入商品描述" />
      </Form.Item>
      <Form.Item
        label={intl.get('is_light_goods')}
        name="isLightGoods"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={intl.get('goodsImage')}
        name="picUrl"
        rules={[{ required: true }]}
      >
        <FFormItemUpload
          uploadState={{ listType: 'picture-card', maxCount: undefined }}
          customizeReturn={(val) => {
            return val?.fullPath || val;
          }}
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
