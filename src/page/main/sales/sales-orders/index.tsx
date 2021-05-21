import {
  FBaseListPage,
  FFormItemRangeInput,
  FFormItemRangePicker,
} from '@src/component';
import React, { useRef, useState } from 'react';
import { Input, Select, Typography } from 'antd';
import intl from 'react-intl-universal';
import { getSalesOrderList } from '@src/apis/main/sales';
import DetailPage from './detail';
import { IBaseListPageRef } from '@src/types/baseTypes';

/*
 *@author: caomengli
 *@desc 销售订单管理
 *@Date: 2021-04-27 14:07:13
 */

const OrderPage = () => {
  const [visible, setvisible] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const baseList = useRef<IBaseListPageRef>(null);
  const setRowClassName = (record: { status: number }): string => {
    return record.status === 0 ? 'tr-disabled' : '';
  };
  return (
    <FBaseListPage
      ref={baseList}
      queryApi={getSalesOrderList}
      rowKey="oid"
      // leftNode={[
      //   <Button>{intl.get('export_checked_order')}</Button>,
      //   <Button>{intl.get('export_all_order')}</Button>,
      // ]}
      conditions={[
        {
          id: 'order_code',
          label: intl.get('f_orderId'),
          _node: <Input placeholder="请输入订单编号" />,
        },
        {
          id: 'buyer_name',
          label: intl.get('f_distributorName'),
          _node: <Input placeholder="请输入经销商名称" />,
        },
        {
          id: 'created_at',
          label: intl.get('f_createTime'),
          _node: <FFormItemRangePicker />,
        },
        {
          id: 'money',
          label: intl.get('f_orderAmount'),
          _node: <FFormItemRangeInput placeholder={['最小', '最大']} />,
        },
        {
          id: 'pay_status',
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
          id: 'ship_status',
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
          id: 'status',
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
        { dataIndex: 'order_code', title: intl.get('f_orderId') },
        {
          dataIndex: 'buyer_name',
          title: intl.get('f_distributorName'),
        },
        {
          dataIndex: 'pay_status',
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
          dataIndex: 'ship_status',
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
              return <span>已退货</span>;
            }
          },
        },
        {
          dataIndex: 'status',
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
          dataIndex: 'money',
          title: intl.get('f_orderAmount'),
          render: (val) => val?.sign + val?.value,
        },
        { dataIndex: 'created_at', title: intl.get('f_createTime') },
        { dataIndex: 'pay_time', title: intl.get('c_payTime') },
        {
          dataIndex: 'ship_money',
          title: intl.get('c_shipping'),
          render: (val) => val?.sign + val?.value,
        },
        {
          dataIndex: 'refund_money',
          title: intl.get('c_refundAmount'),
          render: (val) => val?.sign + val?.value,
        },
        {
          dataIndex: 'review_status',
          title: intl.get('c_approvalStatus'),
          render: (val) => {
            if (val === 0) {
              return '待审核';
            } else if (val === 1) {
              return '审核通过';
            } else if (val === 2) {
              return '审核拒绝';
            }
          },
        },
        {
          dataIndex: 'operating',
          title: intl.get('operating'),
          render: (val, record) => (
            <Typography.Link
              onClick={() => {
                setOrderCode(record.order_code);
                setvisible(true);
              }}
            >
              详情
            </Typography.Link>
          ),
        },
      ]}
      tableProps={{ rowClassName: setRowClassName }}
    >
      <DetailPage
        visible={visible}
        onCancel={() => setvisible(false)}
        orderCode={orderCode}
        onRefresh={() => {
          baseList.current?.query();
        }}
      />
    </FBaseListPage>
  );
};

export default OrderPage;
