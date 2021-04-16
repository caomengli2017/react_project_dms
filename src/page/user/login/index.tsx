import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import './index.less';
import intl from 'react-intl-universal';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '@src/redux/actions/user';
import { IRootState } from '../../../redux/reducers/index';
import { useHistory } from 'react-router-dom';

const PREFIX = 'login';

const LoginPage = () => {
  const { loading, login } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values: any) => {
    const { username, password } = values;
    dispatch(getUserData({ username, password }));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (login) {
      history.push('/');
    }
  }, [login, history]);
  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-content`}>
        <Row align="middle" justify="center">
          <Col>
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt=""
            />
          </Col>
          <Col>
            <h1>{intl.get('platform_name')}</h1>
          </Col>
        </Row>
        <Row className={`${PREFIX}-description`} justify="center">
          {intl.get('platform_slogan')}
        </Row>
        <Form
          size="large"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: intl.get('rule_username') }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={intl.get('account')}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: intl.get('rule_password') }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={intl.get('password')}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{intl.get('remember_me')}</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} block type="primary" htmlType="submit">
              {intl.get('login')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
