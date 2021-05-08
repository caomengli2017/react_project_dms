/*
 *@author: caomengli
 *@desc 店铺申请列表
 *@Date: 2021-05-08 16:37:30
 */
import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import React, { useRef } from 'react';
import { Button, Input, Modal, Select, Typography } from 'antd';
import intl from 'react-intl-universal';
import { getShopApplicationList } from '@src/apis/main/shop';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IBaseListPageRef } from '@src/types/baseTypes';
const { confirm } = Modal;

const ShopApplicationPage = () => {
  const baseRef = useRef<IBaseListPageRef>(null);
  // 确认处理弹窗
  const showPassConfirm = (id: number) => {
    confirm({
      title: '是否标记为已处理？',
      content: '标记为已处理后不可再次编辑。请及时联系申请经销商。',
      icon: <ExclamationCircleOutlined />,
      okText: intl.get('confirm'),
      cancelText: intl.get('cancel'),
      onOk() {
        baseRef.current?.query();
      },
      onCancel() {},
    });
  };

  return (
    <FBaseListPage
      queryApi={getShopApplicationList}
      ref={baseRef}
      rowKey="oid"
      conditions={[
        {
          id: 'name',
          label: '申请经销商',
          _node: <Input placeholder="请输入申请经销商" />,
        },
        {
          id: 'status',
          label: '申请状态',
          _node: (
            <Select placeholder="请选择申请状态">
              <Select.Option value={0}>待处理</Select.Option>
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
        { dataIndex: 'name', title: '申请经销商' },
        { dataIndex: 'phone', title: '联系方式' },
        { dataIndex: 'type', title: '申请店铺类型' },
        { dataIndex: 'time', title: '申请时间' },
        {
          dataIndex: 'status',
          title: '申请状态',
          render: (value, record) => {
            if (value === 0) {
              return (
                <Typography.Link onClick={() => showPassConfirm(1)}>
                  待处理
                </Typography.Link>
              );
            } else if (value === 1) {
              return '已处理';
            }
          },
        },
      ]}
    ></FBaseListPage>
  );
};

export default ShopApplicationPage;
