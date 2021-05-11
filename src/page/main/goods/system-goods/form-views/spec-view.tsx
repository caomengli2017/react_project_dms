import {
  addGoodsSpecs,
  deleteAdminGoodsSpecs,
  getAdminGoodsSpecList,
  getSpecList,
} from '@src/apis/main/goods';
import { FTableView } from '@src/component';
import { SpecListModal } from '@src/types/model/goods';
import {
  Button,
  Tag,
  Space,
  Typography,
  Modal,
  Checkbox,
  Form,
  Select,
  ModalProps,
  message,
} from 'antd';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { ITableViewRef } from '../../../../../types/baseTypes';

type ISpecInfoViewProps = {
  goodsId?: number;
};
const SpecInfoView = ({ goodsId }: ISpecInfoViewProps) => {
  const [visible, setvisible] = useState(false);
  const [data, setData] = useState<IEditSpecModal>();
  const tableRef = useRef<ITableViewRef>(null);
  const table = useMemo(
    () => (
      <FTableView
        queryApi={getAdminGoodsSpecList}
        rowKey="oid"
        ref={tableRef}
        initalParams={{ goodsId }}
        columns={[
          {
            title: intl.get('c_specificationName'),
            dataIndex: 'name',
          },
          {
            title: intl.get('spec_val'),
            dataIndex: 'specs',
            render: (value) => {
              if (_.isArray(value)) {
                return value.map((val, index) => (
                  <Tag key={_.uniqueId('speces_val_')}>{val.v}</Tag>
                ));
              }
            },
          },
          {
            title: intl.get('operating'),
            render: (value, record: SpecListModal) => {
              return (
                <Space>
                  <Typography.Link
                    onClick={() => {
                      setData({
                        oid: record.oid,
                        specsId: record.specsId,
                        specsValues: record.specs.map((e) => e.k),
                      });
                      setvisible(true);
                    }}
                  >
                    {intl.get('edit')}
                  </Typography.Link>
                  <Typography.Link
                    style={{ display: 'none' }}
                    onClick={() => {
                      Modal.confirm({
                        title: intl.get('delete_confirm'),
                        icon: <ExclamationCircleOutlined />,
                        onOk() {
                          return new Promise((resolve, reject) => {
                            deleteAdminGoodsSpecs(record.oid)
                              .then((res) => {
                                message.success(intl.get('operatingOk'));
                                tableRef.current?.query();
                                resolve(null);
                              })
                              .catch(() => {
                                reject(null);
                              });
                          });
                        },
                      });
                    }}
                  >
                    {intl.get('delete')}
                  </Typography.Link>
                </Space>
              );
            },
          },
        ]}
      />
    ),
    [goodsId]
  );
  return (
    <div>
      <Button
        style={{ marginBottom: 15 }}
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setData(undefined);
          setvisible(true);
        }}
      >
        {intl.get('add_spec')}
      </Button>
      {table}
      <AddSpecModal
        visible={visible}
        data={data}
        goodsId={goodsId}
        onCancel={() => setvisible(false)}
        onClose={() => {
          tableRef.current?.query();
          setvisible(false);
        }}
      />
    </div>
  );
};
const labelCol = {
  flex: '100px',
};
interface IEditSpecModal {
  oid: number;
  specsId: number;
  specsValues: Array<number | string>;
}
interface IAddSpecModalProps extends ModalProps {
  onClose: () => void;
  goodsId?: number;
  data?: IEditSpecModal;
}
const AddSpecModal = ({ data, goodsId, ...props }: IAddSpecModalProps) => {
  const [specList, setSpecList] = useState<SpecListModal[]>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getSpecList().then((res) => {
      setSpecList(res.data.list);
    });
  }, []);
  useEffect(() => {
    if (!props.visible) return;
    if (data) {
      form.setFieldsValue({
        specsId: data.specsId,
        specsValues: data.specsValues,
      });
    } else {
      form.setFieldsValue({
        specsId: specList && specList[0].oid,
        specsValues: [],
      });
    }
  }, [form, data, props.visible, specList]);
  const onConfirm = () => {
    form.validateFields().then((value) => {
      setConfirmLoading(true);
      addGoodsSpecs({ ...value, goodsId: goodsId, oid: data?.oid })
        .then(() => {
          props.onClose();
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    });
  };
  return (
    <Modal
      onCancel={props.onCancel}
      visible={props.visible}
      title={data ? intl.get('edit_spec') : intl.get('add_spec')}
      onOk={onConfirm}
      confirmLoading={confirmLoading}
    >
      <Form labelCol={labelCol} form={form}>
        <Form.Item
          label={intl.get('c_specificationName')}
          name="specsId"
          rules={[{ required: true }]}
        >
          <Select>
            {specList?.map((val) => (
              <Select.Option key={val.oid} value={val.oid}>
                {val.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={true}>
          {({ getFieldValue }) => (
            <Form.Item
              label={intl.get('add_spec_val')}
              name="specsValues"
              rules={[{ required: true }]}
            >
              <Checkbox.Group
                options={formatOption(specList, getFieldValue('specsId'))}
              />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
const formatOption = (list?: SpecListModal[], id?: number) => {
  if (!list || !id) return [];
  const val = list.find((e) => e.oid === id)?.specs;
  return val?.map((e) => ({ label: e.v, value: e.k })) ?? [];
};
export default SpecInfoView;
