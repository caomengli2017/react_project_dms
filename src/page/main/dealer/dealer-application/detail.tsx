import fallback from '@src/assets/img/base64/fallback';
import {
  Button,
  Col,
  Descriptions,
  Input,
  Modal,
  ModalProps,
  Row,
  Image,
  Form,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DealerApplicationListModal } from '@src/types/model/dealer';
import { dealerAudit, getDealerApplicationDetail } from '@src/apis/main/dealer';
const { confirm } = Modal;

/*
 *@author: caomengli
 *@desc 经销商审核详情
 *@Date: 2021-05-08 10:37:10
 */

interface IdetailPageProps extends ModalProps {
  detailData?: DealerApplicationListModal;
  onCloseDetail: () => void;
}
interface IRejectModalProps extends ModalProps {
  onClose: (params: any) => void;
}

// 拒绝原因弹窗
const RejectReasonModal = (props: IRejectModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!props.visible) return;
    form.resetFields();
  }, [props.visible, form]);

  const handleOk = () => {
    form.validateFields().then((val) => {
      props.onClose(val);
    });
  };
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={handleOk}
      maskClosable={false}
    >
      <Form form={form}>
        <Form.Item
          name="failedReason"
          rules={[{ required: true, message: '请填写拒绝原因' }]}
        >
          <Input.TextArea rows={4} placeholder="请填写拒绝原因..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const DetailPage = (props: IdetailPageProps) => {
  const [visible, setvisible] = useState(false); // 是否展示拒绝原因弹窗
  const [showTips, setShowTips] = useState(false); // 是否展示错误提示

  // 详情页初始信息
  const initState = {
    applicationId: 1,
    createdAt: '',
    companyName: '',
    agentLevel: '',
    parentAgentCompanyName: '',
    realName: '',
    tel: '',
    address: '',
    status: 1,
    statusName: '',
    failedReason: '',
    idCard: '',
    socialCreditCode: '',
    idCardFront: '',
    idCardBack: '',
    businessLicense: '',
    accountBank: '',
    account: '',
    bankCardNumber: '',
    bankCard: '',
  };
  const [state, setState] = useState(initState);
  const [password, setPasswold] = useState('');
  useEffect(() => {
    if (props.detailData) {
      getDealerApplicationDetail({ applicationId: props.detailData.id }).then(
        (res) => {
          if (res.data?.status === 1) {
            res.data.statusName = '待审核';
          } else if (res.data?.status === 2) {
            res.data.statusName = '审核通过';
          } else if (res.data?.status === 3) {
            res.data.statusName = '审核拒绝';
          }
          setState(res.data);
        }
      );

      // 清空密码输入框
      setPasswold('');
      setShowTips(false);
    }
  }, [props.detailData]);

  // 确认审核通过弹窗
  const showPassConfirm = (applicationId: number) => {
    if (showTips) return;
    confirm({
      title: '确认审核通过么？',
      content: '请确认信息正确，通过后不可修改',
      icon: <ExclamationCircleOutlined />,
      okText: intl.get('confirm'),
      cancelText: intl.get('cancel'),
      onOk() {
        return new Promise((resolve, reject) => {
          dealerAudit({ applicationId, state: 2, password })
            .then(() => {
              props.onCloseDetail();
              message.success(intl.get('operatingOk'));
              resolve(null);
            })
            .catch(() => {
              reject(null);
            });
        });
      },
      onCancel() {},
    });
  };

  // 确认审核拒绝弹窗
  const showRejectConfirm = (params: any) => {
    confirm({
      title: '确认审核拒绝么？',
      content: '请确认是否拒绝，拒绝后申请者需再次提交',
      icon: <ExclamationCircleOutlined />,
      okText: intl.get('confirm'),
      cancelText: intl.get('cancel'),
      onOk() {
        return new Promise((resolve, reject) => {
          dealerAudit({
            applicationId: state.applicationId,
            state: 3,
            ...params,
          })
            .then(() => {
              // 关闭详情弹窗
              props.onCloseDetail();

              // 关闭拒绝原因弹窗
              setvisible(false);

              message.success(intl.get('operatingOk'));
              resolve(null);
            })
            .catch(() => {
              reject(null);
            });
        });
      },
      onCancel() {},
    });
  };

  const onShowRejectConfirm = (params: any) => {
    showRejectConfirm(params);
  };

  // 修改密码
  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
    setPasswold(value);
    if (value && !reg.test(value)) {
      setShowTips(true);
    } else {
      setShowTips(false);
    }
  };

  return (
    <div>
      <Modal
        title={props.title}
        visible={props.visible}
        onCancel={props.onCancel}
        maskClosable={false}
        width={1000}
        footer={null}
      >
        <Descriptions title="基本信息" column={{ md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item
            label="申请时间"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.createdAt}
          </Descriptions.Item>
          <Descriptions.Item
            label="代理商名称"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.companyName}
          </Descriptions.Item>
          <Descriptions.Item
            label="代理商层级"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.agentLevel}
          </Descriptions.Item>
          <Descriptions.Item
            label="上级代理商名称"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.parentAgentCompanyName}
          </Descriptions.Item>
          <Descriptions.Item label="姓名" labelStyle={{ fontWeight: 'bold' }}>
            {state.realName}
          </Descriptions.Item>
          <Descriptions.Item
            label="联系方式"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.tel}
          </Descriptions.Item>
          <Descriptions.Item
            label="联系地址"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.address}
          </Descriptions.Item>
          <Descriptions.Item
            label="审核状态"
            labelStyle={{ fontWeight: 'bold' }}
            contentStyle={
              state.status === 3 ? { color: '#FF4D4F' } : { color: '#1890FF' }
            }
          >
            {state.statusName}
          </Descriptions.Item>
          {state.status === 3 && (
            <Descriptions.Item
              label="拒绝原因"
              labelStyle={{ fontWeight: 'bold' }}
            >
              {state.failedReason}
            </Descriptions.Item>
          )}
        </Descriptions>
        <Descriptions
          title="证件信息"
          column={{ md: 2, sm: 2, xs: 1 }}
          layout="vertical"
        >
          <Descriptions.Item
            label="身份证号码"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.idCard}
          </Descriptions.Item>
          <Descriptions.Item
            label="社会统一信用代码"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.socialCreditCode}
          </Descriptions.Item>
          <Descriptions.Item
            label="身份证照片"
            labelStyle={{ fontWeight: 'bold' }}
          >
            <Row gutter={16}>
              <Col>
                <Image
                  width={192}
                  height={130}
                  src={state.idCardFront}
                  fallback={fallback}
                />
              </Col>
              <Col>
                <Image
                  width={192}
                  height={130}
                  src={state.idCardBack}
                  fallback={fallback}
                />
              </Col>
            </Row>
          </Descriptions.Item>
          <Descriptions.Item
            label="营业执照照片"
            labelStyle={{ fontWeight: 'bold' }}
          >
            <Image
              width={192}
              height={130}
              src={state.businessLicense}
              fallback={fallback}
            />
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          title="银行卡信息"
          column={{ md: 2, sm: 2, xs: 1 }}
          layout="vertical"
        >
          <Descriptions.Item
            label="账户名称"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.account}
          </Descriptions.Item>
          <Descriptions.Item
            label="银行卡号"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {state.bankCardNumber}
          </Descriptions.Item>
          <Descriptions.Item label="开户行" labelStyle={{ fontWeight: 'bold' }}>
            {state.accountBank}
          </Descriptions.Item>
          <Descriptions.Item
            label="银行卡正面照片"
            labelStyle={{ fontWeight: 'bold' }}
          >
            <Image
              width={192}
              height={130}
              src={state.bankCard}
              fallback={fallback}
            />
          </Descriptions.Item>
        </Descriptions>
        {state.status === 1 && (
          <>
            <Descriptions
              title="分销APP账号设置"
              column={{ md: 2, sm: 2, xs: 1 }}
            >
              <Descriptions.Item
                label="账号"
                labelStyle={{ fontWeight: 'bold' }}
              >
                {state.tel}
              </Descriptions.Item>
              <Descriptions.Item
                label="密码"
                labelStyle={{ fontWeight: 'bold' }}
              >
                <div style={{ flex: 1 }}>
                  <Input
                    value={password}
                    onChange={handleChange}
                    placeholder="a88888888为初始密码可修改"
                  />
                  {showTips && (
                    <p className="tips-error" style={{ color: '#ff4d4f' }}>
                      密码需为6-10位字母加数字的组合
                    </p>
                  )}
                </div>
              </Descriptions.Item>
            </Descriptions>
            <Row justify="center" gutter={12}>
              <Col style={{ width: 205 }}>
                <Button
                  type="primary"
                  block
                  size="large"
                  danger
                  onClick={() => setvisible(true)}
                >
                  审核拒绝
                </Button>
              </Col>
              <Col style={{ width: 205 }}>
                <Button
                  type="primary"
                  block
                  size="large"
                  className="green-button"
                  onClick={() => showPassConfirm(state.applicationId)}
                >
                  审核通过
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Modal>
      <RejectReasonModal
        title="请填写拒绝原因"
        visible={visible}
        onCancel={() => setvisible(false)}
        onClose={(reason) => onShowRejectConfirm(reason)}
      />
    </div>
  );
};
export default DetailPage;
