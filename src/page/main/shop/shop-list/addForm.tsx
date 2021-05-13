import {
  Form,
  Input,
  Modal,
  ModalProps,
  Select,
  Row,
  Col,
  Descriptions,
  Table,
  AutoComplete,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getShopDetail, getCompanyList } from '@src/apis/main/shop';
import { BrandListModal } from '@src/types/model/goods';
import { FFormItemUpload } from '@src/component';
import { FTableView } from '@src/component';

const { Option } = Select;

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
      console.log(172391);
      console.log(compId);
      props.onCreate({ ...val, companyId: compId });
    });
  };
  const onChange = (data: any) => {
    console.log('onChange', data);
    getCompanyList({ companyName: data }).then((res) => {
      res.data.list.forEach((i: any) => {
        i.value = i.name;
      });
      console.log(res.data.list);
      const newOption = res.data.list.map((e: any) => ({
        label: e.name,
        value: e.name,
        key: e.companyId,
      }));
      setOptions(newOption);
    });
  };
  const onSelect = (data: any) => {
    console.log('onSelect', data);
  };
  const [options, setOptions] = useState([]);
  const [tablelist, setTablelist] = useState([]);
  const [compId, setCompanyid] = useState('');
  useEffect(() => {
    if (props.initialVal) {
      getShopDetail({ storeId: props.initialVal.storeId }).then((res) => {
        console.log(props.initialVal);
        console.log(res.data);
        form.setFieldsValue(res.data);
        setTablelist(res.data.employeeList);
        setCompanyid(res.data.companyId);
      });
    } else {
      form.resetFields();
    }
  }, [props.initialVal, form]);
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={handleOk}
      confirmLoading={props.confirmLoading}
      width={1000}
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
                rules={[{ required: true }]}
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
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="companyName"
              label={'直属上级'}
              rules={[{ required: true }]}
            >
              <AutoComplete
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
                rules={[{ required: true }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ownerTel"
                label={'联系方式'}
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="socialCreditCode"
                label={'社会统一信用代码'}
                rules={[{ required: true }]}
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
                uploadState={{ listType: 'picture-card', maxCount: 1 }}
                customReturnData={(val) => {
                  return val.path;
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
                uploadState={{ listType: 'picture-card', maxCount: 1 }}
                customReturnData={(val) => {
                  return val.path;
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
                uploadState={{ listType: 'picture-card', maxCount: 1 }}
                customReturnData={(val) => {
                  return val.path;
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
