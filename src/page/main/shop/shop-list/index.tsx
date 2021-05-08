/*
 *@author: caomengli
 *@desc 店铺列表
 *@Date: 2021-05-08 17:51:41
 */
import { FBaseListPage } from '@src/component';
import React from 'react';
import { Button, Input } from 'antd';
import intl from 'react-intl-universal';

const ShopListPage = () => {
  return (
    <FBaseListPage
      queryApi=""
      rowKey="id"
      conditions={[]}
      columns={[]}
    ></FBaseListPage>
  );
};

export default ShopListPage;
