import { FBaseListPage } from '@src/component';
import React from 'react';
import { Button, Input } from 'antd';
import intl from 'react-intl-universal';

/**
 *
 * @author Leo
 * @desc 门店库存数据统计
 * @date 2021-04-28 10:48:21
 */
const InStorePage = () => {
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
      ]}
      columns={[
        {
          dataIndex: 'name',
          title: '门店名称',
        },
        {
          dataIndex: 'xiaoshoue',
          title: '上级经销商',
        },
        {
          dataIndex: 'xiaoshoul',
          title: '库存数量',
        },
      ]}
    ></FBaseListPage>
  );
};

export default InStorePage;
