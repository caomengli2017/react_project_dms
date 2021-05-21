import { Descriptions } from 'antd';
import React from 'react';

const BasicInfo = () => {
  return (
    <div>
      <Descriptions title="基本信息" column={{ md: 2, sm: 2, xs: 1 }}>
        <Descriptions.Item label="申请时间">111</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default BasicInfo;
