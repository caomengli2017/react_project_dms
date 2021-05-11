import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import React from 'react';
import { Button, Input, Typography } from 'antd';
import intl from 'react-intl-universal';

/**
 *
 * @author Leo
 * @desc 经销商销售数据统计
 * @date 2021-04-28 10:45:57
 */
const StatisticSalesPage = () => {
  return (
    <FBaseListPage
      queryApi="xxx"
      rowKey="id"
      leftNode={[<Button>{intl.get('export')}</Button>]}
      conditions={[
        {
          id: 'name',
          label: intl.get('f_distributorName'),
          _node: <Input />,
        },
        {
          id: 'time',
          label: intl.get('f_sales_time'),
          _node: <FFormItemRangePicker />,
        },
      ]}
      columns={[
        {
          dataIndex: 'name',
          title: intl.get('f_distributorName'),
        },
        {
          dataIndex: 'jibie',
          title: '经销商级别',
        },
        {
          dataIndex: 'xiaoshoue',
          title: '销售额',
        },
        {
          dataIndex: 'xiaoshoul',
          title: '销售量',
        },

        {
          dataIndex: 'specificationName',
          title: intl.get('operating'),
          render: (text, record) => (
            <Typography.Link>{intl.get('details')}</Typography.Link>
          ),
        },
      ]}
    ></FBaseListPage>
  );
};

export default StatisticSalesPage;
