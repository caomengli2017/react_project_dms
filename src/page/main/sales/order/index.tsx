import {
  FBaseListPage,
  FFormItemRangeInput,
  FFormItemRangePicker,
} from '@src/component';
import React from 'react';
import { Button, Input, Select } from 'antd';
import intl from 'react-intl-universal';
/*
 *@author: caomengli
 *@desc 销售订单管理
 *@Date: 2021-04-27 14:07:13
 */

const OrderPage = () => {
  return (
    <FBaseListPage
      queryApi=""
      rowKey="id"
      // leftNode={[
      //   <Button>{intl.get('export_checked_order')}</Button>,
      //   <Button>{intl.get('export_all_order')}</Button>,
      // ]}
      conditions={[
        {
          id: 'orderId',
          label: intl.get('f_orderId'),
          _node: <Input placeholder="请输入订单编号" />,
        },
        {
          id: 'distributorName',
          label: intl.get('f_distributorName'),
          _node: <Input placeholder="请输入经销商名称" />,
        },
        {
          id: 'createTime',
          label: intl.get('f_createTime'),
          _node: <FFormItemRangePicker />,
        },
        {
          id: 'orderAmount',
          label: intl.get('f_orderAmount'),
          _node: <FFormItemRangeInput placeholder={['最小', '最大']} />,
        },
        {
          id: 'payStatus',
          label: intl.get('c_payStatus'),
          initialValue: '',
          _node: (
            <Select>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="1">已支付</Select.Option>
              <Select.Option value="0">未支付</Select.Option>
            </Select>
          ),
        },
        {
          id: 'logisticsStatus',
          label: intl.get('f_logisticsStatus'),
          initialValue: '',
          _node: (
            <Select>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">待发货</Select.Option>
              <Select.Option value="1">已发货</Select.Option>
              <Select.Option value="2">已收货</Select.Option>
            </Select>
          ),
        },
        {
          id: 'orderStatus',
          label: intl.get('f_orderStatus'),
          initialValue: '',
          _node: (
            <Select>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="1">正常</Select.Option>
              <Select.Option value="2">作废</Select.Option>
            </Select>
          ),
        },
      ]}
      columns={[
        { dataIndex: 'orderId', title: intl.get('f_orderId') },
        { dataIndex: 'distributorName', title: intl.get('f_distributorName') },
        { dataIndex: 'payStatus', title: intl.get('c_payStatus') },
        { dataIndex: 'logisticsStatus', title: intl.get('f_logisticsStatus') },
        { dataIndex: 'orderStatus', title: intl.get('f_orderStatus') },
        { dataIndex: 'orderAmount', title: intl.get('f_orderAmount') },
        { dataIndex: 'createTime', title: intl.get('f_createTime') },
        { dataIndex: 'payTime', title: intl.get('c_payTime') },
        { dataIndex: 'shipping', title: intl.get('c_shipping') },
        { dataIndex: 'approvalStatus', title: intl.get('c_approvalStatus') },
        { dataIndex: 'operating', title: intl.get('operating') },
      ]}
    ></FBaseListPage>
  );
};

export default OrderPage;
