import React, { useRef, useState } from 'react';
import { Button, Image, Input, Typography } from 'antd';
import intl from 'react-intl-universal';
import { PlusOutlined } from '@ant-design/icons';
import { getSystemGoodsList } from '@src/apis/main/goods';
import fallback from '@src/assets/img/base64/fallback';
import AddForm from './addForm';
import { FBaseListPage } from '@src/component';
import { IBaseListPageRef } from '@src/types/baseTypes';
/**
 *
 * @author Leo
 * @desc 系统商品列表
 * @date 2021-04-21 16:00:06
 */
const SystemGoodsPage = () => {
  const [visible, setvisible] = useState(false);
  const [editData, setEditData] = useState();
  const baseList = useRef<IBaseListPageRef>(null);
  return (
    <FBaseListPage
      ref={baseList}
      queryApi={getSystemGoodsList}
      rowKey="oid"
      leftNode={[
        <Button
          onClick={() => {
            setEditData(undefined);
            setvisible(true);
          }}
          icon={<PlusOutlined />}
        >
          {intl.get('add')}
        </Button>,
      ]}
      conditions={[
        {
          id: 'name',
          label: intl.get('fc_name'),
          _node: <Input />,
        },
        {
          id: 'goodsNumber',
          label: intl.get('fc_goodsNumber'),
          _node: <Input />,
        },
        {
          id: 'brandName',
          label: intl.get('fc_brandName'),
          _node: <Input />,
          labelCol: { flex: '70px' },
        },
      ]}
      columns={[
        {
          dataIndex: 'oid',
          title: intl.get('c_oid'),
        },
        {
          dataIndex: 'picUrl',
          title: intl.get('c_picUrl'),
          render: (val) => {
            return (
              <Image width={50} height={50} src={val} fallback={fallback} />
            );
          },
        },
        {
          dataIndex: 'name',
          title: intl.get('fc_name'),
        },
        {
          dataIndex: 'goodsNumber',
          title: intl.get('fc_goodsNumber'),
        },
        {
          dataIndex: 'brandName',
          title: intl.get('fc_brandName'),
        },
        {
          dataIndex: 'stock',
          title: intl.get('c_stock'),
        },
        // {
        //   dataIndex: 'price',
        //   title: intl.get('c_price'),
        //   render: (val) => {
        //     return val.sign + val.value + `(${val.unit})`;
        //   },
        // },
        {
          dataIndex: 'createdAt',
          title: intl.get('c_createdAt'),
        },
        {
          title: intl.get('operating'),
          render: (value, record) => {
            return (
              <Typography.Link
                onClick={() => {
                  setEditData(record);
                  setvisible(true);
                }}
              >
                {intl.get('edit')}
              </Typography.Link>
            );
          },
        },
      ]}
    >
      <AddForm
        visible={visible}
        data={editData}
        onCancel={() => setvisible(false)}
        onRefresh={() => {
          baseList.current?.query();
        }}
      />
    </FBaseListPage>
  );
};

export default SystemGoodsPage;
