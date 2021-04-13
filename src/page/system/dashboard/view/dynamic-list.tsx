import { Card, List, Avatar, Space, Typography } from 'antd';
import React from 'react';
const data = ['xxx项目', 'xxx项目', 'xxx项目', 'xxx项目', 'xxx项目'];
const DynamicList = () => {
  return (
    <Card title="项目动态" style={{ marginBottom: 15 }}>
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <Space size={20}>
                  <Typography.Text>{item}</Typography.Text>
                  <Typography.Text>项目建立</Typography.Text>
                </Space>
              }
              description="2小时前"
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DynamicList;
