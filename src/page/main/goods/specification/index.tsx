import { FBaseListPage } from '@src/component';
import React from 'react';
import { Button } from 'antd';
import intl from 'react-intl-universal';
import { getSpecList } from '@src/apis/main/goods';

const indexPage = () => {
  return (
    <FBaseListPage
      queryApi={getSpecList}
      rowKey="id"
      leftNode={[
        <Button>{intl.get('export_checked_spec')}</Button>,
        <Button>{intl.get('export_all_spec')}</Button>,
        <Button type="primary">+{intl.get('add_specification')}</Button>,
      ]}
      columns={[
        {
          dataIndex: 'name',
          title: intl.get('c_specificationName'),
        },
        {
          dataIndex: 'remark',
          title: intl.get('remark'),
        },
        {
          dataIndex: 'specificationName',
          title: intl.get('operating'),
        },
      ]}
    ></FBaseListPage>
  );
};

export default indexPage;
