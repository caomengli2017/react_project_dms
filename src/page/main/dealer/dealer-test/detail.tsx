/*
 *@author: caomengli
 *@desc 店铺列表
 *@Date: 2021-05-08 17:51:41
 */
import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Select, Typography, message } from 'antd';
import {
  getDealerList,
  dealerEdit,
  newDealer,
  getSublevellist,
} from '@src/apis/main/dealer';
import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import { IBaseListPageRef } from '@src/types/baseTypes';
import { PlusOutlined } from '@ant-design/icons';
import AddForm from './addForm';
import { useLocation } from 'react-router';
const { Option } = Select;

const ShopListPage = () => {
  interface IcurrentShop {
    storeId: Number;
    status: Number;
  }
  type ISublevellist = {
    name: string;
    level: number;
  };
  const [visible, setvisible] = useState(false);
  const [initialVal, setInitialVal] = useState<IcurrentShop>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [sublevellist, setSublevellist] = useState<Array<ISublevellist>>();
  const location = useLocation();

  const baseRef = useRef<IBaseListPageRef>(null);

  const showModal = (initialVal?: any) => {
    setInitialVal(initialVal);
    setvisible(true);
  };
  const refreshData = () => {
    baseRef.current?.query();
  };
  const onCreate = async (values: any) => {
    let obj = { ...values };
    obj = {
      ...values,
    };
    if (initialVal) {
      dealerEdit(obj)
        .then(() => {
          setvisible(false);
          message.success('编辑成功');
          refreshData();
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } else {
      newDealer(obj)
        .then(() => {
          setvisible(false);
          message.success('新建成功');
          refreshData();
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    }
  };
  useEffect(() => {
    console.log(location);
    getSublevellist().then((res) => {
      setSublevellist(res.data);
    });
  }, [location]);
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
          从其他经销商导入价格
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
            <Select placeholder="请选择代理商层级">
              {sublevellist?.map((item, index) => (
                <Option value={item.level} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          ),
        },
      ]}
      columns={[
        { dataIndex: 'companyId', title: '经销商ID' },
        { dataIndex: 'name', title: '经销商名称' },
        { dataIndex: 'agentLevel', title: '经销商层级' },
        { dataIndex: 'joinTime', title: '加入时间' },
        {
          title: '操作',
          render: (value, record) => {
            return (
              <Typography.Link onClick={() => showModal(record)}>
                分销设置
              </Typography.Link>
            );
          },
        },
      ]}
    >
      <AddForm
        title={initialVal ? '编辑经销商' : '新建代理'}
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
