import { FBaseListPage } from '@src/component';
import React from 'react';
import './index.less';
import { Button, Input, Select } from 'antd';
import intl from 'react-intl-universal';
import { getProductsList } from '@src/apis/main/goods';
const { Option } = Select;

const ProductsPage = () => {
  return (
    <FBaseListPage
      queryApi={getProductsList}
      rowKey="oid"
      conditions={[
        {
          id: 'goodsName',
          label: intl.get('fc_name'),
          _node: <Input placeholder="请输入" />,
        },
        {
          id: 'productsNo',
          label: intl.get('fc_productsNumber'),
          _node: <Input placeholder="请输入" />,
        },
        {
          id: 'brandId',
          label: intl.get('fc_brandName'),
          _node: (
            <Select placeholder="请选择品牌">
              <Option value="1">vifun</Option>
              <Option value="2">elfbar</Option>
            </Select>
          ),
        },
        {
          id: 'status',
          label: intl.get('fc_publish_status'),
          _node: (
            <Select placeholder="请选择发布状态">
              <Option value="1">上架</Option>
              <Option value="2">下架</Option>
            </Select>
          ),
        },
      ]}
      columns={[
        { dataIndex: 'oid', title: intl.get('c_serialNumber') },
        { dataIndex: 'productsNo', title: intl.get('fc_productsNumber') },
        { dataIndex: 'goodsName', title: intl.get('fc_name') },
        { dataIndex: 'brandName', title: intl.get('fc_brandName') },
        { dataIndex: 'specs1', title: intl.get('spec') },
        { dataIndex: 'stock', title: intl.get('c_stock') },
        { dataIndex: 'status', title: intl.get('fc_publish_status') },
      ]}
      leftNode={[
        <Button>{intl.get('export_checked_spec')}</Button>,
        <Button>{intl.get('export_all_spec')}</Button>,
      ]}
    ></FBaseListPage>
  );
};

export default ProductsPage;
