import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import React, { useRef, useState } from 'react';
import { Input, Select, Typography } from 'antd';
import { getDealerApplicationList } from '@src/apis/main/dealer';
import Detail from './detail';
import { DealerApplicationListModal } from '@src/types/model/dealer';
import { IBaseListPageRef } from '@src/types/baseTypes';

/*
 *@author: caomengli
 *@desc 经销商审核列表
 *@Date: 2021-05-08 10:39:21
 */
const AuditPage = () => {
  const [visible, setvisible] = useState(false);
  const [itemInfo, setItemInfo] = useState<DealerApplicationListModal>();

  const tableRef = useRef<IBaseListPageRef>(null);

  const onClose = () => {
    setvisible(false);
    tableRef.current?.query();
  };

  return (
    <FBaseListPage
      ref={tableRef}
      queryApi={getDealerApplicationList}
      rowKey="id"
      conditions={[
        {
          id: 'companyName',
          label: '经销商名称',
          _node: <Input placeholder="请输入经销商名称" />,
        },
        {
          id: 'status',
          label: '审核状态',
          initialValue: '',
          _node: (
            <Select>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value={1}>待审核</Select.Option>
              <Select.Option value={2}>审核通过</Select.Option>
              <Select.Option value={3}>审核拒绝</Select.Option>
            </Select>
          ),
        },
        {
          id: 'createdAt',
          label: '申请时间',
          _node: <FFormItemRangePicker />,
        },
      ]}
      columns={[
        { dataIndex: 'agentName', title: '经销商名称' },
        { dataIndex: 'parentAgentName', title: '上级经销商' },
        { dataIndex: 'createdAt', title: '申请时间' },
        {
          dataIndex: 'status',
          title: '状态',
          render: (value) => {
            if (value === 1) {
              return <span className="blue">待审核</span>;
            } else if (value === 2) {
              return <span>审核通过</span>;
            } else if (value === 3) {
              return <span className="red">审核拒绝</span>;
            }
          },
        },
        {
          title: '操作',
          render: (value, record) => {
            return (
              <Typography.Link
                onClick={() => {
                  setItemInfo(record);
                  setvisible(true);
                }}
              >
                详情
              </Typography.Link>
            );
          },
        },
      ]}
    >
      <Detail
        title=""
        visible={visible}
        onCancel={() => setvisible(false)}
        onCloseDetail={onClose}
        detailData={itemInfo}
      />
    </FBaseListPage>
  );
};

export default AuditPage;
