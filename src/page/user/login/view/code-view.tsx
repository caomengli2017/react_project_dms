import { getUserData } from '@src/redux/actions/user';
import { IRootState } from '@src/redux/reducers';
import { Alert, Form, Input, Checkbox, Button, Row, Col, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { MobileTwoTone, MailTwoTone } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { useCountDown } from 'ahooks';
import { getLoginCode } from '@src/apis/system/user';
import { useRef, useState } from 'react';
import { useLocalStorage } from './hook';

const CodeView = () => {
  const { loading, error } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const [countdown, setTarget] = useCountDown();
  const [codeLoading, setCodeLoading] = useState(false);
  const [form] = Form.useForm();
  const [tel, setTel, removeTel] = useLocalStorage('USER_TEL');
  const firstCode = useRef(true);
  const [codeError, setCodeError] = useState<string>();
  const onFinish = (values: any) => {
    const { account, verifyCode, remember } = values;
    if (remember) {
      setTel(account);
    } else {
      removeTel();
    }
    dispatch(getUserData({ account, verifyCode }));
  };

  const getCode = () => {
    if (countdown === 0) {
      firstCode.current = false;
      form.validateFields(['account']).then((val) => {
        setCodeLoading(true);
        getLoginCode(val.account)
          .then(() => {
            message.success(intl.get('code_send'));
            setCodeError(undefined);
            setTarget(Date.now() + 60 * 1000);
          })
          .catch((err) => {
            setCodeError(err.msg);
          })
          .finally(() => {
            setCodeLoading(false);
          });
      });
    }
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
      {codeError && (
        <Alert
          style={{ marginBottom: 24 }}
          message={codeError}
          type="error"
          closable
          onClose={() => {
            setCodeError(undefined);
          }}
        />
      )}
      <Form
        size="large"
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              pattern: /^1[3456789]\d{9}$/,
              message: intl.get('rule_tel'),
            },
          ]}
          initialValue={tel}
        >
          <Input
            maxLength={11}
            prefix={<MobileTwoTone />}
            placeholder={intl.get('placeholder', { name: intl.get('tel') })}
          />
        </Form.Item>
        <Row gutter={8} wrap={false} justify="space-between">
          <Col flex="auto">
            <Form.Item
              name="verifyCode"
              rules={[
                {
                  required: true,
                  message: intl.get('placeholder', {
                    name: intl.get('veri_code'),
                  }),
                },
              ]}
            >
              <Input
                prefix={<MailTwoTone />}
                placeholder={intl.get('placeholder', {
                  name: intl.get('veri_code'),
                })}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              loading={codeLoading}
              disabled={countdown !== 0}
              onClick={getCode}
            >
              {countdown === 0
                ? firstCode.current
                  ? '???????????????'
                  : '?????????????????????'
                : `${Math.round(countdown / 1000)} ??????????????????`}
            </Button>
          </Col>
        </Row>

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

export default CodeView;
