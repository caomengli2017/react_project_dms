import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import './index.less';
import classNames from 'classnames';
import { FHeader, FMenu, FRouteView } from '@src/component';
import { connect } from 'react-redux';
import { IRootState } from '../../../redux/reducers/index';

const { Header, Sider, Content } = Layout;

const PREFIX = 'basic-layout';

type IBasicLayoutProps = {} & ReturnType<typeof mapStateToProps>;

const BasicLayout: FC<IBasicLayoutProps> = ({ menus, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const breakPoint = (broken: boolean) => {
    setCollapsed(broken);
  };
  return (
    <Layout className={PREFIX}>
      <Sider
        breakpoint="lg"
        className={`${PREFIX}-sider`}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={breakPoint}
      >
        <div className={`${PREFIX}-logo`} />
        <FMenu menuList={menus} />
        <div
          className={classNames(`${PREFIX}-trigger`, {
            collapse: collapsed,
          })}
        >
          <div className={`icon-bg`} onClick={toggle}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'icon',
                onClick: toggle,
              }
            )}
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className={`${PREFIX}-header`}>
          <FHeader />
        </Header>
        <Content className={`${PREFIX}-content`}>
          {/* <Breadcrumb className={`${PREFIX}-content-breadcrumb`}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className={`${PREFIX}-content-main`}>
            <FRouteView>{children}</FRouteView>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => {
  return { menus: state.user.menus };
};
export default connect(mapStateToProps)(BasicLayout);
