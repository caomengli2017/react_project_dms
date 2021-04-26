import {
  addGoodsSpecs,
  getAdminGoodsSpecList,
  getSpecList,
} from '@src/apis/main/goods';
import { FTableView } from '@src/component';
import { SpecListModal } from '@src/types/model/goods';
import {
  Button,
  Tag,
  Space,
  Divider,
  Typography,
  Modal,
  Checkbox,
  Form,
  Select,
  ModalProps,
} from 'antd';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';

const labelCol = {
  flex: '100px',
};
interface IEditSpecModal {
  goodsId: number;
  specsValues: Array<number | string>;
}
interface IAddSpecModalProps extends ModalProps {
  onClose: () => void;
  data?: IEditSpecModal;
}
const AddSpecModal = (props: IAddSpecModalProps) => {
  const [selectId, setSelectId] = useState<number>();
  const [specList, setSpecList] = useState<SpecListModal[]>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getSpecList().then((res) => {
      setSpecList(res.data.list);
      setSelectId(res.data.list[0].oid);
    });
  }, []);
  useEffect(() => {
    if (!!props.data) {
      setSelectId(props.data.goodsId);
      form.setFieldsValue(props.data);
    }
  }, [form, props.data]);
  const selectOnChange = (value: any) => {
    setSelectId(value);
    form.resetFields(['val']);
  };
  const onConfirm = () => {
    form.validateFields().then((value) => {
      setConfirmLoading(true);
      addGoodsSpecs(value)
        .then(() => {
          form.resetFields();
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
      title={props.data ? intl.get('edit_spec') : intl.get('add_spec')}
      onOk={onConfirm}
      confirmLoading={confirmLoading}
    >
      <Form labelCol={labelCol} form={form}>
        <Form.Item
          label={intl.get('c_specificationName')}
          name="goodsId"
          rules={[{ required: true }]}
        >
          <Select onChange={selectOnChange} value={selectId}>
            {specList?.map((val) => (
              <Select.Option key={val.oid} value={val.oid}>
                {val.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={intl.get('add_spec_val')}
          name="specsValues"
          rules={[{ required: true }]}
        >
          <Checkbox.Group options={formatOption(specList, selectId)} />
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
type ISpecInfoViewProps = {
  goodsId?: number;
};
const SpecInfoView = ({ goodsId }: ISpecInfoViewProps) => {
  const [visible, setvisible] = useState(false);
  const [data, setData] = useState<IEditSpecModal>();
  const table = useMemo(
    () => (
      <FTableView
        queryApi={getAdminGoodsSpecList}
        rowKey="oid"
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
                <Space split={<Divider type="vertical" />}>
                  <Typography.Link
                    onClick={() => {
                      setData({
                        goodsId: record.oid,
                        specsValues: record.specs.map((e) => e.k),
                      });
                      setvisible(true);
                    }}
                  >
                    {intl.get('edit')}
                  </Typography.Link>
                  <Typography.Link
                    onClick={() => {
                      Modal.confirm({
                        title: intl.get('delete_confirm'),
                        icon: <ExclamationCircleOutlined />,
                        onOk() {
                          // return
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
        onCancel={() => setvisible(false)}
        onClose={() => setvisible(false)}
      />
    </div>
  );
};
export default SpecInfoView;
