import { FBaseListPage, FIconFont } from '@src/component';
import './index.less';
import { Button, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import intl from 'react-intl-universal';
import AddForm from './addForm';

const MenuPage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <FBaseListPage
      queryApi="/user/menu_list"
      rowKey="id"
      leftNode={[
        <Button
          onClick={() => setVisible(true)}
          type="primary"
          icon={<PlusOutlined />}
        >
          {intl.get('add_menu')}
        </Button>,
      ]}
      columns={[
        {
          title: '菜单名称',
          dataIndex: 'name',
          width: '20%',
        },
        {
          title: '菜单类型',
          dataIndex: 'type',
          render: (value) => {
            return value === 0 ? '菜单' : '目录';
          },
        },
        {
          title: '图标',
          dataIndex: 'icon',
          render: (value) => {
            return value ? (
              <FIconFont type={value} style={{ fontSize: 18 }} />
            ) : null;
          },
        },
        {
          title: '组件',
          dataIndex: 'component',
        },
        {
          title: '路由地址',
          dataIndex: 'path',
        },
        {
          title: '排序',
          dataIndex: 'sort',
        },
        {
          title: '操作',
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
      <AddForm onCancel={() => setVisible(false)} visible={visible}></AddForm>
    </FBaseListPage>
  );
};

export default MenuPage;
