import { FBaseListPage } from '@src/component';
import React, { useRef, useState } from 'react';
import { Button, Space, Typography } from 'antd';
import intl from 'react-intl-universal';
import { getSpecList } from '@src/apis/main/goods';
import AddForm from './addForm';
import SpecsList from './specsList';
import { IBaseListPageRef } from '@src/types/baseTypes';
import { SpecListModal } from '@src/types/model/goods';
import { PlusOutlined } from '@ant-design/icons';

const SpecPage = () => {
  const [visible, setvisible] = useState(false);
  const [specsVisible, setSpecsVisible] = useState(false);
  const [currentSpec, setCurrentSpec] = useState<SpecListModal>();

  const baseRef = useRef<IBaseListPageRef>(null);

  const showModal = (record?: any) => {
    setCurrentSpec(record);
    setvisible(true);
  };
  const showSpecsModal = (record: any) => {
    setCurrentSpec(record);
    setSpecsVisible(true);
  };
  const refreshData = () => {
    baseRef.current?.query();
  };
  const onClose = () => {
    setvisible(false);
    refreshData();
  };
  return (
    <FBaseListPage
      ref={baseRef}
      queryApi={getSpecList}
      rowKey="oid"
      leftNode={[
        // <Button>{intl.get('export_checked_spec')}</Button>,
        // <Button>{intl.get('export_all_spec')}</Button>,
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          {intl.get('add_spec')}
        </Button>,
      ]}
      columns={[
        {
          dataIndex: 'name',
          title: intl.get('c_specificationName'),
        },
        {
          dataIndex: 'remark',
          title: intl.get('remark'),
        },
        {
          title: intl.get('operating'),
          render: (text, record) => (
            <Space size="middle">
              <Typography.Link onClick={() => showModal(record)}>
                {intl.get('edit')}
              </Typography.Link>
              <Typography.Link onClick={() => showSpecsModal(record)}>
                {intl.get('check_spec')}
              </Typography.Link>
            </Space>
          ),
        },
      ]}
    >
      <AddForm
        visible={visible}
        onCancel={() => setvisible(false)}
        onClose={onClose}
        specData={currentSpec}
      />
      <SpecsList
        specData={currentSpec}
        visible={specsVisible}
        onOk={() => setSpecsVisible(false)}
        onCancel={() => setSpecsVisible(false)}
        onRefresh={refreshData}
      />
    </FBaseListPage>
  );
};

export default SpecPage;
