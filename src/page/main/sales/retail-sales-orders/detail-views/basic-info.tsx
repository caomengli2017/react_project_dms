import { getRetailOrderDetail } from '@src/apis/main/sales';
import fallback from '@src/assets/img/base64/fallback';
import { SalesOrderDetailModal } from '@src/types/model/sales-orders';
import { Descriptions, Divider, Table, Image, Empty } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

type IBasicinfoProps = {
  orderCode: string;
  onRefresh: () => void;
};

const BasicInfo = (props: IBasicinfoProps) => {
  const [state, setState] = useState<SalesOrderDetailModal>();

  const getData = useCallback(() => {
    if (props.orderCode) {
      getRetailOrderDetail(props.orderCode).then((res) => {
        setState(res.data);
      });
    }
  }, [props.orderCode]);
  useEffect(() => {
    getData();
  }, [getData]);
  const columns = [
    {
      title: '货品编码',
      dataIndex: 'bn',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '商品图片',
      dataIndex: 'goods_img',
      render: (val: any) => {
        return <Image width={50} height={50} src={val} fallback={fallback} />;
      },
      width: 80,
    },
    {
      title: '商品名称',
      dataIndex: 'goods_name',
      width: 200,
    },
    {
      title: '商品规格',
      dataIndex: 'spec',
      render: (val: any[]) => {
        let specValue: any[] = [];
        val.forEach((item) => {
          if (item.spec_value) {
            specValue.push(item.spec_value);
          }
        });
        return specValue.join('/');
      },
    },
    {
      title: '原价',
      dataIndex: 'original_price',
      render: (val: { sign: any; value: any }) => val.sign + val.value,
    },
    {
      title: '折后价',
      dataIndex: 'discounted_price',
      render: (val: { sign: any; value: any }) => val.sign + val.value,
    },
    {
      title: '成交价',
      dataIndex: 'price',
      render: (val: { sign: any; value: any }) => val.sign + val.value,
    },
    {
      title: '成交小计',
      render: (val: any, record: any) => {
        return record.price.sign + record.price.value * record.quantity;
      },
    },
    {
      title: '购买数量',
      dataIndex: 'quantity',
    },
  ];
  if (!state) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Descriptions title="基本信息" column={1}>
          <Descriptions.Item
            label="订单编号"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.order_code}
          </Descriptions.Item>
          <Descriptions.Item
            label="下单时间"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.created_at}
          </Descriptions.Item>
          <Descriptions.Item
            label="订单金额"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.money.sign + state.money.value}
          </Descriptions.Item>
          <Descriptions.Item
            label="实际支付"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.pay_money.sign + state.pay_money.value}
          </Descriptions.Item>
          <Descriptions.Item
            label="支付时间"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.pay_time}
          </Descriptions.Item>
          {/* <Descriptions.Item
            label="支付方式"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.pay_method_name}
          </Descriptions.Item> */}
          <Divider dashed />
          <Descriptions.Item
            label="成交物品费"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.product_money.sign + state.product_money.value}
          </Descriptions.Item>
          <Descriptions.Item
            label="原始物品总额"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.product_original_money.sign +
              state.product_original_money.value}
          </Descriptions.Item>
          <Descriptions.Item label="优惠" labelStyle={{ fontWeight: 'bold' }}>
            {state.product_discount.sign + state.product_discount.value}
          </Descriptions.Item>
          <Divider dashed />
        </Descriptions>
        <Descriptions title="会员信息" column={1}>
          <Descriptions.Item label="会员号" labelStyle={{ fontWeight: 'bold' }}>
            {state.member_code}
          </Descriptions.Item>
          <Descriptions.Item
            label="手机号码"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.member_tel}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <p style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>
        物品信息：
        <span style={{ fontSize: 16 }}>总共{state.product_quantity}件</span>
      </p>
      <Table
        columns={columns}
        dataSource={state.list}
        rowKey="bn"
        pagination={false}
        size="small"
      />
    </div>
  );
};
export default BasicInfo;
