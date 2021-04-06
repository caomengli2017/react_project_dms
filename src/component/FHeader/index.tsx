import React, { useMemo } from 'react';
import { Avatar, Col, Dropdown, Menu, Modal, Row } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './index.less';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@src/redux/actions/user';

const PREFIX = 'f-header';
const FHeader = () => {
  const dispatch = useDispatch();
  const menu = useMemo(
    () => (
      <Menu className={`${PREFIX}-menu`}>
        <Menu.Item
          className={`${PREFIX}-menu-item`}
          icon={<TeamOutlined style={{ fontSize: 18 }} />}
        >
          <Link to="/account/center">用户中心</Link>
        </Menu.Item>
        <Menu.Item
          className={`${PREFIX}-menu-item`}
          icon={<SettingOutlined style={{ fontSize: 18 }} />}
        >
          <Link to="/account/setting">用户设置</Link>
        </Menu.Item>
        <Menu.Item
          className={`${PREFIX}-menu-item`}
          icon={<LogoutOutlined style={{ fontSize: 18 }} />}
          onClick={() => {
            Modal.confirm({
              title: '确定退出此账号么?',
              icon: <ExclamationCircleOutlined />,
              content: 'Some descriptions',
              onOk() {
                dispatch(logout());
                window.location.reload();
              },
            });
          }}
        >
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    ),
    [dispatch]
  );
  return (
    <div className={PREFIX}>
      <Row justify="space-between">
        <Col span={4}></Col>
        <Col span={4}>
          <div className={`${PREFIX}-user`}>
            <Dropdown overlay={menu} arrow placement="bottomCenter">
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default FHeader;
