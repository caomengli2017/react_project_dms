import { FBaseListPage } from '@src/component';
import React, { useEffect, useState } from 'react';
import './index.less';
import { Button, Col, Input, Row, Select, Tag } from 'antd';
import intl from 'react-intl-universal';
import { getProductsList, getBrandList } from '@src/apis/main/goods';
const { Option } = Select;

const PREFIX = 'products';

const ProductsPage = () => {
  const [brandList, setBrandList] = useState([]);
  const SpecsList = (props: any): any => {
    return props.specs.map((spec: any, index: number) => (
      <Row key={index}>
        <Col>{spec.k}：</Col>
        <Col>
          <SpecsVal value={spec.v} />
        </Col>
      </Row>
    ));
  };
  const SpecsVal = (props: any): any => {
    return props.value.map((item: any, index: number) => (
      <Tag key={index}>{item}</Tag>
    ));
  };
  useEffect(() => {
    // 联调时确认是否调整接口
    getBrandList({ page: 1, size: 10 }).then((res) => {
      setBrandList(res.data?.list);
    });
  }, []);

  return (
    <FBaseListPage
      queryApi={getProductsList}
      rowKey="oid"
      conditions={[
        {
          id: 'goodsName',
          label: intl.get('fc_name'),
          _node: <Input placeholder="请输入商品名称" />,
        },
        {
          id: 'productsNo',
          label: intl.get('fc_productsNumber'),
          _node: <Input placeholder="请输入货品编码" />,
        },
        {
          id: 'brandId',
          label: intl.get('fc_brandName'),
          _node: (
            <Select placeholder="请选择品牌">
              {brandList.map((brandItem: any) => (
                <Option value={brandItem.oid} key={brandItem.oid}>
                  {brandItem.name}
                </Option>
              ))}
            </Select>
          ),
        },
        {
          id: 'status',
          label: intl.get('fc_publish_status'),
          _node: (
            <Select placeholder="请选择发布状态">
              <Option value="0">下架</Option>
              <Option value="1">上架</Option>
            </Select>
          ),
        },
      ]}
      columns={[
        { dataIndex: 'oid', title: intl.get('c_serialNumber') },
        { dataIndex: 'productsNo', title: intl.get('fc_productsNumber') },
        { dataIndex: 'goodsName', title: intl.get('fc_name') },
        { dataIndex: 'brandName', title: intl.get('fc_brandName') },
        {
          dataIndex: 'specs1',
          title: intl.get('spec'),
          render: (text: any, record: any) => (
            <div className={`${PREFIX}-specs-box`}>
              <SpecsList specs={record.specs} />
            </div>
          ),
        },
        { dataIndex: 'stock', title: intl.get('c_stock') },
        {
          dataIndex: 'status',
          title: intl.get('fc_publish_status'),
          render: (text: any, record: any) => (
            <span>{record.status === 0 ? '下架' : '上架'}</span>
          ),
        },
      ]}
      leftNode={[
        <Button>{intl.get('export_checked_spec')}</Button>,
        <Button>{intl.get('export_all_spec')}</Button>,
      ]}
    ></FBaseListPage>
  );
};

export default ProductsPage;
