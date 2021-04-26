import {
  addAdminGoodsProducts,
  getAdminGoodsSpecList,
} from '@src/apis/main/goods';
import { SpecListModal } from '@src/types/model/goods';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  message,
  Row,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { FFormItemRangeInput } from '@src/component';
import intl from 'react-intl-universal';

const labelCol = {
  span: 6,
};
const wrapperCol = {
  span: 16,
};
interface IGoodsInfoViewProps {
  goodsId: number;
}

const GoodsInfoView = ({ goodsId }: IGoodsInfoViewProps) => {
  const [specList, setSpecList] = useState<SpecListModal[]>([]);
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getAdminGoodsSpecList(goodsId).then((res) => {
      setSpecList(res.data.list);
      const obj = res.data.list.map((item) => {
        const _obj: any = {};
        _obj[`${item.oid}`] = null;
        return _obj;
      });
      form.setFieldsValue({ specsParams: obj });
    });
  }, [goodsId, form]);
  const onFinish = (value: any) => {
    setloading(true);
    addAdminGoodsProducts(value)
      .then((res) => {
        message.success(intl.get('saveOk'));
      })
      .finally(() => {
        setloading(false);
      });
  };
  return (
    <Form
      form={form}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={onFinish}
    >
      <Row>
        <Form.List name="specsParams">
          {(fields) => {
            return fields.map((e, index) => (
              <Col key={e.key} span={12}>
                <Form.Item
                  {...e}
                  label={specList[index].name}
                  fieldKey={[e.fieldKey, specList[index].oid]}
                  name={[e.name, specList[index].oid]}
                >
                  <Select>
                    {specList[index].specs.map((v) => (
                      <Select.Option key={v.k} value={v.k}>
                        {v.v}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ));
          }}
        </Form.List>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label={intl.get('retail_price')} name="price">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item wrapperCol={{ offset: 3 }} valuePropName="checked">
            <Checkbox>{intl.get('unite_retail_price')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Divider plain>{intl.get('control_price')}</Divider>
        </Col>
        <Col span={12}>
          <Form.Item label={intl.get('dealer2to1')} name="level21Price">
            <FFormItemRangeInput />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={intl.get('dealer3to2')} name="leve321Price">
            <FFormItemRangeInput />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={intl.get('dealer4to3')} name="level43Price">
            <FFormItemRangeInput />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Button loading={loading} type="primary" htmlType="submit">
          {intl.get('save')}
        </Button>
      </Row>
    </Form>
  );
};

export default GoodsInfoView;
