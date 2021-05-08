import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import React, { useState } from 'react';
import { Input, Select, Typography } from 'antd';
import { getDealerAuditList } from '@src/apis/main/dealer';
import Detail from './detail';

/*
 *@author: caomengli
 *@desc 经销商审核列表
 *@Date: 2021-05-08 10:39:21
 */

const AuditPage = () => {
  const [visible, setvisible] = useState(false);
  return (
    <FBaseListPage
      queryApi={getDealerAuditList}
      rowKey="dealerId"
      conditions={[
        {
          id: 'name',
          label: '经销商名称',
          _node: <Input placeholder="请输入经销商名称" />,
        },
        {
          id: 'dealerNumber',
          label: '审核状态',
          _node: (
            <Select placeholder="请选择审核状态">
              <Select.Option value={0}>审核拒绝</Select.Option>
            </Select>
          ),
        },
        {
          id: 'time',
          label: '申请时间',
          _node: <FFormItemRangePicker />,
        },
      ]}
      columns={[
        { dataIndex: 'name', title: '经销商名称' },
        { dataIndex: 'dealerNumber2', title: '上级经销商' },
        { dataIndex: 'dealerNumber', title: '经销商层级' },
        { dataIndex: 'time', title: '申请时间' },
        { dataIndex: 'status', title: '状态' },
        {
          title: '操作',
          render: (value, record) => {
            return (
              <Typography.Link onClick={() => setvisible(true)}>
                详情
              </Typography.Link>
            );
          },
        },
      ]}
    >
      <Detail title="" visible={visible} onCancel={() => setvisible(false)} />
    </FBaseListPage>
  );
};

export default AuditPage;
