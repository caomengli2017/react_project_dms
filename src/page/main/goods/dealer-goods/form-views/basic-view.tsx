import {
  addGoodsBasicInfo,
  getAdminGoodsDetail,
  getBrandList,
} from '@src/apis/main/goods';
import { FFormItemUpload } from '@src/component';
import { Form, Row, Col, Input, Button, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { DealerGoodsListModal } from '@src/types/model/dealer-goods';
import { BrandListModal } from '../../../../../types/model/goods';

const labelCol = {
  flex: '100px',
};

type IBasicnfoViewProps = {
  data?: DealerGoodsListModal;
  onRefresh: () => void;
};
const BasicInfoView = ({ onRefresh, data }: IBasicnfoViewProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [brandData, setBrandData] = useState<BrandListModal[]>();
  const [prefixUrl, setPrefixUrl] = useState();
  const onFinish = (value: any) => {
    setLoading(true);
    value.picUrl = value.picUrl.join(',');
    addGoodsBasicInfo({ ...value, oid: data?.id })
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
      getAdminGoodsDetail(data.id).then((res) => {
        setPrefixUrl(res.data.picUrl.domain);
        form.setFieldsValue({ ...res.data, picUrl: [res.data.picUrl.path] });
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
            <Select>
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
            <Input />
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
          uploadState={{ listType: 'picture-card' }}
          customReturnData={(val) => {
            return val.path;
          }}
          prefixUrl={prefixUrl}
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
