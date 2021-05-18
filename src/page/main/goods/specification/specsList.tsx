import React, { useCallback, useEffect, useState } from 'react';
import { message, Modal, ModalProps, Table, Typography } from 'antd';
import intl from 'react-intl-universal';
import { getSpecsValList, switchSpecsValStatus } from '@src/apis/main/goods';
import { SpecListModal } from '@src/types/model/goods';

interface IAddFormProps extends ModalProps {
  specData?: SpecListModal;
}
const SpecsList = ({ specData, ...props }: IAddFormProps) => {
  const [data, setData] = useState([]);
  const getListData = useCallback(async () => {
    try {
      if (specData) {
        const res = await getSpecsValList({
          specsId: specData?.oid,
          enable: 'all',
        });
        setData(res.data.list);
      }
    } catch (error) {}
  }, [specData]);

  const switchSpecsStatus = async (record: any) => {
    // status=0 禁用 status=1 启用
    const status = record.enable === 0 ? 1 : 0;

    try {
      if (specData) {
        await switchSpecsValStatus({ oid: record.oid, enable: status });
        await getListData();
        message.success(intl.get('operatingOk'));
      }
    } catch (error) {}
  };
  useEffect(() => {
    getListData();
  }, [getListData]);
  const columns = [
    {
      title: intl.get('spec_val'),
      dataIndex: 'value',
    },
    {
      title: '状态',
      dataIndex: 'enable',
      render: (value: number) => {
        if (value === 0) {
          return <span className="red">禁用</span>;
        } else {
          return '启用';
        }
      },
    },
    {
      title: intl.get('operating'),
      dataIndex: 'remark',
      render: (_text: any, record: any) => (
        <Typography.Link onClick={() => switchSpecsStatus(record)}>
          {record.enable === 0 ? '启用' : '禁用'}
        </Typography.Link>
      ),
    },
  ];
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
