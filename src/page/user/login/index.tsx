import { Button, Card, Checkbox, Form, Input } from 'antd';
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
        <Card title={intl.get('platform_name')}>
          <Form
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
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: intl.get('rule_password') }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
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
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
