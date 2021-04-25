import {
  addGoodsBasicInfo,
  addGoodsSpecs,
  getSpecList,
} from '@src/apis/main/goods';
import { FFormItemUpload } from '@src/component';
import FTableView from '@src/component/FTableView';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { SpecListModal } from '@src/types/model/goods';

interface IAddFormProps extends ModalProps {
  data?: any;
}

const labelCol = {
  flex: '100px',
};
const { TabPane } = Tabs;

const AddForm = (props: IAddFormProps) => {
  return (
    <Modal
      title={props.data ? intl.get('edit_goods') : intl.get('add_goods')}
      visible={props.visible}
      onCancel={props.onCancel}
      width={1000}
      footer={null}
    >
      <Tabs type="card">
        <TabPane tab={intl.get('basicInfo')} key="1">
          <BasicInfoBox />
        </TabPane>
        <TabPane tab={intl.get('spec')} key="2">
          <SpecInfoBox />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
const BasicInfoBox = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (value: any) => {
    setLoading(true);
    addGoodsBasicInfo(value)
      .then(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form labelCol={labelCol} onFinish={onFinish}>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_brandName')}
            name="brandId"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_name')}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.get('fc_goodsNumber')}
            name="bn"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.get('c_stock')}
            name="stock"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label={intl.get('goodsDesc')}
        name="desc"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label={intl.get('goodsImage')}
        name="picUrl"
        rules={[{ required: true }]}
      >
        <FFormItemUpload
          maxLength={3}
          uploadState={{ listType: 'picture-card' }}
        />
      </Form.Item>
      <Row justify="center">
        <Button loading={loading} type="primary" htmlType="submit">
          {intl.get('save')}
        </Button>
      </Row>
    </Form>
  );
};

const SpecInfoBox = () => {
  const [visible, setvisible] = useState(false);
  const [data, setData] = useState<IEditSpecModal>();
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
      <FTableView
        queryApi={getSpecList}
        rowKey="oid"
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
      <AddSpecModal
        visible={visible}
        data={data}
        onCancel={() => setvisible(false)}
        onClose={() => setvisible(false)}
      />
    </div>
  );
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
export default AddForm;
