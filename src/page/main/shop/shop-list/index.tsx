/*
 *@author: caomengli
 *@desc 店铺列表
 *@Date: 2021-05-08 17:51:41
 */
import React, { useRef, useState } from 'react';
import { Button, Input, Select, Typography, message } from 'antd';
import { getShopList, ShopEdit, ShopCreate } from '@src/apis/main/shop';
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
        type: 2,
      };
      ShopEdit(obj)
        .then(() => {
          setvisible(false);
          message.success('编辑成功');
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } else {
      obj = {
        ...values,
        type: 2,
      };
      ShopCreate(obj)
        .then(() => {
          setvisible(false);
          message.success('创建成功');
        })
        .finally(() => {
          setConfirmLoading(false);
          refreshData();
        });
    }
  };
  return (
    <FBaseListPage
      queryApi={getShopList}
      rowKey="storeId"
      ref={baseRef}
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
          initialValue: '',
          _node: (
            <Select placeholder="请选择店铺类型">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value={2}>经销商直营门店</Select.Option>
            </Select>
          ),
        },
        {
          id: 'status',
          label: '店铺状态',
          initialValue: '',
          _node: (
            <Select placeholder="请选择店铺状态">
              <Select.Option value="">全部</Select.Option>
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
