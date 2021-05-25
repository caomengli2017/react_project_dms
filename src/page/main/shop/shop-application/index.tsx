/*
 *@author: caomengli
 *@desc 店铺申请列表
 *@Date: 2021-05-08 16:37:30
 */
import { FBaseListPage, FFormItemRangePicker } from '@src/component';
import React, { useRef } from 'react';
import { Input, message, Modal, Select, Typography } from 'antd';
import intl from 'react-intl-universal';
import {
  getShopApplicationList,
  shopApplicationEdit,
} from '@src/apis/main/shop';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IBaseListPageRef } from '@src/types/baseTypes';
const { confirm } = Modal;

const ShopApplicationPage = () => {
  const baseRef = useRef<IBaseListPageRef>(null);
  // 确认处理弹窗
  const showPassConfirm = (applicationId: number) => {
    confirm({
      title: '是否标记为已处理？',
      content: '标记为已处理后不可再次编辑。请及时联系申请经销商。',
      icon: <ExclamationCircleOutlined />,
      okText: intl.get('confirm'),
      cancelText: intl.get('cancel'),
      onOk() {
        return new Promise((resolve, reject) => {
          shopApplicationEdit({ applicationId })
            .then(() => {
              message.success(intl.get('operatingOk'));
              baseRef.current?.query();
              resolve(null);
            })
            .catch(() => {
              reject(null);
            });
        });
      },
      onCancel() {},
    });
  };

  return (
    <FBaseListPage
      queryApi={getShopApplicationList}
      ref={baseRef}
      rowKey="applicationId"
      conditions={[
        {
          id: 'companyName',
          label: '申请经销商',
          _node: <Input placeholder="请输入申请经销商" />,
        },
        {
          id: 'status',
          label: '申请状态',
          initialValue: '',
          _node: (
            <Select>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value={1}>待处理</Select.Option>
              <Select.Option value={2}>已处理</Select.Option>
            </Select>
          ),
        },
        {
          id: 'timeFilter',
          label: '申请时间',
          _node: <FFormItemRangePicker />,
        },
      ]}
      columns={[
        { dataIndex: 'companyName', title: '申请经销商' },
        { dataIndex: 'tel', title: '联系方式' },
        { dataIndex: 'storeType', title: '申请店铺类型' },
        { dataIndex: 'createdAt', title: '申请时间' },
        {
          dataIndex: 'status',
          title: '申请状态',
          render: (value, record) => {
            if (value === 1) {
              return (
                <Typography.Link
                  onClick={() => showPassConfirm(record.applicationId)}
                >
                  待处理
                </Typography.Link>
              );
            } else if (value === 2) {
              return '已处理';
            }
          },
        },
      ]}
    ></FBaseListPage>
  );
};

export default ShopApplicationPage;
