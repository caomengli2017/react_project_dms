import {
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Col,
  Descriptions,
  Table,
  AutoComplete,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getShopDetail, getCompanyList } from '@src/apis/main/shop';
import { FFormItemUpload } from '@src/component';

interface IAddFormProps extends ModalProps {
  onCreate: (values: any) => void;
  initialVal?: any;
}

const labelCol = {
  md: { span: 24 },
  sm: { span: 6 },
};
const wrapperCol = {
  md: { span: 22 },
  sm: { span: 16 },
};
const AddForm = (props: IAddFormProps) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((val) => {
      // form.resetFields();
      props.onCreate({ ...val, companyId: compId });
    });
  };
  const onChange = (data: any) => {
    getCompanyList({ companyName: data }).then((res) => {
      const newOption = res.data.list.map((e: any) => ({
        label: e.name,
        value: e.name,
        key: e.companyId,
      }));
      setOptions(newOption);
      setCompanyid(res.data.list[0]?.companyId);
      setCompanyName(res.data.list[0]?.name);
    });
  };
  const onSelect = (value: any) => {
    setCompanyName(value);
  };
  const [options, setOptions] = useState([]);
  const [tablelist, setTablelist] = useState([]);
  const [compId, setCompanyid] = useState('');
  const [compName, setCompanyName] = useState('');
  useEffect(() => {
    if (!props.visible) return;
    if (props.initialVal) {
      getShopDetail({ storeId: props.initialVal.storeId }).then((res) => {
        form.setFieldsValue(res.data);
        setTablelist(res.data.employeeList);
        setCompanyid(res.data.companyId);
      });
    } else {
      form.resetFields();
    }
  }, [props.initialVal, form, props.visible]);
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={handleOk}
      confirmLoading={props.confirmLoading}
      width={1000}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Descriptions title="??????????????????" column={{ md: 2, sm: 2, xs: 1 }}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="storeName"
                label={'????????????'}
                rules={[
                  {
                    required: true,
                    message: '?????????????????????',
                  },
                  {
                    max: 20,
                    message: '??????????????????20?????????',
                  },
                  {
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                    message: '????????????????????????????????????',
                  },
                ]}
              >
                <Input placeholder="?????????" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={'????????????'}>
                <Input disabled value="???????????????" />
              </Form.Item>
            </Col>
          </Row>
        </Descriptions>
        <Row>
          <Col span={12}>
            <Form.Item
              name="address"
              label={'????????????'}
              rules={[
                {
                  required: true,
                  message: '?????????????????????',
                },
                {
                  max: 50,
                  message: '??????????????????50?????????',
                },
                {
                  pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                  message: '????????????????????????????????????',
                },
              ]}
            >
              <Input placeholder="?????????" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="companyName"
              label={'????????????'}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (compName === value || compName.length < 1) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('?????????????????????'));
                  },
                }),
              ]}
            >
              <AutoComplete
                value={''}
                options={options}
                placeholder="?????????"
                onChange={onChange}
                onSelect={onSelect}
              />
            </Form.Item>
          </Col>
        </Row>
        <Descriptions title="?????????????????????" column={{ md: 2, sm: 2, xs: 1 }}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="ownerName"
                label={'??????'}
                rules={[
                  {
                    required: true,
                    message: '???????????????',
                  },
                  {
                    max: 20,
                    message: '??????????????????20?????????',
                  },
                ]}
              >
                <Input placeholder="?????????" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ownerTel"
                label={'????????????'}
                rules={[
                  {
                    required: true,
                    message: '?????????????????????',
                  },
                  {
                    max: 11,
                    message: '??????????????????11?????????',
                  },
                  {
                    pattern: /^\d+$|^\d+[.]?\d+$/,
                    message: '???????????????',
                  },
                ]}
              >
                <Input placeholder="?????????" />
              </Form.Item>
            </Col>
          </Row>
        </Descriptions>
        <Descriptions title="????????????" column={{ md: 2, sm: 2, xs: 1 }}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="idCard"
                label={'???????????????'}
                rules={[
                  {
                    required: true,
                    message: '????????????????????????',
                  },
                  {
                    pattern: /^[A-Za-z0-9_]+$/,
                    message: '????????????????????????',
                  },
                  {
                    max: 18,
                    message: '??????????????????18?????????',
                  },
                  {
                    min: 15,
                    message: '?????????15?????????',
                  },
                ]}
              >
                <Input placeholder="?????????" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="socialCreditCode"
                label={'????????????????????????'}
                rules={[
                  {
                    required: true,
                    message: '?????????????????????????????????',
                  },
                  {
                    pattern: /^[a-z0-9]{18}$/,
                    message: '?????????18????????????????????????',
                  },
                ]}
              >
                <Input placeholder="?????????" />
              </Form.Item>
            </Col>
          </Row>
        </Descriptions>
        <Row>
          <Col span={6}>
            <Form.Item
              name="idCardFront"
              label={'?????????????????????'}
              rules={[{ required: true }]}
            >
              <FFormItemUpload
                uploadState={{
                  listType: 'picture-card',
                  maxCount: 1,
                  beforeUpload: (file) => {
                    const isJpgOrPng =
                      file.type === 'image/jpeg' ||
                      file.type === 'image/png' ||
                      file.type === 'image/gif';
                    if (!isJpgOrPng) {
                      message.error('????????????jpg,png,gif??????');
                    }
                    return isJpgOrPng;
                  },
                }}
                customizeReturn={(val) => {
                  return val?.path || val;
                }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="idCardBack"
              label={'?????????????????????'}
              rules={[{ required: true }]}
            >
              <FFormItemUpload
                uploadState={{
                  listType: 'picture-card',
                  maxCount: 1,
                  beforeUpload: (file) => {
                    const isJpgOrPng =
                      file.type === 'image/jpeg' ||
                      file.type === 'image/png' ||
                      file.type === 'image/gif';
                    if (!isJpgOrPng) {
                      message.error('????????????jpg,png,gif??????');
                    }
                    return isJpgOrPng;
                  },
                }}
                customizeReturn={(val) => {
                  return val?.path || val;
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="businessLicense"
              label={'??????????????????'}
              rules={[{ required: true }]}
            >
              <FFormItemUpload
                uploadState={{
                  listType: 'picture-card',
                  maxCount: 1,
                  beforeUpload: (file) => {
                    const isJpgOrPng =
                      file.type === 'image/jpeg' ||
                      file.type === 'image/png' ||
                      file.type === 'image/gif';
                    if (!isJpgOrPng) {
                      message.error('????????????jpg,png??????');
                    }
                    return isJpgOrPng;
                  },
                }}
                customizeReturn={(val) => {
                  return val?.path || val;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Descriptions title="??????????????????" column={{ md: 2, sm: 2, xs: 1 }}>
          <Row>
            <Col span={24}>
              <Table
                dataSource={tablelist}
                columns={[
                  {
                    title: '??????',
                    dataIndex: 'realName',
                  },
                  {
                    title: '??????',
                    dataIndex: 'role',
                  },
                  {
                    title: '????????????',
                    dataIndex: 'tel',
                  },
                ]}
              />
            </Col>
          </Row>
        </Descriptions>
      </Form>
    </Modal>
  );
};

export default AddForm;
