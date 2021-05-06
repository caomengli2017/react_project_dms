import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import React from 'react';
import { Button, Input, Typography } from 'antd';
import intl from 'react-intl-universal';
/**
 *
 * @author Leo
 * @desc 门店销售数据
 * @date 2021-04-28 10:49:10
 */
const StoreSalesPage = () => {
  return (
    <FBaseListPage
      queryApi="xxx"
      rowKey="id"
      leftNode={[<Button>{intl.get('export')}</Button>]}
      conditions={[
        {
          id: 'name1',
          label: '门店名称',
          _node: <Input />,
        },
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
          title: '门店名称',
        },
        {
          dataIndex: 'name',
          title: intl.get('f_distributorName'),
        },
        {
          dataIndex: 'jibie',
          title: '类型',
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

export default StoreSalesPage;
