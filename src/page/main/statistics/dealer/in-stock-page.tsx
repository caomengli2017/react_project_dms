import { FBaseListPage } from '@src/component';
import React from 'react';
import { Button, Input, Typography } from 'antd';
import intl from 'react-intl-universal';
/**
 *
 * @author Leo
 * @desc 经销商库存数据统计
 * @date 2021-04-28 10:45:57
 */
const indexPage = () => {
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
      ]}
      columns={[
        {
          dataIndex: 'name',
          title: intl.get('f_distributorName'),
        },
        {
          dataIndex: 'kuncun',
          title: '库存数',
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

export default indexPage;
