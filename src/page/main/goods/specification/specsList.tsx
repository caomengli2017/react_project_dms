import React, { useCallback, useEffect, useState } from 'react';
import { message, Modal, ModalProps, Table, Typography } from 'antd';
import intl from 'react-intl-universal';
import { getSpecsValList, deleteSpecsVal } from '@src/apis/main/goods';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { SpecListModal } from '@src/types/model/goods';

const { confirm } = Modal;
interface IAddFormProps extends ModalProps {
  onRefresh: () => void;
  specData?: SpecListModal;
}
const SpecsList = ({ onRefresh, specData, ...props }: IAddFormProps) => {
  const [data, setData] = useState([]);
  const getListData = useCallback(async () => {
    try {
      if (specData) {
        const res = await getSpecsValList(specData?.oid);
        setData(res.data.list);
      }
    } catch (error) {}
  }, [specData]);

  const _deleteSpecs = (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (specData) {
          await deleteSpecsVal({ oid: id });
          await getListData();
          onRefresh();
          message.success(intl.get('operatingOk'));
          resolve(null);
        }
      } catch (error) {
        reject();
      }
    });
  };
  useEffect(() => {
    getListData();
  }, [getListData]);
  const columns = [
    {
      title: intl.get('c_serialNumber'),
      render: (_text: any, _record: any, index: number) => `${index + 1}`,
    },
    {
      title: intl.get('spec_val'),
      dataIndex: 'value',
    },
    {
      title: intl.get('operating'),
      dataIndex: 'remark',
      render: (_text: any, record: any) => (
        <Typography.Link
          type="danger"
          onClick={() => showDeleteConfirm(record.oid)}
        >
          禁用
        </Typography.Link>
      ),
    },
  ];
  const showDeleteConfirm = (id: number) => {
    confirm({
      title: intl.get('delete_confirm'),
      icon: <ExclamationCircleOutlined />,
      okText: intl.get('confirm'),
      cancelText: intl.get('cancel'),
      onOk() {
        _deleteSpecs(id);
      },
      onCancel() {},
    });
  };
  return (
    <Modal
      className="specs-list-modal"
      visible={props.visible}
      title={`规格名称：${specData?.name}`}
      onOk={props.onOk}
      onCancel={props.onCancel}
      footer={null}
      maskClosable={false}
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="oid"
        pagination={false}
        size="small"
      />
    </Modal>
  );
};
export default SpecsList;
