import { Row, Col, Tabs } from 'antd';

import './index.less';
import intl from 'react-intl-universal';
import PasswordView from './view/password-view';
import CodeView from './view/code-view';

const PREFIX = 'login';
const { TabPane } = Tabs;
const LoginPage = () => {
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
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="密码登录" key="1">
            <PasswordView />
          </TabPane>
          <TabPane tab="验证码登录" key="2">
            <CodeView />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
