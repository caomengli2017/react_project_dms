import { Breadcrumb, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import React, { FC, useMemo, useState } from 'react';
import './index.less';
import classNames from 'classnames';
import { FHeader, FMenu, FRouteView } from '@src/component';
import { connect } from 'react-redux';
import { IRootState } from '../../../redux/reducers/index';
import { useLocation } from 'react-router';
import { IMenuConfigs } from '@src/types/system';

const { Header, Sider, Content } = Layout;

const PREFIX = 'basic-layout';

type IBasicLayoutProps = {} & ReturnType<typeof mapStateToProps>;
type IPathProps = {
  name: string[];
  path: string;
};
const BasicLayout: FC<IBasicLayoutProps> = ({ menus, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const breakPoint = (broken: boolean) => {
    setCollapsed(broken);
  };
  const paths = useMemo(() => {
    const arr: IPathProps[] = [];
    const tree2arr = (menu: IMenuConfigs[], parentName: string[]) => {
      for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        const names = [...parentName, item.name];
        if (item.path) {
          arr.push({
            name: names,
            path: item.path,
          });
        }
        if (item.children) {
          tree2arr(item.children, names);
        }
      }
    };
    tree2arr(menus, []);
    return arr;
  }, [menus]);
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
        <div className={`${PREFIX}-logo`}>
          <img
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="头像"
          />
          {!collapsed && <span>xxx平台</span>}
        </div>
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
          <div className={`${PREFIX}-content-breadcrumb`}>
            <Breadcrumb>
              {paths
                .find((e) => e.path === location.pathname)
                ?.name.map((e, index) => (
                  <Breadcrumb.Item key={index}>{e}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
          </div>
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
