import { FBaseListPage } from '@src/component';
import React, { useRef, useState } from 'react';
import { Button, Input, message, Modal, Space, Typography } from 'antd';
import intl from 'react-intl-universal';
import AddForm from './addForm';
import { deleteBrand, getBrandList, saveBrand } from '@src/apis/main/goods';
import { IBaseListPageRef } from '@src/types/baseTypes';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { confirm } = Modal;

/**
 *
 * @author Leo
 * @desc 品牌管理
 * @date 2021-04-20 16:33:25
 */
const BrandPage = () => {
  interface IcurrentBrand {
    name: String;
    oid: Number;
    parentId: Number;
    [propName: string]: any;
  }
  const [visible, setvisible] = useState(false);
  const [initialVal, setInitialVal] = useState<IcurrentBrand>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const baseRef = useRef<IBaseListPageRef>(null);
  const showModal = (initialVal?: any) => {
    setInitialVal(initialVal);
    setvisible(true);
  };
  const refreshData = () => {
    baseRef.current?.query();
  };
  const onCreate = async (values: any) => {
    setConfirmLoading(true);
    let obj = { ...values };
    if (initialVal) {
      obj = { ...values, oid: initialVal.oid };
    }
    saveBrand(obj)
      .then(() => {
        message.success(intl.get('operatingOk'));
        setvisible(false);
        refreshData();
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };
  const showDeleteConfirm = (id: number) => {
    confirm({
      title: intl.get('delete_confirm'),
      icon: <ExclamationCircleOutlined />,
      okText: intl.get('confirm'),
      cancelText: intl.get('cancel'),
      onOk() {
        return new Promise((resolve, reject) => {
          deleteBrand({ oid: id })
            .then(() => {
              message.success(intl.get('operatingOk'));
              refreshData();
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
  return (
    <FBaseListPage
      queryApi={getBrandList}
      ref={baseRef}
      rowKey="oid"
      leftNode={[
        // <Button>{intl.get('export_checked_brand')}</Button>,
        // <Button>{intl.get('export_all_brand')}</Button>,
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          {intl.get('add_brand')}
        </Button>,
      ]}
      conditions={[
        {
          id: 'name',
          label: intl.get('fc_brandName'),
          _node: <Input placeholder="请输入品牌名称" />,
        },
      ]}
      columns={[
        // {
        //   dataIndex: 'oid',
        //   title: intl.get('c_serialNumber'),
        // },
        {
          dataIndex: 'name',
          title: intl.get('fc_brandName'),
        },
        {
          dataIndex: 'parentName',
          title: intl.get('c_supBrand'),
        },
        {
          dataIndex: 'enabled',
          title: '状态',
          render: (value, record) => {
            return value === 1 ? '启用' : '禁用';
          },
        },
        {
          title: intl.get('operating'),
          render: (value, record) => {
            return (
              <Space size="middle">
                <Typography.Link onClick={() => showModal(record)}>
                  {intl.get('edit')}
                </Typography.Link>
                <Typography.Link
                  style={{ display: 'none' }}
                  type="danger"
                  onClick={() => showDeleteConfirm(record.oid)}
                >
                  {intl.get('delete')}
                </Typography.Link>
              </Space>
            );
          },
        },
      ]}
    >
      <AddForm
        title={initialVal ? intl.get('edit_brand') : intl.get('add_brand')}
        visible={visible}
        onCancel={() => setvisible(false)}
        onCreate={onCreate}
        initialVal={initialVal}
        confirmLoading={confirmLoading}
      />
    </FBaseListPage>
  );
};

export default BrandPage;
