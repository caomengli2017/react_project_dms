import { Card, Space, List, Typography } from 'antd';
import React, { memo } from 'react';

const data = ['xxx项目', 'xxx项目', 'xxx项目', 'xxx项目', 'xxx项目'];

const ProjectList = () => {
  return (
    <Card title="项目" style={{ height: '100%' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <List
          size="small"
          header={<Typography.Title level={5}>普通项目</Typography.Title>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <List
          size="small"
          header={<Typography.Title level={5}>变更项目</Typography.Title>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <List
          size="small"
          header={<Typography.Title level={5}>检查项目</Typography.Title>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Space>
    </Card>
  );
};

export default memo(ProjectList);
