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
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getCompanyList } from '@src/apis/main/shop';
import { getDealerDetail, getSublevellist } from '@src/apis/main/dealer';
import { FFormItemUpload } from '@src/component';
import { Store, SubAgent } from '@src/types/model/dealer';
import { getBankList } from '@src/apis/system/common';
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
interface IBankList {
  accountBankId: number;
  bank: string;
}
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
        // form.resetFields();
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
  const [bankList, setBankList] = useState<IBankList[]>([]);

  useEffect(() => {
    Promise.all(
      [getSublevellist(), getBankList()].map((promise) =>
        promise.catch((err) => err)
      )
    ).then((res) => {
      setSublevellist(res?.[0]?.data);
      setBankList(res?.[1]?.data?.list);
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
      setTelnumber('');
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
        <Descriptions title="????????????" column={{ md: 2, sm: 2, xs: 1 }}>
          {tablelist && (
            <Row>
              <Col span={12}>
                <Form.Item label="??????">
                  <Input disabled value="?????????" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="joinTime" label={'????????????'}>
                  <Input disabled placeholder="?????????" />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Descriptions>
        <Row>
          <Col span={12}>
            <Form.Item
              name="name"
              label={'???????????????'}
              rules={[
                {
                  required: true,
                  message: '????????????????????????',
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
            <Form.Item
              name="agentLevel"
              label={'???????????????'}
              rules={[{ required: true }]}
            >
              <Select disabled={tablelist} placeholder="????????????????????????">
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
              name="parentAgentName"
              label={'???????????????'}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (compName === value || compName.length < 1) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('????????????????????????'));
                  },
                }),
              ]}
            >
              <AutoComplete
                value={''}
                disabled={tablelist}
                options={options}
                placeholder="?????????"
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
              <Input onBlur={getTelNumber} placeholder="?????????" />
            </Form.Item>
          </Col>
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
        </Row>
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
                  return val.path;
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
                      message.error('????????????jpg,png??????');
                    }
                    return isJpgOrPng;
                  },
                }}
                customizeReturn={(val) => {
                  return val.path;
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
                  return val.path;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Descriptions title="???????????????" column={{ md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item style={{ paddingBottom: 0 }}>
            <Form.Item
              name="account"
              label="????????????"
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
              style={{ width: '100%' }}
            >
              <Input placeholder="?????????" disabled={tablelist} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item style={{ paddingBottom: 0 }}>
            <Form.Item
              name="bankCardNumber"
              label="????????????"
              rules={[
                {
                  required: true,
                  message: '?????????????????????',
                },
                {
                  pattern: /^\d{1,19}$/,
                  message: '??????????????????????????????',
                },
              ]}
              style={{ width: '100%' }}
            >
              <Input placeholder="?????????" disabled={tablelist} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item style={{ paddingBottom: 0 }}>
            <Form.Item
              name="accountBankId"
              label="?????????"
              rules={[{ required: true }]}
              style={{ width: '100%' }}
            >
              <Select disabled={tablelist} placeholder="??????????????????">
                {bankList?.map((item, index) => (
                  <Option value={item.accountBankId} key={index}>
                    {item.bank}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item style={{ paddingBottom: 0 }}>
            <Form.Item
              name="bankCard"
              label="?????????????????????"
              rules={[{ required: true }]}
              style={{ width: '100%' }}
            >
              <FFormItemUpload
                uploadState={{
                  disabled: tablelist ? true : false,
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
                  return val.path;
                }}
              />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>

        {tablelist && (
          <Descriptions title="?????????????????????" column={{ md: 2, sm: 2, xs: 1 }}>
            <Row>
              <Col span={12}>
                <Form.Item label={'?????????????????????'}>
                  <div>{subAgentData?.length}</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'?????????????????????'}>
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
          <Descriptions title="??????????????????" column={{ md: 2, sm: 2, xs: 1 }}>
            <Row>
              <Col span={12}>
                <Form.Item label={'?????????????????????'}>
                  <div>{storesData?.length}</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'?????????????????????'}>
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
            title="??????app????????????"
            column={{ md: 2, sm: 2, xs: 1 }}
          >
            <Row>
              <Col span={12}>
                <Form.Item label={'??????'}>
                  <div>{telnumber}</div>
                  <span style={{ color: '#999', fontSize: '12px' }}>
                    ???????????????????????????,??????????????????????????????????????????
                  </span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label={'??????'}
                  rules={[
                    { required: tablelist ? false : true },
                    {
                      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,
                      message: '?????????6-10????????????????????????',
                    },
                  ]}
                >
                  <Input placeholder="?????????" />
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
