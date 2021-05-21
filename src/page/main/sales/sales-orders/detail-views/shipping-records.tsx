import { getDeliveryList, getPackageDetail } from '@src/apis/main/sales';
import { FTableView } from '@src/component';
import { PackageDetailModal } from '@src/types/model/sales-orders';
import { Col, Empty, Modal, ModalProps, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

type IShippingRecordsProps = {
  orderCode: string;
};
const ShippingRecords = (props: IShippingRecordsProps) => {
  const [visible, setVisible] = useState(false);
  const [deliverCode, setDeliverCode] = useState('');
  const columns = [
    {
      title: '发货记录号',
      dataIndex: 'deliver_code',
    },
    {
      title: '创建日期',
      dataIndex: 'created_at',
    },
    {
      title: '承运商',
      dataIndex: 'transport_name',
    },
    {
      title: '物流单号',
      dataIndex: 'transport_code',
    },
    {
      title: '收件人',
      dataIndex: 'ship_name',
    },
    {
      title: '运费',
      dataIndex: 'ship_money',
    },
    {
      title: '物品费',
      dataIndex: 'product_money',
      render: (val: { sign: any; value: any }) => val.sign + val.value,
    },
    {
      title: '货品数量',
      dataIndex: 'product_quantity',
    },
    {
      title: '操作',
      render: (_val: any, record: any) => (
        <Typography.Link
          onClick={() => {
            setVisible(true);
            setDeliverCode(record.deliver_code);
          }}
        >
          详情
        </Typography.Link>
      ),
    },
  ];
  return (
    <div>
      <p style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>
        发货记录(包裹)
      </p>
      <FTableView
        queryApi={getDeliveryList}
        rowKey="deliver_code"
        initalParams={{ order_code: props.orderCode }}
        columns={columns}
        tableProps={{
          pagination: false,
        }}
      />
      <PackageDetail
        visible={visible}
        onCancel={() => setVisible(false)}
        deliverCode={deliverCode}
      />
    </div>
  );
};

// 包裹详情
interface IPackageDetailProps extends ModalProps {
  deliverCode: string;
}
const PackageDetail = (props: IPackageDetailProps) => {
  const [packageData, setPackageData] = useState<PackageDetailModal>();
  useEffect(() => {
    if (!props.visible) return;
    getPackageDetail(props.deliverCode).then((res) => {
      setPackageData(res.data);
    });
  }, [props.deliverCode, props.visible]);

  const columns = [
    {
      title: '货品名称',
      dataIndex: 'goods_name',
    },
    {
      title: 'SKU',
      dataIndex: 'bn',
    },
    {
      title: '规格',
      dataIndex: 'spec_values',
      render: (val: any[]) => val.join('/'),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
    {
      title: 'STU',
      dataIndex: 'stus',
      width: 400,
      render: (val: any[]) => val.join(';'),
    },
  ];

  return (
    <Modal
      visible={props.visible}
      width={1000}
      title="包裹详情"
      onCancel={props.onCancel}
      footer={null}
      maskClosable={false}
    >
      {packageData && (
        <>
          <Row style={{ marginBottom: 8 }}>
            <Col span={12}>
              <p>
                <span style={{ fontWeight: 'bold', marginRight: 8 }}>
                  承运商:
                </span>
                {packageData.transport_name}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span style={{ fontWeight: 'bold', marginRight: 8 }}>
                  物流单号:
                </span>
                {packageData.transport_code}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <span style={{ fontWeight: 'bold', marginRight: 8 }}>
                  发货时间:
                </span>
                {packageData.created_at}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <span style={{ fontWeight: 'bold', marginRight: 8 }}>
                  货品数量:
                </span>
                {packageData.product_quantity}
              </p>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={packageData.list}
            rowKey="order_code"
            pagination={false}
            size="small"
            style={{ marginTop: 16 }}
          />
        </>
      )}
    </Modal>
  );
};
export default ShippingRecords;
