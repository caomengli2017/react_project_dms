/*
 *@author: caomengli
 *@desc 店铺列表
 *@Date: 2021-05-08 17:51:41
 */
import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Input,
  Select,
  Typography,
  message,
  Table,
  Switch,
} from 'antd';
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
  // const [expandindex, setExpandindex] = useState(0);

  const baseRef = useRef<IBaseListPageRef>(null);
  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      width: '60%',
    },
    {
      title: '是否分销代理',
      dataIndex: 'marketable',
      key: 'marketable',
      render: (value: any) => {
        return value === 1 ? '代理' : '关闭';
      },
    },
    {
      title: '操作',
    },
  ];
  const columns2 = [
    {
      title: '货品编码',
      dataIndex: 'productsNo',
      key: 'productsNo',
    },
    {
      title: '货品规格',
      key: 'specs',
      render: (value: { specs: any[] }) => {
        return value.specs[0].k + ':' + value.specs[0].v;
      },
    },
    {
      title: '销售价允许范围',
      key: 'tradePriceRange',
      render: (value: { tradePriceRange: any[] }) => {
        console.log(777);
        console.log(value);
        return value.tradePriceRange[0] + ' - ' + value.tradePriceRange[1];
      },
    },
    {
      title: '销售价格',
      dataIndex: 'tradePrice',
      key: 'tradePrice',
      render: (value: any) => {
        return <Input defaultValue={value} />;
      },
    },
    {
      title: '是否分销代理',
      dataIndex: 'checked',
      key: 'marketable',
      render: (value: boolean) => {
        return <Switch defaultChecked={value} />;
      },
    },
  ];
  const changePand = (expanded: any, record: any) => {
    console.log(record);
    // setExpandindex(record.key);
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
    getDealerproudctlist(location.state).then((res) => {
      console.log(res);
      res.data.list.forEach((i: any, index: Number) => {
        i.goodsObj.children = i.products;
        i.goodsObj.key = index;
        i.products.forEach((k: any) => {
          k.key = k.oid;
          if (k.marketable > 0) {
            k.checked = true;
          } else {
            k.checked = false;
          }
        });
        newArray.push(i.goodsObj);
      });
      setTabledata(newArray);
    });
  }, [location]);
  return (
    <Table
      style={{ position: 'static' }}
      expandIconColumnIndex={3}
      columns={columns}
      dataSource={tabledata}
      onExpand={changePand}
      expandedRowRender={(record) => (
        <div>
          <Table
            columns={columns2}
            dataSource={record.children}
            pagination={false}
          />
          <Button type="primary">Primary Button</Button>
        </div>
      )}
    />
  );
};

export default ShopListPage;
