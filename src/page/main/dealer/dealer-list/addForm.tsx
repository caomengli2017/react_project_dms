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
        <Descriptions title="基本信息" column={{ md: 2, sm: 2, xs: 1 }}>
          {tablelist && (
            <Row>
              <Col span={12}>
                <Form.Item label="状态">
                  <Input disabled value="营业中" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="joinTime" label={'加入时间'}>
                  <Input disabled placeholder="请输入" />
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
              rules={[
                {
                  required: true,
                  message: '请输入代理商名称',
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
            <Form.Item
              name="agentLevel"
              label={'代理商层级'}
              rules={[{ required: true }]}
            >
              <Select disabled={tablelist} placeholder="请选择代理商层级">
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
                disabled={tablelist}
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
              <Input onBlur={getTelNumber} placeholder="请输入" />
            </Form.Item>
          </Col>
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
        </Row>
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
                  return val.path;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Descriptions title="银行卡信息" column={{ md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item style={{ paddingBottom: 0 }}>
            <Form.Item
              name="account"
              label="账户名称"
              rules={[
                {
                  required: true,
                  message: '请输入账户名称',
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
              style={{ width: '100%' }}
            >
              <Input placeholder="请输入" disabled={tablelist} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item style={{ paddingBottom: 0 }}>
            <Form.Item
              name="bankCardNumber"
              label="银行卡号"
              rules={[
                {
                  required: true,
                  message: '请输入银行卡号',
                },
                {
                  pattern: /^\d{1,19}$/,
                  message: '请输入正确的银行卡号',
                },
              ]}
              style={{ width: '100%' }}
            >
              <Input placeholder="请输入" disabled={tablelist} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item style={{ paddingBottom: 0 }}>
            <Form.Item
              name="accountBankId"
              label="开户行"
              rules={[{ required: true }]}
              style={{ width: '100%' }}
            >
              <Select disabled={tablelist} placeholder="请选择开户行">
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
              label="银行卡正面照片"
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
                      message.error('只能上传jpg,png格式');
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
            title="分销app账号信息"
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
                  rules={[
                    { required: tablelist ? false : true },
                    {
                      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,
                      message: '请输入6-10位字母或数字组合',
                    },
                  ]}
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
