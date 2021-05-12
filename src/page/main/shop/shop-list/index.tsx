/*
 *@author: caomengli
 *@desc 店铺列表
 *@Date: 2021-05-08 17:51:41
 */
import React, { useState } from 'react';
import { Button, Input, Select, Typography } from 'antd';
import { getShopList } from '@src/apis/main/shop';
import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import { PlusOutlined } from '@ant-design/icons';
const ShopListPage = () => {
  const [visible, setvisible] = useState(false);
  const showModal = () => {
    setvisible(true);
  };
  console.log(123);
  return (
    <FBaseListPage
      queryApi={getShopList}
      rowKey="id"
      leftNode={[
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          新建店铺
        </Button>,
      ]}
      conditions={[
        {
          id: 'storeId',
          label: '店铺id',
          _node: <Input placeholder="请输入店铺id" />,
        },
        {
          id: 'storeName',
          label: '店铺名称',
          _node: <Input placeholder="请输入店铺名称" />,
        },
        {
          id: 'storeType',
          label: '店铺类型',
          _node: (
            <Select placeholder="请选择店铺类型">
              <Select.Option value={2}>经销商直营门店</Select.Option>
            </Select>
          ),
        },
        {
          id: 'status',
          label: '店铺状态',
          _node: (
            <Select placeholder="请选择店铺状态">
              <Select.Option value={1}>营业中</Select.Option>
              <Select.Option value={0}>关闭</Select.Option>
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
        { dataIndex: 'storeId', title: '店铺id' },
        { dataIndex: 'storeName', title: '店铺名称' },
        { dataIndex: 'storeType', title: '店铺类型' },
        { dataIndex: 'createdAt', title: '加入时间' },
        {
          dataIndex: 'status',
          title: '状态',
          render: (value) => {
            return value === 1 ? '营业中' : '关闭';
          },
        },
        {
          title: '操作',
          render: (value, record) => {
            return (
              <Typography.Link
                onClick={() => {
                  setvisible(true);
                }}
              >
                编辑
              </Typography.Link>
            );
          },
        },
      ]}
    ></FBaseListPage>
  );
};

export default ShopListPage;
