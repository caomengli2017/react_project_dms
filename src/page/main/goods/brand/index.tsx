import { FBaseListPage } from '@src/component';
import React, { useState } from 'react';
import { Button, Divider, Input, Space } from 'antd';
import intl from 'react-intl-universal';
import AddForm from './addForm';
/**
 *
 * @author Leo
 * @desc 品牌管理
 * @date 2021-04-20 16:33:25
 */
const BrandPage = () => {
  const [visible, setvisible] = useState(false);
  return (
    <FBaseListPage
      queryApi="xxx"
      rowKey="id"
      leftNode={[
        <Button onClick={() => setvisible(true)}>{intl.get('add')}</Button>,
      ]}
      conditions={[
        {
          id: 'brandName',
          label: intl.get('fc_brandName'),
          _node: <Input />,
        },
      ]}
      columns={[
        {
          dataIndex: 'brandName',
          title: intl.get('fc_brandName'),
        },
        {
          dataIndex: 'serialNumber',
          title: intl.get('c_serialNumber'),
        },
        {
          dataIndex: 'supBrand',
          title: intl.get('c_supBrand'),
        },
        {
          title: intl.get('operating'),
          render: (value) => {
            return (
              <Space split={<Divider type="vertical" />}>
                <a href="###">{intl.get('edit')}</a>
                <a href="###">{intl.get('delete')}</a>
              </Space>
            );
          },
        },
      ]}
    >
      <AddForm visible={visible} onCancel={() => setvisible(false)} />
    </FBaseListPage>
  );
};

export default BrandPage;
