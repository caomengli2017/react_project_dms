import { FBaseListPage } from '@src/component';
import React from 'react';
import './index.less';
import { Button, Input } from 'antd';

const LogPage = () => {
  return (
    <FBaseListPage
      queryApi="http://localhost:8090/user/list"
      rowKey="id"
      leftNode={[
        <Button type="primary">btn1</Button>,
        <Button type="primary">btn2</Button>,
      ]}
      rightNode={[<Button type="primary">btn3</Button>]}
      conditions={[
        {
          id: 'id1',
          label: '名称1',
          _node: <Input placeholder="请输入名称1" />,
        },
        {
          id: 'id2',
          label: '名称2',
          _node: <Input placeholder="请输入名称2" />,
        },
        {
          id: 'id3',
          label: '名称3',
          _node: <Input placeholder="请输入名称3" />,
        },
        {
          id: 'id4',
          label: '名称4',
          _node: <Input placeholder="请输入名称4" />,
        },
      ]}
      columns={[
        {
          title: 'name0',
          dataIndex: 'name0',
        },
        {
          title: 'name1',
          dataIndex: 'name1',
        },
        {
          title: 'name2',
          dataIndex: 'name2',
        },
        {
          title: 'name3',
          dataIndex: 'name3',
        },
      ]}
    ></FBaseListPage>
  );
};

export default LogPage;
