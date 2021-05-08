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
} from 'antd';
import React, { useState } from 'react';
import intl from 'react-intl-universal';
import './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { TextArea } = Input;
const PREFIX = 'dealer-audit';

/*
 *@author: caomengli
 *@desc 经销商审核详情
 *@Date: 2021-05-08 10:37:10
 */

interface DetailPageProps extends ModalProps {}

// 拒绝原因弹框
const RejectReasonModal = (props: DetailPageProps) => {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={false}
    >
      <TextArea rows={4} placeholder="请填写拒绝的原因..." />
    </Modal>
  );
};

const DetailPage = (props: DetailPageProps) => {
  const [visible, setvisible] = useState(false);
  const showPassConfirm = (id: number) => {
    confirm({
      title: '确认审核通过么？',
      content: '请确认信息正确，通过后不可修改',
      icon: <ExclamationCircleOutlined />,
      okText: intl.get('confirm'),
      cancelText: intl.get('cancel'),
      onOk() {},
      onCancel() {},
    });
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
          <Descriptions.Item label="申请时间">
            2021-03-23 12:23
          </Descriptions.Item>
          <Descriptions.Item label="代理商名称">爱奇迹</Descriptions.Item>
          <Descriptions.Item label="代理商层级">二级</Descriptions.Item>
          <Descriptions.Item label="上级代理商名称">柏为电子</Descriptions.Item>
          <Descriptions.Item label="姓名">张三</Descriptions.Item>
          <Descriptions.Item label="联系方式">15899999999</Descriptions.Item>
          <Descriptions.Item
            label="审核状态"
            contentStyle={true ? { color: '#FF4D4F' } : { color: '#1890FF' }}
          >
            审核拒绝
          </Descriptions.Item>
          <Descriptions.Item label="拒绝原因">
            身份证人员与营业执照使用者不是同一人员
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          title="证件信息"
          column={{ md: 2, sm: 2, xs: 1 }}
          layout="vertical"
        >
          <Descriptions.Item label="身份证号码">
            808089798888888
          </Descriptions.Item>
          <Descriptions.Item label="社会统一信用代码">
            808089798888888
          </Descriptions.Item>
          <Descriptions.Item label="身份证照片">
            <Row gutter={16}>
              <Col>
                <Image
                  width={192}
                  height={130}
                  src="error"
                  fallback={fallback}
                />
              </Col>
              <Col>
                <Image
                  width={192}
                  height={130}
                  src="error"
                  fallback={fallback}
                />
              </Col>
            </Row>
          </Descriptions.Item>
          <Descriptions.Item label="营业执照照片">
            <Image width={192} height={130} src="error" fallback={fallback} />
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="分销APP账号设置" column={{ md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item label="账号">15800000000</Descriptions.Item>
          <Descriptions.Item label="密码">
            <Row>
              <Input value={88888} />
              <p className={`${PREFIX}-tips`}>888888为初始密码可修改</p>
            </Row>
          </Descriptions.Item>
        </Descriptions>
        <Row justify="center" gutter={12}>
          <Col className={`${PREFIX}-footer`}>
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
          <Col className={`${PREFIX}-footer`}>
            <Button
              type="primary"
              block
              size="large"
              className="green-button"
              onClick={() => showPassConfirm(1)}
            >
              审核通过
            </Button>
          </Col>
        </Row>
      </Modal>
      <RejectReasonModal
        title="请填写拒绝原因"
        visible={visible}
        onCancel={() => setvisible(false)}
      />
    </div>
  );
};
export default DetailPage;
