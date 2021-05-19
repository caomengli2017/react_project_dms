import {
  Checkbox,
  Divider,
  Form,
  InputNumber,
  Modal,
  ModalProps,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FTableView } from '@src/component';
import intl from 'react-intl-universal';
import _ from 'lodash';
import { ITableViewRef } from '@src/types/baseTypes';
import {
  addDealerProducts,
  getDealerProductList,
} from '@src/apis/main/dealer-goods';
import { DealerProductsListModal } from '@src/types/model/dealer-goods';

const labelCol = {
  span: 6,
};
const wrapperCol = {
  span: 16,
};
interface IGoodsInfoViewProps {
  goodsId?: number;
}
const GoodsInfoView = ({ goodsId }: IGoodsInfoViewProps) => {
  const [visible, setvisible] = useState(false);
  const [data, setData] = useState<DealerProductsListModal>();
  const tableRef = useRef<ITableViewRef>(null);
  return (
    <div>
      <FTableView
        queryApi={getDealerProductList}
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
                  <Tag key={index}>{val.v}</Tag>
                ));
              }
            },
          },
          {
            title: intl.get('c_stock'),
            dataIndex: 'stock',
          },
          {
            title: intl.get('operating'),
            render: (value, record: DealerProductsListModal) => {
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
  data?: DealerProductsListModal;
  onCreate: () => void;
}
const AddGoodsView = ({ data, visible, ...props }: IAddGoodsViewProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) return;
    if (data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data, form, visible]);
  const onConfirm = () => {
    form.validateFields().then((value) => {
      setConfirmLoading(true);
      addDealerProducts({
        ...value,
        isSiblings: value.isSiblings ? 1 : 0,
        productId: data?.oid,
      })
        .then(() => {
          props.onCreate();
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    });
  };
  return (
    <Modal
      onCancel={props.onCancel}
      visible={visible}
      title={data ? intl.get('edit_product') : intl.get('add_product')}
      onOk={onConfirm}
      confirmLoading={confirmLoading}
    >
      <Form form={form} labelCol={labelCol} wrapperCol={wrapperCol}>
        <Form.Item label="统一批发价" name="tradePrice">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          {intl.get('recommend_price', {
            price1: data?.tradePriceRange[0],
            price2: data?.tradePriceRange[1],
          })}
        </Form.Item>
        <Form.Item label="状态" name="marketable">
          <Select>
            <Select.Option value={1}>上架</Select.Option>
            <Select.Option value={0}>下架</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 6 }}
          name="isSiblings"
          valuePropName="checked"
        >
          <Checkbox>统一批发价应用于同商品的其它货品</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GoodsInfoView;
