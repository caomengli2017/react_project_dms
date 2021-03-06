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
        <Descriptions title="店铺基本信息" column={{ md: 2, sm: 2, xs: 1 }}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="storeName"
                label={'店铺名称'}
                rules={[
                  {
                    required: true,
                    message: '请输入店铺名称',
                  },
                  {
                    max: 20,
                    message: '最多不能超过20个字符',
                  },
                  {
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                    message: '只能输入汉字，字母，数字',
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={'店铺类型'}>
                <Input disabled value="品牌直营店" />
              </Form.Item>
            </Col>
          </Row>
        </Descriptions>
        <Row>
          <Col span={12}>
            <Form.Item
              name="address"
              label={'联系地址'}
              rules={[
                {
                  required: true,
                  message: '请输入联系地址',
                },
                {
                  max: 50,
                  message: '最多不能超过50个字符',
                },
                {
                  pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                  message: '只能输入汉字，字母，数字',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="companyName"
              label={'直属上级'}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (compName === value || compName.length < 1) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('请选择直属上级'));
                  },
                }),
              ]}
            >
              <AutoComplete
                value={''}
                options={options}
                placeholder="请输入"
                onChange={onChange}
                onSelect={onSelect}
              />
            </Form.Item>
          </Col>
        </Row>
        <Descriptions title="店铺所有人信息" column={{ md: 2, sm: 2, xs: 1 }}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="ownerName"
                label={'姓名'}
                rules={[
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                  {
                    max: 20,
                    message: '最多不能超过20个字符',
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ownerTel"
                label={'联系方式'}
                rules={[
                  {
                    required: true,
                    message: '请输入联系方式',
                  },
                  {
                    max: 11,
                    message: '最多不能超过11个字符',
                  },
                  {
                    pattern: /^\d+$|^\d+[.]?\d+$/,
                    message: '只能是数字',
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
        </Descriptions>
        <Descriptions title="证件信息" column={{ md: 2, sm: 2, xs: 1 }}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="idCard"
                label={'身份证号码'}
                rules={[
                  {
                    required: true,
                    message: '请输入身份证号码',
                  },
                  {
                    pattern: /^[A-Za-z0-9_]+$/,
                    message: '请输入字母或数字',
                  },
                  {
                    max: 18,
                    message: '最多不能超过18个字符',
                  },
                  {
                    min: 15,
                    message: '不少于15个字符',
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="socialCreditCode"
                label={'社会统一信用代码'}
                rules={[
                  {
                    required: true,
                    message: '请输入社会统一信用代码',
                  },
                  {
                    pattern: /^[a-z0-9]{18}$/,
                    message: '请输入18位字母或数字组合',
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
        </Descriptions>
        <Row>
          <Col span={6}>
            <Form.Item
              name="idCardFront"
              label={'身份证照片正面'}
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
                      message.error('只能上传jpg,png,gif格式');
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
              label={'身份证照片反面'}
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
                      message.error('只能上传jpg,png,gif格式');
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
              label={'营业执照照片'}
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
                      message.error('只能上传jpg,png格式');
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
        <Descriptions title="店铺人员信息" column={{ md: 2, sm: 2, xs: 1 }}>
          <Row>
            <Col span={24}>
              <Table
                dataSource={tablelist}
                columns={[
                  {
                    title: '姓名',
                    dataIndex: 'realName',
                  },
                  {
                    title: '角色',
                    dataIndex: 'role',
                  },
                  {
                    title: '联系方式',
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
