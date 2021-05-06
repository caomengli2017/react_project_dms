import React, { useMemo } from 'react';
import { Avatar, Badge, Col, Dropdown, Menu, Modal, Row } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
} from '@ant-design/icons';
import './index.less';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@src/redux/actions/user';
import { IRootState } from '../../redux/reducers/index';
import { setLogout } from '@src/apis/system/user';

interface IFHeaderProps {
  title?: string;
}
const PREFIX = 'f-header';
const FHeader = ({ title }: IFHeaderProps) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: IRootState) => state.user);
  const history = useHistory();
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
                return new Promise((resolve, reject) => {
                  setLogout().then(() => {
                    dispatch(logout());
                    resolve(null);
                    history.push('/login');
                  });
                });
              },
            });
          }}
        >
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    ),
    [dispatch, history]
  );
  return (
    <div className={PREFIX}>
      <Row justify="space-between">
        <Col span={12}>
          <h2 className={`${PREFIX}-title`}>{title}</h2>
        </Col>
        <Col span={12}>
          <div className={`${PREFIX}-right`}>
            <span className={`${PREFIX}-right-badge`}>
              <Badge count={0}>
                <BellOutlined style={{ fontSize: 16 }} />
              </Badge>
            </span>

            <Dropdown overlay={menu} arrow placement="bottomCenter">
              <span className={`${PREFIX}-user`}>
                <Avatar icon={<UserOutlined />} />
                <span className={`${PREFIX}-name`}>{name}</span>
              </span>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default FHeader;
