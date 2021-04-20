import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import React, { FC, useMemo, useState } from 'react';
import './index.less';
import classNames from 'classnames';
import { FBreadcrumb, FHeader, FMenu, FRouteView } from '@src/component';
import { connect } from 'react-redux';
import { IRootState } from '../../../redux/reducers/index';
import { useLocation } from 'react-router-dom';
import { IMenuConfigs } from '@src/types/system';
import intl from 'react-intl-universal';

const { Sider, Content } = Layout;

const PREFIX = 'basic-layout';

type IBasicLayoutProps = {} & ReturnType<typeof mapStateToProps>;
type IPathItemProps = {
  path?: string;
  name: string;
};
type IPathProps = {
  breadcrumbs: IPathItemProps[];
  name: string;
  path: string;
};

const BasicLayout: FC<IBasicLayoutProps> = ({ menus, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const breakPoint = (broken: boolean) => {
    setCollapsed(broken);
  };
  const location = useLocation();
  // 将menu列表转成path对应的一维数组
  const pathAndName = useMemo(() => {
    const arr: IPathProps[] = [];
    const tree2arr = (menu: IMenuConfigs[], parent?: IPathItemProps) => {
      for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        const obj: IPathItemProps = {
          name: item.name,
          path: item.path,
        };
        const breadcrumbs: IPathItemProps[] = [];
        if (parent) breadcrumbs.push(parent);
        breadcrumbs.push(obj);
        if (item.path) {
          arr.push({
            breadcrumbs,
            name: item.name,
            path: item.path,
          });
        }
        if (item.children) {
          tree2arr(item.children, obj);
        }
      }
    };
    tree2arr(menus);
    return arr;
  }, [menus]);
  const currentPage = pathAndName.find((e) => e.path === location.pathname);
  return (
    <Layout className={PREFIX}>
      <Sider
        width={240}
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
          {!collapsed && <span>{intl.get('platform_name')}</span>}
        </div>
        <FMenu menuList={menus} />
        <TriggerBtn toggle={toggle} collapsed={collapsed} />
      </Sider>
      <Layout>
        <FHeader title={currentPage?.name} />
        <Content className={`${PREFIX}-content`}>
          <FBreadcrumb breadcrumbs={currentPage?.breadcrumbs} />
          <div className={`${PREFIX}-content-main`}>
            <FRouteView>{children}</FRouteView>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
type ITriggerBtnProp = {
  collapsed: boolean;
  toggle: () => void;
};
const TriggerBtn = ({ collapsed, toggle }: ITriggerBtnProp) => {
  return (
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
  );
};
const mapStateToProps = (state: IRootState) => {
  return { menus: state.user.menus };
};
export default connect(mapStateToProps)(BasicLayout);
