import {
  addAdminGoodsProducts,
  getAdminGoodsProductsList,
  getAdminGoodsSpecList,
} from '@src/apis/main/goods';
import { SpecListModal } from '@src/types/model/goods';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  FFormItemCheckbox,
  FFormItemRangeInput,
  FTableView,
} from '@src/component';
import intl from 'react-intl-universal';

import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { ProductListModal } from '../../../../../types/model/goods';
import { ITableViewRef } from '@src/types/baseTypes';

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
  const [visible, setvisible] = useState(false);
  const [data, setData] = useState<ProductListModal>();
  const tableRef = useRef<ITableViewRef>(null);
  return (
    <div>
      <Button
        style={{ marginBottom: 15 }}
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setData(undefined);
          setvisible(true);
        }}
      >
        {intl.get('add_product')}
      </Button>
      <FTableView
        queryApi={getAdminGoodsProductsList}
        rowKey="oid"
        ref={tableRef}
        initalParams={{ goodsId }}
        columns={[
          {
            title: intl.get('fc_productsNumber'),
            dataIndex: 'productsNo',
          },
          {
            title: intl.get('spec'),
            dataIndex: 'specs',
            render: (value) => {
              if (_.isArray(value)) {
                return value.map((val, index) => (
                  <Row key={index} style={{ marginTop: 5, marginBottom: 5 }}>
                    <Col>{val.k}：</Col>
                    <Col>
                      <Tag>{val.v}</Tag>
                    </Col>
                  </Row>
                ));
              }
            },
          },
          {
            title: intl.get('c_stock'),
            dataIndex: 'stock',
          },
          {
            title: '成本价',
            dataIndex: 'costPrice',
            render: (value) => `￥${value}`,
          },
          {
            title: '零售价',
            dataIndex: 'price',
            render: (value) => `￥${value}`,
          },
          {
            title: '省代（控价）',
            dataIndex: 'tradePriceRange',
            render: (value) => {
              if (value.level21Price) {
                return `￥${value.level21Price?.[0]}~￥${value.level21Price?.[1]}`;
              } else {
                return '';
              }
            },
          },
          {
            title: '市代（控价）',
            dataIndex: 'tradePriceRange',
            render: (value) => {
              if (value.level32Price) {
                return `￥${value.level32Price?.[0]}~￥${value.level32Price?.[1]}`;
              } else {
                return '';
              }
            },
          },
          {
            title: '县代（控价）',
            dataIndex: 'tradePriceRange',
            render: (value) => {
              if (value.level43Price) {
                return `￥${value.level43Price?.[0]}~￥${value.level43Price?.[1]}`;
              } else {
                return '';
              }
            },
          },
          {
            title: intl.get('operating'),
            render: (value, record: ProductListModal) => {
              return (
                <Space split={<Divider type="vertical" />}>
                  <Typography.Link
                    onClick={() => {
                      setData(record);
                      setvisible(true);
                    }}
                  >
                    {intl.get('edit')}
                  </Typography.Link>
                </Space>
              );
            },
          },
        ]}
      />
      <AddGoodsView
        goodsId={goodsId}
        data={data}
        visible={visible}
        onCancel={() => setvisible(false)}
        onCreate={() => {
          setvisible(false);
          tableRef.current?.query();
        }}
      />
    </div>
  );
};

interface IAddGoodsViewProps extends ModalProps {
  goodsId: number;
  data?: ProductListModal;
  onCreate: () => void;
}
const AddGoodsView = ({
  goodsId,
  data,
  visible,
  ...props
}: IAddGoodsViewProps) => {
  const [specList, setSpecList] = useState<SpecListModal[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [specLoading, setSpecLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) return;
    setSpecLoading(true);
    form.resetFields();
    getAdminGoodsSpecList({ goodsId: goodsId })
      .then((res) => {
        setSpecList(res.data?.list);
        if (data) {
          let { tradePriceRange, specs, ...newData } = data;
          newData = { ...tradePriceRange, ...newData };
          const specsParams = res.data?.list.map((item) => {
            const _obj: any = {};
            _obj[`${item.oid}`] = specs.find((e) => e.k === item.name)?.vid;
            return _obj;
          });
          form.setFieldsValue({ ...newData, specsParams });
        } else {
          const specsParams = res.data?.list.map((item) => {
            const _obj: any = {};
            _obj[`${item.oid}`] = null;
            return _obj;
          });
          form.setFieldsValue({ specsParams });
        }
      })
      .finally(() => {
        setSpecLoading(false);
      });
  }, [data, form, visible, goodsId]);
  const onConfirm = () => {
    form.validateFields().then((value) => {
      setConfirmLoading(true);
      addAdminGoodsProducts({ ...value, goodsId, oid: data?.oid })
        .then(() => {
          form.resetFields();
          props.onCreate();
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    });
  };
  return (
    <Modal
      width={1000}
      onCancel={props.onCancel}
      visible={visible}
      title={data ? intl.get('edit_product') : intl.get('add_product')}
      onOk={onConfirm}
      confirmLoading={confirmLoading}
    >
      <Spin spinning={specLoading}>
        <Form form={form} labelCol={labelCol} wrapperCol={wrapperCol}>
          <Row>
            <Col span={12}>
              <Form.Item
                rules={[{ required: true }]}
                label={intl.get('commodity_code')}
                name="productsNo"
              >
                <Input placeholder="请输入货品编码" />
              </Form.Item>
            </Col>
            <Form.List name="specsParams">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(
                    ({ key, name, fieldKey, ...restField }, index) => (
                      <Col span={12} key={key}>
                        <Form.Item
                          key={key}
                          {...restField}
                          label={specList[index].name}
                          fieldKey={[fieldKey, specList[index].oid]}
                          name={[name, specList[index].oid]}
                          rules={[
                            {
                              required: true,
                              message: `请选择${specList[index].name}`,
                            },
                          ]}
                        >
                          <Select placeholder={`请选择${specList[index].name}`}>
                            {specList[index].specs.map((v) => (
                              <Select.Option key={v.k} value={v.k}>
                                {v.v}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    )
                  )}
                </>
              )}
            </Form.List>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                rules={[{ required: true }]}
                label={intl.get('goods_cost_price')}
                name="costPrice"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入货品成本价"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item wrapperCol={{ offset: 3 }} name="isCostPriceAll">
                <FFormItemCheckbox>
                  {intl.get('goods_cost_asnc')}
                </FFormItemCheckbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[{ required: true }]}
                label={intl.get('retail_price')}
                name="price"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入货品统一零售价"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item wrapperCol={{ offset: 3 }} name="isPriceAll">
                <FFormItemCheckbox>
                  {intl.get('unite_retail_price')}
                </FFormItemCheckbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider plain>{intl.get('control_price')}</Divider>
            </Col>
            <Col span={12}>
              <Form.Item
                label="省代"
                name="level21Price"
                rules={[{ required: true }]}
              >
                <FFormItemRangeInput
                  placeholder={['请输入金额', '请输入金额']}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="市代"
                name="level32Price"
                rules={[{ required: true }]}
              >
                <FFormItemRangeInput
                  placeholder={['请输入金额', '请输入金额']}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="县代"
                name="level43Price"
                rules={[{ required: true }]}
              >
                <FFormItemRangeInput
                  placeholder={['请输入金额', '请输入金额']}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item wrapperCol={{ offset: 6 }} name="isTradePriceAll">
                <FFormItemCheckbox>
                  {intl.get('cost_price_all')}
                </FFormItemCheckbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default GoodsInfoView;
