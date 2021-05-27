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
  Descriptions,
  message,
  Table,
  Switch,
  Form,
  Row,
  Col,
  Modal,
} from 'antd';
import {
  getDealertemplatelist,
  getDealerproudctlist,
  editDealerproudctlist,
} from '@src/apis/main/dealer';
import { FFormItemSwitch, FFormItemRangePicker } from '@src/component';
import { IBaseListPageRef } from '@src/types/baseTypes';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router';
const { Option } = Select;

const ShopListPage = () => {
  interface IcurrentShop {
    storeId: Number;
    status: Number;
  }
  interface Spec {
    k: string;
    v: string;
    kid: number;
    vid: number;
  }

  interface Product {
    oid: number;
    productId: number;
    productsNo: string;
    specs: Spec[];
    stock: number;
    marketable: number;
    tradePrice?: number;
    tradePriceRange: number[];
    checked: boolean;
  }
  interface GoodsObj {
    id: number;
    image: string;
    name: string;
    marketable: number;
    products: Product[];
  }
  interface Template {
    companyId: number;
    name: string;
  }
  interface Companylist {
    createdAt: string;
    id: number;
    level: string;
    name: string;
  }

  const [visible, setvisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const location = useLocation();
  const [tabledata, setTabledata] = useState<GoodsObj[]>([]);
  const [templateData, setTemplatedata] = useState<Template[]>([]);
  const [companyid, setCompanyid] = useState(0);
  const [companyinfo, setCompanyinfo] = useState<Companylist>();

  // const [expandindex, setExpandindex] = useState(0);

  const baseRef = useRef<IBaseListPageRef>(null);
  const [form] = Form.useForm();
  const columns = [
    {
      title: '商品',
      key: 'name',
      width: '60%',
      render: (value: any) => {
        return (
          <div>
            <img
              style={{ maxWidth: '60px', marginRight: '10px' }}
              src={value.image}
            />
            {value.name}
          </div>
        );
      },
    },
    {
      title: '是否分销代理',
      dataIndex: 'marketable',
      key: 'marketable',
      render: (value: any) => {
        return value === 1 ? '代理' : '关闭';
      },
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
        let arr: any = [];
        // eslint-disable-next-line array-callback-return
        value.specs.map((i: any) => {
          arr.push(i.k + i.v + ' ');
        });
        return arr;
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
      key: 'tradePrice',
      render: (value: any) => {
        return (
          <Form form={form}>
            <Form.Item
              style={{ margin: 0 }}
              name="value.tradePrice"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value2) {
                    if (
                      value2 > value.tradePriceRange[0] &&
                      value2 < value.tradePriceRange[1]
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('必须在价格范围内'));
                  },
                }),
              ]}
            >
              <Input
                defaultValue={value?.tradePrice}
                onPressEnter={(e) => savePrice(value.index, e)}
                onBlur={(e) => savePrice(value.index, e)}
              />
            </Form.Item>
          </Form>
        );
      },
    },
    {
      title: '是否分销代理',
      key: 'marketable',
      render: (value: any) => {
        return (
          <Switch
            onChange={(e) => switchChange(value.index, e)}
            defaultChecked={value.marketable}
          />
        );
      },
    },
  ];

  const savePrice = (value: any, e: any) => {
    console.log(Number(value.split('-')[0]));
    let num1 = Number(value.split('-')[0]);
    let num2 = Number(value.split('-')[1]);
    let data = tabledata;
    data[num1].products[num2].tradePrice = e.target.defaultValue;
    console.log(data);
    setTabledata(data);
  };

  const switchChange = (value: any, e: any) => {
    let data = tabledata;
    let num = 0;
    if (e) {
      num = 1;
    } else {
      num = 0;
    }
    data[Number(value.split('-')[0])].products[
      Number(value.split('-')[0])
    ].marketable = num;
    console.log(data);
    setTabledata(data);
  };

  const submitProducts = (products: any) => {
    form.validateFields().then(() => {
      let state: any = location.state;
      console.log(state.companyId);
      let obj = {
        companyId: state.companyId,
        data: products.products,
        goodsId: products.id,
      };
      console.log(obj);
      editDealerproudctlist(obj).then((res) => {
        message.success('编辑成功');
        getInitData(
          {
            companyId: companyid,
          },
          false
        );
      });
    });
  };

  const importDealer = () => {
    console.log(1);
    // setExpandindex(record.key);
  };
  const changePand = (expanded: any, record: any) => {
    console.log(record);
    // setExpandindex(record.key);
  };
  const showModal = () => {
    setvisible(true);
  };
  const handleOk = () => {
    console.log(companyid);
    getInitData(
      {
        companyId: companyid,
      },
      false
    );
    setvisible(false);
  };
  const handleCancel = () => {
    setvisible(false);
  };
  const handleChange = (value: any) => {
    setCompanyid(value);
  };
  const refreshData = () => {
    baseRef.current?.query();
  };
  const getInitData = (obj: any, flag: boolean) => {
    let newArray: any = [];
    getDealerproudctlist(obj).then((res) => {
      if (flag) {
        setCompanyinfo(res.data.company);
      }
      res.data.list.forEach((i: any, index: Number) => {
        i.goodsObj.products = i.products;
        i.goodsObj.key = index;
        i.products.forEach((k: any, index2: Number) => {
          k.key = k.oid;
          k.index = index + '-' + index2;
        });
        newArray.push(i.goodsObj);
      });
      console.log(newArray);
      setTabledata(newArray);
    });
  };
  useEffect(() => {
    let state: any = location.state;
    setCompanyid(state.companyId);
    getDealertemplatelist().then((res) => {
      setTemplatedata(res.data.list);
    });
    getInitData(location.state, true);
  }, [location]);
  return (
    <div>
      <Descriptions
        style={{ background: '#fff', padding: '10px 10px 0 10px' }}
        title={companyinfo?.name}
        column={{ md: 2, sm: 2, xs: 1 }}
      >
        <Row>
          <Col span={8}>
            <Form.Item label={'经销商ID'}>{companyinfo?.id}</Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={'经销商等级'}>{companyinfo?.level}</Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={'加入时间'}>{companyinfo?.createdAt}</Form.Item>
          </Col>
        </Row>
      </Descriptions>
      <Row style={{ background: '#fff' }}>
        <Col span={24}>
          <Button
            style={{ margin: '-10px 0 10px 10px' }}
            onClick={showModal}
            type="primary"
          >
            导入其他经销商模版
          </Button>
        </Col>
      </Row>
      <Table
        style={{ position: 'static' }}
        expandIconColumnIndex={3}
        pagination={false}
        expandable={{
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <span
                style={{ color: '#2694fc', whiteSpace: 'nowrap' }}
                onClick={(e) => onExpand(record, e)}
              >
                收起
                <UpOutlined />
              </span>
            ) : (
              <span
                style={{ color: '#2694fc', whiteSpace: 'nowrap' }}
                onClick={(e) => onExpand(record, e)}
              >
                展开
                <DownOutlined />
              </span>
            ),
        }}
        columns={columns}
        dataSource={tabledata}
        onExpand={changePand}
        expandedRowRender={(record) => (
          <div>
            <Table
              columns={columns2}
              dataSource={record.products}
              pagination={false}
            />
            <Button
              style={{ margin: '10px auto 0 auto', display: 'table' }}
              onClick={() => submitProducts(record)}
              type="primary"
            >
              保存
            </Button>
          </div>
        )}
      />
      <Modal
        title="导入其他经销商模版"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={5}>选择经销商:</Col>
          <Col span={12}>
            <Select
              style={{ width: '200px' }}
              defaultValue={templateData[0]?.name}
              onChange={handleChange}
            >
              {templateData?.map((item, index) => (
                <Option value={item.companyId} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ShopListPage;
