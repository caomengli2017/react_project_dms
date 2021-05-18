/*
 *@author: caomengli
 *@desc 店铺列表
 *@Date: 2021-05-08 17:51:41
 */
import React, { useRef, useState } from 'react';
import { Button, Input, Select, Typography, Space, message } from 'antd';
import { getDealerList } from '@src/apis/main/dealer';
import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import { IBaseListPageRef } from '@src/types/baseTypes';
import { PlusOutlined } from '@ant-design/icons';
import AddForm from './addForm';

const ShopListPage = () => {
  interface IcurrentShop {
    storeId: Number;
    status: Number;
  }
  const [visible, setvisible] = useState(false);
  const [initialVal, setInitialVal] = useState<IcurrentShop>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const baseRef = useRef<IBaseListPageRef>(null);

  const refreshData = () => {
    baseRef.current?.query();
  };
  const showModal = (initialVal?: any) => {
    setInitialVal(initialVal);
    setvisible(true);
  };
  const onCreate = async (values: any) => {
    let obj = { ...values };
    if (initialVal) {
      obj = {
        ...values,
        storeId: initialVal.storeId,
      };
    }
  };
  return (
    <FBaseListPage
      queryApi={getDealerList}
      rowKey="companyId"
      ref={baseRef}
      leftNode={[
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          新建代理
        </Button>,
      ]}
      conditions={[
        {
          id: 'companyId',
          label: '经销商ID',
          _node: <Input placeholder="请输入经销商ID" />,
        },
        {
          id: 'companyName',
          label: '经销商名称',
          _node: <Input placeholder="请输入经销商名称" />,
        },
        {
          id: 'agentLevel',
          label: '经销商层级',
          _node: (
            <Select placeholder="请选择经销商层级">
              <Select.Option value={1}>品牌方</Select.Option>
              <Select.Option value={2}>一级代理</Select.Option>
              <Select.Option value={3}>二级代理</Select.Option>
              <Select.Option value={4}>三级代理</Select.Option>
            </Select>
          ),
        },
        {
          id: 'timeFilter',
          label: '下单时间',
          _node: <FFormItemRangePicker />,
        },
      ]}
      columns={[
        { dataIndex: 'companyId', title: '经销商ID' },
        { dataIndex: 'name', title: '经销商名称' },
        { dataIndex: 'agentLevel', title: '经销商层级' },
        { dataIndex: 'joinTime', title: '加入时间' },
        {
          dataIndex: 'status',
          title: '状态',
          render: (value) => {
            return value === 1 ? '营业中' : '关闭';
          },
        },
        { dataIndex: 'subAgentNum', title: '下级经销商' },
        {
          title: '操作',
          render: (value, record) => {
            return (
              <Typography.Link onClick={() => showModal(record)}>
                编辑
              </Typography.Link>
            );
          },
        },
      ]}
    >
      <AddForm
        title={initialVal ? '编辑店铺' : '新建店铺'}
        visible={visible}
        onCancel={() => setvisible(false)}
        initialVal={initialVal}
        onCreate={onCreate}
        confirmLoading={confirmLoading}
      />
    </FBaseListPage>
  );
};

export default ShopListPage;
