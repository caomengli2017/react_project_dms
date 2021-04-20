import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import React from 'react';
import { Divider, Input, Space } from 'antd';
import intl from 'react-intl-universal';
/**
 *
 * @author Leo
 * @desc 销售管理订单列表
 * @date 2021-04-20 15:39:34
 */
const SalesPage = () => {
  return (
    <FBaseListPage
      queryApi="xxx"
      rowKey="id"
      conditions={[
        {
          id: 'orderId',
          label: intl.get('f_orderId'),
          _node: <Input />,
        },
        {
          id: 'createTime',
          label: intl.get('f_createTime'),
          _node: <FFormItemRangePicker />,
        },
      ]}
      columns={[
        {
          dataIndex: 'purchaseDealer',
          title: intl.get('c_purchaseDealer'),
        },
        {
          dataIndex: 'approvalStatus',
          title: intl.get('c_approvalStatus'),
        },
        {
          dataIndex: 'payStatus',
          title: intl.get('c_payStatus'),
        },
        {
          dataIndex: 'shipStatus',
          title: intl.get('c_shipStatus'),
        },
        {
          dataIndex: 'actualPrice',
          title: intl.get('c_actualPrice'),
        },
        {
          dataIndex: 'originalPrice',
          title: intl.get('c_originalPrice'),
        },
        {
          dataIndex: 'prePrice',
          title: intl.get('c_prePrice'),
        },
        {
          dataIndex: 'shipping',
          title: intl.get('c_shipping'),
        },
        {
          dataIndex: 'receiptStatus',
          title: intl.get('c_receiptStatus'),
        },
        {
          title: intl.get('operating'),
          render: (value) => {
            return (
              <Space split={<Divider type="vertical" />}>
                <a href="###">{intl.get('edit')}</a>
                <a href="###">{intl.get('review')}</a>
              </Space>
            );
          },
        },
      ]}
    ></FBaseListPage>
  );
};

export default SalesPage;
