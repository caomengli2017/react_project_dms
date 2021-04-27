import { getUserData } from '@src/redux/actions/user';
import { IRootState } from '@src/redux/reducers';
import { Alert, Form, Input, Checkbox, Button } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { useLocalStorage } from './hook';

const PasswordView = () => {
  const { loading, error } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const [account, setAccount, removeAccount] = useLocalStorage('USER_ACCOUNT');

  const onFinish = (values: any) => {
    const { account, password, remember } = values;
    if (remember) {
      setAccount(account);
    } else {
      removeAccount();
    }
    dispatch(getUserData({ account, password }));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      {error && (
        <Alert
          style={{ marginBottom: 24 }}
          message={error.msg}
          type="error"
          closable
        />
      )}
      <Form
        size="large"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="account"
          initialValue={account}
          rules={[{ required: true, message: intl.get('rule_username') }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#1890FF' }} />}
            placeholder={intl.get('username')}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: intl.get('rule_password') }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#1890FF' }} />}
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
  );
};

export default PasswordView;
