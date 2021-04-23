import React, { useEffect, useState } from 'react';
import { Modal, ModalProps, Table, Button } from 'antd';
import intl from 'react-intl-universal';
import { getSpecsValList, deleteSpecs } from '@src/apis/main/goods';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
interface IAddFormProps extends ModalProps {
  specsId?: number;
  onRefresh: () => void;
}
const SpecsList = (props: IAddFormProps) => {
  const [data, setData] = useState([]);
  const getListData = async () => {
    const res = await getSpecsValList({ specsId: props.specsId });
    const data = res.data.list;
    setData(data);
  };
  useEffect(() => {
    getListData();
  }, [props.specsId]);
  const columns = [
    {
      title: intl.get('c_serialNumber'),
      dataIndex: 'orderId',
    },
    {
      title: intl.get('spec_val'),
      dataIndex: 'value',
    },
    {
      title: intl.get('operating'),
      dataIndex: 'remark',
      render: (text: any, record: any) => (
        <Button
          danger
          type="text"
          onClick={() => showDeleteConfirm(record.orderId)}
        >
          {intl.get('delete')}
        </Button>
      ),
    },
  ];
  const showDeleteConfirm = (id: number) => {
    confirm({
      title: intl.get('delete_confirm'),
      icon: <ExclamationCircleOutlined />,
      okText: intl.get('confirm'),
      cancelText: intl.get('cancel'),
      async onOk() {
        await deleteSpecs({ specsId: id });
        await getListData();
        props.onRefresh();
      },
      onCancel() {},
    });
  };
  return (
    <Modal
      className="specs-list-modal"
      title={props.title}
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width={props.width}
      okText={props.okText}
      maskClosable={false}
      forceRender
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="orderId"
        pagination={false}
        size="small"
      />
    </Modal>
  );
};
export default SpecsList;
