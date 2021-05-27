/*
 *@author: caomengli
 *@desc 店铺列表
 *@Date: 2021-05-08 17:51:41
 */
import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Select, Typography, message, Table } from 'antd';
import {
  getDealerList,
  dealerEdit,
  newDealer,
  getDealerproudctlist,
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

  const [visible, setvisible] = useState(false);
  const [initialVal, setInitialVal] = useState<IcurrentShop>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const location = useLocation();
  const [tabledata, setTabledata] = useState([]);
  const [expanddata, setExpanddata] = useState([]);
  const [expandindex, setExpandindex] = useState(0);

  const baseRef = useRef<IBaseListPageRef>(null);
  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      width: '60%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
    },
    {
      title: '操作',
      width: '20%',
    },
  ];
  const changePand = (expanded: any, record: any) => {
    console.log(record);
    setExpandindex(record.key);
  };
  const expandedRowRender = () => {
    console.log(expandindex);
    console.log(expanddata[expandindex]);
    const columns = [
      { title: 'productId', dataIndex: 'productId', key: 'productId' },
      { title: 'Price', dataIndex: 'tradePrice', key: 'tradePrice' },
    ];

    // for (let i = 0; i < 3; ++i) {
    //   data.push({
    //     key: i,
    //     date: '2014-12-24 23:12:00',
    //     name: 'This is production name',
    //     upgradeNum: 'Upgraded: 56',
    //   });
    // }

    return (
      <Table
        columns={columns}
        dataSource={expanddata[expandindex]}
        pagination={false}
      />
    );
  };
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
    let newArray: any = [];
    let newArray2: any = [];
    getDealerproudctlist(location.state).then((res) => {
      console.log(res);
      res.data.list.forEach((i: any, index: Number) => {
        // i.goodsObj.children = i.products;
        i.goodsObj.key = index;
        i.products.forEach((k: any) => {
          k.key = k.oid;
        });
        newArray.push(i.goodsObj);
        newArray2.push(i.products);
      });
      console.log(newArray2);
      setTabledata(newArray);
      setExpanddata(newArray2);
    });
  }, [location]);
  return (
    <Table
      expandIconColumnIndex={2}
      columns={columns}
      dataSource={tabledata}
      onExpand={changePand}
      expandedRowRender={(record) => <p style={{ margin: 0 }}>{record}</p>}
    />
  );
};

export default ShopListPage;
