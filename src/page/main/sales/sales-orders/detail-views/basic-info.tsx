import { getSalesOrderDetail, orderReview } from '@src/apis/main/sales';
import fallback from '@src/assets/img/base64/fallback';
import { SalesOrderDetailModal } from '@src/types/model/sales-orders';
import intl from 'react-intl-universal';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Row,
  Table,
  Image,
  Empty,
  Modal,
  message,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { IRootState } from '@src/redux/reducers';

type IBasicinfoProps = {
  orderCode: string;
  onRefresh: () => void;
};

const BasicInfo = (props: IBasicinfoProps) => {
  const [state, setState] = useState<SalesOrderDetailModal>();

  // 门店id 当storeId = 1时为品牌方
  const { storeId } = useSelector((state: IRootState) => state.storeId);

  const getData = useCallback(() => {
    if (props.orderCode) {
      getSalesOrderDetail(props.orderCode).then((res) => {
        setState(res.data);
      });
    }
  }, [props.orderCode]);
  useEffect(() => {
    getData();
  }, [getData]);
  const columns = [
    {
      title: '货品编码',
      dataIndex: 'bn',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '商品图片',
      dataIndex: 'goods_img',
      render: (val: any) => {
        return <Image width={50} height={50} src={val} fallback={fallback} />;
      },
      width: 80,
    },
    {
      title: '商品名称',
      dataIndex: 'goods_name',
      width: 200,
    },
    {
      title: '商品规格',
      dataIndex: 'spec',
      render: (val: any[]) => {
        let specValue: any[] = [];
        val.forEach((item) => {
          if (item.spec_value) {
            specValue.push(item.spec_value);
          }
        });
        return specValue.join('/');
      },
    },
    {
      title: '原价',
      dataIndex: 'original_price',
      render: (val: { sign: any; value: any }) => val.sign + val.value,
    },
    {
      title: '折后价',
      dataIndex: 'discounted_price',
      render: (val: { sign: any; value: any }) => val.sign + val.value,
    },
    {
      title: '成交价',
      dataIndex: 'price',
      render: (val: { sign: any; value: any }) => val.sign + val.value,
    },
    {
      title: '成交小计',
      render: (val: any, record: any) => {
        return record.price.sign + record.price.value * record.quantity;
      },
    },
    {
      title: '购买数量',
      dataIndex: 'quantity',
    },
    {
      title: '发货数量',
      dataIndex: 'send_quantity',
    },
  ];
  if (!state) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  // 支付状态
  let payStatus = '';
  if (state.pay_status === 0) {
    payStatus = '未支付';
  } else if (state.pay_status === 1) {
    payStatus = '已支付';
  } else if (state.pay_status === 2) {
    payStatus = '部分退款';
  } else {
    payStatus = '全部退款';
  }

  // 物流状态
  let shipStatus = '';
  if (state.ship_status === 0) {
    shipStatus = '未发货';
  } else if (state.ship_status === 1) {
    shipStatus = '部分发货';
  } else if (state.ship_status === 2) {
    shipStatus = '已发货';
  } else if (state.ship_status === 3) {
    shipStatus = '部分退货';
  } else {
    shipStatus = '已退货';
  }

  // 审核状态
  let reviewStatus = '';
  if (state.review_status === 0) {
    reviewStatus = '未审核';
  } else if (state.review_status === 1) {
    reviewStatus = '审核通过';
  } else {
    reviewStatus = '审核拒绝';
  }

  // 二次确认弹窗
  const showConfirm = (status: number) => {
    Modal.confirm({
      title: status === 1 ? '审核通过' : '审核不通过',
      icon: <ExclamationCircleOutlined />,
      content: status === 1 ? '确定通过审核吗？' : '确定不通过审核吗？',
      onOk() {
        return new Promise((resolve, reject) => {
          orderReview({ order_code: props.orderCode, status })
            .then(() => {
              message.success(intl.get('operatingOk'));
              getData();
              props.onRefresh();
              resolve(null);
            })
            .catch(() => {
              reject();
            });
        });
      },
      onCancel() {},
    });
  };

  // 发货逻辑
  const handleDeliver = () => {
    if (storeId === 1) {
      message.warning('已通知HS发货');
    } else {
      message.warning('请到APP进行操作');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Descriptions title="基本信息" column={1}>
          <Descriptions.Item
            label="订单编号"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.order_code}
          </Descriptions.Item>
          <Descriptions.Item
            label="下单时间"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.created_at}
          </Descriptions.Item>
          <Descriptions.Item
            label="订单金额"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.money.sign + state.money.value}
          </Descriptions.Item>
          <Descriptions.Item
            label="实际支付"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.pay_money.sign + state.pay_money.value}
          </Descriptions.Item>
          <Descriptions.Item
            label="支付时间"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.pay_time}
          </Descriptions.Item>
          <Divider dashed />
          <Descriptions.Item
            label="成交物品费"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.product_money.sign + state.product_money.value}
          </Descriptions.Item>
          <Descriptions.Item
            label="原始物品总额"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.product_original_money.sign +
              state.product_original_money.value}
          </Descriptions.Item>
          <Descriptions.Item label="优惠" labelStyle={{ fontWeight: 'bold' }}>
            {state.product_discount.sign + state.product_discount.value}
          </Descriptions.Item>
          <Divider dashed />
          <Descriptions.Item
            label="成交运费"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.ship_money.sign + state.ship_money.value}
          </Descriptions.Item>
          <Descriptions.Item
            label="原始运费"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.ship_original_money.sign + state.ship_original_money.value}
          </Descriptions.Item>
          <Descriptions.Item label="优惠" labelStyle={{ fontWeight: 'bold' }}>
            {state.ship_discount.sign + state.ship_discount.value}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="经销商信息" column={1}>
          <Descriptions.Item
            label="经销商名称"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.buyer_info.company_name}
          </Descriptions.Item>
          <Descriptions.Item
            label="经销商级别"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.buyer_info.level_name}
          </Descriptions.Item>
          <Descriptions.Item
            label="省份/直辖市"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {/* {state.ship_province} */}
          </Descriptions.Item>
          <Descriptions.Item label="市" labelStyle={{ fontWeight: 'bold' }}>
            {/* {state.ship_city} */}
          </Descriptions.Item>
          <Descriptions.Item label="区/县" labelStyle={{ fontWeight: 'bold' }}>
            {/* {state.ship_county} */}
          </Descriptions.Item>
          <Descriptions.Item
            label="上级经销商/品牌商"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.seller_info.company_name}
          </Descriptions.Item>
          <Descriptions.Item label="联系人" labelStyle={{ fontWeight: 'bold' }}>
            {state.buyer_info.contact}
          </Descriptions.Item>
          <Descriptions.Item
            label="联系电话"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.buyer_info.tel}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          title="收货人信息"
          column={1}
          style={{ paddingRight: 40 }}
        >
          <Descriptions.Item label="收货人" labelStyle={{ fontWeight: 'bold' }}>
            {state.ship_name}
          </Descriptions.Item>
          <Descriptions.Item label="地址" labelStyle={{ fontWeight: 'bold' }}>
            {`${state.ship_province}${state.ship_city}${state.ship_county}${state.ship_address}`}
          </Descriptions.Item>
          <Descriptions.Item
            label="联系电话"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.ship_phone}
          </Descriptions.Item>
          <Descriptions.Item
            label="备注信息"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.customer_message}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions column={1}>
          <Descriptions.Item
            label="支付状态"
            labelStyle={{ fontWeight: 'bold' }}
          >
            <span
              className={classNames({
                green: state.pay_status === 1,
                red: state.pay_status === 0,
              })}
            >
              {payStatus}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label="物流状态"
            labelStyle={{ fontWeight: 'bold' }}
          >
            <span className={classNames({ red: state.ship_status === 0 })}>
              {shipStatus}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label="审核状态"
            labelStyle={{ fontWeight: 'bold' }}
          >
            <span
              className={classNames('blue', { red: state.review_status === 2 })}
            >
              {reviewStatus}
            </span>
          </Descriptions.Item>
          {state.button_show.sale_review === 1 && (
            <>
              <Row justify="center" gutter={12}>
                <Col style={{ width: 260 }}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    className="green-button"
                    onClick={() => showConfirm(1)}
                  >
                    审核通过
                  </Button>
                </Col>
              </Row>
              <Row justify="center" gutter={12}>
                <Col style={{ width: 260 }}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    danger
                    onClick={() => showConfirm(2)}
                  >
                    审核不通过
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {state.button_show.sale_deliver === 1 && (
            <Row justify="center" gutter={12}>
              <Col style={{ width: 260 }}>
                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={handleDeliver}
                >
                  发货
                </Button>
              </Col>
            </Row>
          )}
        </Descriptions>
      </div>
      <p style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>
        物品信息：
        <span style={{ fontSize: 16 }}>总共{state.product_quantity}件</span>
      </p>
      <Table
        columns={columns}
        dataSource={state.list}
        rowKey="bn"
        pagination={false}
        size="small"
      />
    </div>
  );
};
export default BasicInfo;
