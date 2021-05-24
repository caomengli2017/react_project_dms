import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import { useRef, useState } from 'react';
import { Input, Select, Typography } from 'antd';
import intl from 'react-intl-universal';
import { getRetailOrdersList } from '@src/apis/main/sales';
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
      queryApi={getRetailOrdersList}
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
          id: 'seller_name',
          label: '零售店名称',
          _node: <Input placeholder="请输入零售店名称" />,
        },
        // {
        //   id: 'pay_method',
        //   label: '支付方式',
        //   initialValue: '',
        //   _node: (
        //     <Select>
        //       <Select.Option value="">全部</Select.Option>
        //       <Select.Option value="1">微信</Select.Option>
        //       <Select.Option value="2">支付宝</Select.Option>
        //     </Select>
        //   ),
        // },
        {
          id: 'created_at',
          label: intl.get('f_createTime'),
          _node: <FFormItemRangePicker />,
        },
      ]}
      columns={[
        { dataIndex: 'order_code', title: intl.get('f_orderId') },
        { dataIndex: 'member_code', title: '会员ID' },
        { dataIndex: 'tel', title: '手机号码' },
        {
          dataIndex: 'seller_name',
          title: '零售门店',
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
        // { dataIndex: 'pay_method_name', title: '支付方式' },
        { dataIndex: 'created_at', title: intl.get('f_createTime') },
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
