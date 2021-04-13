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
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@src/redux/actions/user';
import { IRootState } from '../../redux/reducers/index';

const PREFIX = 'f-header';
const FHeader = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state: IRootState) => state.user);
  const menu = useMemo(
    () => (
      <Menu className={`${PREFIX}-menu`}>
        <Menu.Item
          className={`${PREFIX}-menu-item`}
          icon={<TeamOutlined className={`${PREFIX}-menu-item-icon`} />}
        >
          <Link to="/account/center">用户中心</Link>
        </Menu.Item>
        <Menu.Item
          className={`${PREFIX}-menu-item`}
          icon={<SettingOutlined className={`${PREFIX}-menu-item-icon`} />}
        >
          <Link to="/account/setting">用户设置</Link>
        </Menu.Item>
        <Menu.Item
          className={`${PREFIX}-menu-item`}
          icon={<LogoutOutlined className={`${PREFIX}-menu-item-icon`} />}
          onClick={() => {
            Modal.confirm({
              title: '注销',
              icon: <ExclamationCircleOutlined />,
              content: '确定退出此账号么',
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
          <div className={`${PREFIX}-right`}>
            <Dropdown overlay={menu} arrow placement="bottomCenter">
              <span className={`${PREFIX}-user`}>
                <Avatar icon={<UserOutlined />} />
                <span className={`${PREFIX}-name`}>{username}</span>
              </span>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default FHeader;
