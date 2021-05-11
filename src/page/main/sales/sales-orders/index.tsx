import {
  FBaseListPage,
  FFormItemRangeInput,
  FFormItemRangePicker,
} from '@src/component';
import React, { useState } from 'react';
import { Input, Select, Typography } from 'antd';
import intl from 'react-intl-universal';
import { getSalesOrderList } from '@src/apis/main/sales';
import DetailPage from './detail';

/*
 *@author: caomengli
 *@desc 销售订单管理
 *@Date: 2021-04-27 14:07:13
 */

const OrderPage = () => {
  const [visible, setvisible] = useState(false);
  // const setRowClassName = (record: any): string => {
  //   return record.orderStatus === 0 ? 'tr-disabled' : '';
  // };
  return (
    <FBaseListPage
      queryApi={getSalesOrderList}
      rowKey="buyer_company"
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
              <Select.Option value="0">未支付</Select.Option>
              <Select.Option value="1">已支付</Select.Option>
              <Select.Option value="2">部分退款</Select.Option>
              <Select.Option value="3">全部退款</Select.Option>
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
              <Select.Option value="0">未发货</Select.Option>
              <Select.Option value="1">部分发货</Select.Option>
              <Select.Option value="2">已收货</Select.Option>
              <Select.Option value="3">部分退货</Select.Option>
              <Select.Option value="4">全部退货</Select.Option>
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
              <Select.Option value="0">已关闭</Select.Option>
              <Select.Option value="1">进行中</Select.Option>
              <Select.Option value="2">已完成</Select.Option>
            </Select>
          ),
        },
      ]}
      columns={[
        { dataIndex: 'procureCode', title: intl.get('f_orderId') },
        {
          dataIndex: 'buyer_company',
          title: intl.get('f_distributorName'),
          render: (val) => val.name,
        },
        {
          dataIndex: 'payStatus',
          title: intl.get('c_payStatus'),
          render: (val) => {
            if (val === 0) {
              return <span className="red">未支付</span>;
            } else if (val === 1) {
              return <span className="green">已支付</span>;
            } else if (val === 2) {
              return <span>部分退款</span>;
            } else if (val === 3) {
              return <span>全部退款</span>;
            }
          },
        },
        {
          dataIndex: 'shipStatus',
          title: intl.get('f_logisticsStatus'),
          render: (val) => {
            if (val === 0) {
              return <span className="red">未发货</span>;
            } else if (val === 1) {
              return <span>部分发货</span>;
            } else if (val === 2) {
              return <span className="green">已发货</span>;
            } else if (val === 3) {
              return <span>部分退货</span>;
            } else if (val === 4) {
              return <span>全部退货</span>;
            }
          },
        },
        {
          dataIndex: 'orderStatus',
          title: intl.get('f_orderStatus'),
          render: (val) => {
            if (val === 0) {
              return '已关闭';
            } else if (val === 1) {
              return '进行中';
            } else if (val === 2) {
              return '已完成';
            }
          },
        },
        {
          dataIndex: 'totalAmount',
          title: intl.get('f_orderAmount'),
          render: (val) => val.sign + val.value,
        },
        { dataIndex: 'createdAt', title: intl.get('f_createTime') },
        { dataIndex: 'payTime', title: intl.get('c_payTime') },
        {
          dataIndex: 'shippingFee',
          title: intl.get('c_shipping'),
          render: (val) => val.sign + val.value,
        },
        {
          dataIndex: 'refundAmount',
          title: intl.get('c_refundAmount'),
          render: (val) => val.sign + val.value,
        },
        {
          dataIndex: 'reviewStatus',
          title: intl.get('c_approvalStatus'),
          render: (val) => {
            if (val === 0) {
              return '待审核';
            } else if (val === 1) {
              return '已通过';
            } else if (val === 2) {
              return '未通过';
            }
          },
        },
        {
          dataIndex: 'operating',
          title: intl.get('operating'),
          render: (val) => (
            <Typography.Link
              onClick={() => {
                setvisible(true);
              }}
            >
              {intl.get('edit')}
            </Typography.Link>
          ),
        },
      ]}
      // rowClassName={setRowClassName}
    >
      <DetailPage visible={visible} onCancel={() => setvisible(false)} />
    </FBaseListPage>
  );
};

export default OrderPage;
