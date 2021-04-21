import { FBaseListPage } from '@src/component';
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import intl from 'react-intl-universal';
import { getSpecList } from '@src/apis/main/goods';
import AddForm from './addForm';
import './index.less';

const SpecPage = () => {
  const [visible, setvisible] = useState(false);
  const onCreate = (values: any) => {
    setvisible(false);
  };
  return (
    <FBaseListPage
      queryApi={getSpecList}
      rowKey="oid"
      leftNode={[
        <Button>{intl.get('export_checked_spec')}</Button>,
        <Button>{intl.get('export_all_spec')}</Button>,
        <Button type="primary" onClick={() => setvisible(true)}>
          +{intl.get('add_spec')}
        </Button>,
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
          render: (text, record) => (
            <Space size="middle">
              <Button type="link">{intl.get('edit')}</Button>
              <Button type="link">{intl.get('check_spec')}</Button>
            </Space>
          ),
        },
      ]}
    >
      <AddForm
        visible={visible}
        onCancel={() => setvisible(false)}
        onCreate={onCreate}
      />
    </FBaseListPage>
  );
};

export default SpecPage;
