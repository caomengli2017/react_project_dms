import {
  Form,
  Input,
  Modal,
  ModalProps,
  Select,
  Row,
  Col,
  Descriptions,
  AutoComplete,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getCompanyList } from '@src/apis/main/shop';
import { getDealerDetail, getSublevellist } from '@src/apis/main/dealer';
import { FFormItemUpload } from '@src/component';
import { Store, SubAgent } from '@src/types/model/dealer';
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
type ISublevellist = {
  name: string;
  level: number;
};
const AddForm = (props: IAddFormProps) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((val) => {
      if (props.initialVal) {
        props.onCreate({
          ...val,
          parentAgentId: compId,
          companyId: props.initialVal.companyId,
        });
        form.resetFields();
      } else {
        props.onCreate({ ...val, parentAgentId: compId });
      }
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
  const getTelNumber = (value: any) => {
    setTelnumber(value.target.defaultValue);
  };

  const [options, setOptions] = useState([]);
  const [tablelist, setTablelist] = useState(false);
  const [compId, setCompanyid] = useState(0);
  const [compName, setCompanyName] = useState('');
  const [subAgentData, setSubagentdata] = useState<SubAgent[]>();
  const [storesData, setStoresdata] = useState<Store[]>();
  const [telnumber, setTelnumber] = useState('');
  const [sublevellist, setSublevellist] = useState<Array<ISublevellist>>();

  useEffect(() => {
    getSublevellist().then((res) => {
      setSublevellist(res.data);
    });
    if (!props.visible) return;
    if (props.initialVal) {
      setTablelist(true);
      getDealerDetail({ companyId: props.initialVal.companyId }).then((res) => {
        form.setFieldsValue(res.data);
        setSubagentdata(res.data.subAgent);
        setStoresdata(res.data.stores);
        setTelnumber(res.data.tel);
        setCompanyid(res.data.parentAgentId);
      });
    } else {
      setTablelist(false);
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
    >
      <Form
        layout="vertical"
        form={form}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Descriptions title="基本信息" column={{ md: 2, sm: 2, xs: 1 }}>
          {tablelist && (
            <Row>
              <Col span={12}>
                <Form.Item label={'状态'}>
                  <Input disabled value="营业中" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="joinTime" label={'加入时间'}>
                  <Input readOnly placeholder="请输入" />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Descriptions>
        <Row>
          <Col span={12}>
            <Form.Item
              name="name"
              label={'代理商名称'}
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="agentLevel"
              label={'代理商层级'}
              rules={[{ required: true }]}
            >
              <Select placeholder="请选择代理商层级">
                {sublevellist?.map((item, index) => (
                  <Option value={item.level} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="managerName"
              label={'姓名'}
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="parentAgentName"
              label={'上级代理商'}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (compName === value || compName.length < 1) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('请选择上级代理商'));
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
        <Row>
          <Col span={12}>
            <Form.Item
              name="tel"
              label={'联系方式'}
              rules={[{ required: true }]}
            >
              <Input onBlur={getTelNumber} placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label={'联系地址'}
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
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
                customizeReturn={(val) => {
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
                customizeReturn={(val) => {
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
                customizeReturn={(val) => {
                  return val.path;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        {tablelist && (
          <Descriptions title="下属代理商信息" column={{ md: 2, sm: 2, xs: 1 }}>
            <Row>
              <Col span={12}>
                <Form.Item label={'下级代理商总数'}>
                  <div>{subAgentData?.length}</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'下级代理商详情'}>
                  <div>
                    {subAgentData?.map((i, index) => (
                      <Tag key={index}>{i.name}</Tag>
                    ))}
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Descriptions>
        )}
        {tablelist && (
          <Descriptions title="直营店铺信息" column={{ md: 2, sm: 2, xs: 1 }}>
            <Row>
              <Col span={12}>
                <Form.Item label={'下级代理商总数'}>
                  <div>{storesData?.length}</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'下级代理商详情'}>
                  <div>
                    {storesData?.map((i) => (
                      <Tag key={i.storeId}>{i.storeName}</Tag>
                    ))}
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Descriptions>
        )}
        {telnumber !== '' && (
          <Descriptions
            title="封销app账号信息"
            column={{ md: 2, sm: 2, xs: 1 }}
          >
            <Row>
              <Col span={12}>
                <Form.Item label={'账号'}>
                  <div>{telnumber}</div>
                  <span style={{ color: '#999', fontSize: '12px' }}>
                    修改了联系人方式后,登录账号将采用新的联系人方式
                  </span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label={'密码'}
                  rules={[{ required: tablelist ? false : true }]}
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
            </Row>
          </Descriptions>
        )}
      </Form>
    </Modal>
  );
};

export default AddForm;
