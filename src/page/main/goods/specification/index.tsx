import { FBaseListPage } from '@src/component';
import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import intl from 'react-intl-universal';
import { getSpecList, saveSpecs } from '@src/apis/main/goods';
import AddForm from './addForm';
import SpecsList from './specsList';
import './index.less';
import { IBaseListPageRef } from '@src/types/baseTypes';

const SpecPage = () => {
  interface IcurrentSpec {
    name?: string;
    oid?: number;
    remark?: string;
    specs?: any[];
    [propName: string]: any;
  }
  const [visible, setvisible] = useState(false);
  const [initialVal, setInitialVal] = useState<IcurrentSpec>();
  const [specsVisible, setSpecsVisible] = useState(false);

  const [currentSpec, setCurrentSpec] = useState<IcurrentSpec>();

  const baseRef = useRef<IBaseListPageRef>(null);
  const showModal = (initialVal?: any) => {
    setInitialVal(initialVal);
    setvisible(true);
  };
  const showSpecsModal = (record: any) => {
    setSpecsVisible(true);
    setCurrentSpec(record);
  };
  const refreshData = () => {
    baseRef.current?.query();
  };
  const onCreate = async (values: any) => {
    let obj = { ...values };
    if (initialVal) {
      obj = { ...values, oid: initialVal.oid };
    }
    setvisible(false);
    await saveSpecs(obj);
    refreshData();
  };
  return (
    <FBaseListPage
      ref={baseRef}
      queryApi={getSpecList}
      rowKey="oid"
      leftNode={[
        <Button>{intl.get('export_checked_spec')}</Button>,
        <Button>{intl.get('export_all_spec')}</Button>,
        <Button type="primary" onClick={() => showModal()}>
          +{intl.get('add_spec')}
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
          dataIndex: 'specificationName',
          title: intl.get('operating'),
          render: (text, record) => (
            <Space size="middle">
              <Button type="link" onClick={() => showModal(record)}>
                {intl.get('edit')}
              </Button>
              <Button type="link" onClick={() => showSpecsModal(record)}>
                {intl.get('check_spec')}
              </Button>
            </Space>
          ),
        },
      ]}
    >
      <AddForm
        visible={visible}
        onCancel={() => setvisible(false)}
        onCreate={onCreate}
        title={initialVal ? intl.get('edit_spec') : intl.get('add_spec')}
        initialVal={initialVal}
      />
      <SpecsList
        title={`规格名称：${currentSpec?.name}`}
        visible={specsVisible}
        okText="关闭"
        onOk={() => setSpecsVisible(false)}
        onCancel={() => setSpecsVisible(false)}
        width={1000}
        specsId={currentSpec?.oid}
        onRefresh={refreshData}
      ></SpecsList>
    </FBaseListPage>
  );
};

export default SpecPage;
