import { lazy, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRouteItemProps } from './types';
import _ from 'lodash';
import { IMenuConfigs, IRouteConfigs } from '@src/types/system';
import store from '@src/redux/store';

const constantsRoutes: Array<IRouteConfigs> = [
  {
    path: '/login',
    component: 'user/login/index.tsx',
    exact: true,
    auth: false,
  },
  {
    path: '/404',
    component: 'system/not-found/index.tsx',
    exact: true,
    auth: false,
  },
];
const rootLayout: IRouteConfigs = {
  path: '/',
  component: 'layouts/basic-layout/index.tsx',
  exact: false,
  auth: true,
  children: [],
};
/**
 *
 * @author Leo
 * @desc 动态生成路由
 * @date 2021-03-30 14:30:23
 */
export const generatorDynamicRouter = (data: IMenuConfigs[]) => {
  let routesArr: IRouteConfigs[] = [];
  listToRoute(data, routesArr);
  const newRoutes = [...constantsRoutes];
  rootLayout.children?.push(...routesArr);
  newRoutes.push(rootLayout);
  const routes = buildRouteNode(newRoutes);
  return routes;
};
/**
 *
 * @author Leo
 * @desc 根据menu菜单生成路由列表
 * @date 2021-03-30 13:46:54
 */
export const listToRoute = (list: IMenuConfigs[], routes: IRouteConfigs[]) => {
  list.forEach((e) => {
    if (!!e.component && !!e.path) {
      const child = {
        path: e.path,
        component: e.component,
        // 父页面的 exact为false
        exact: e.exact || (e.children && e.children.length > 0 ? false : true),
        auth: true,
        children: [],
        root: e.root, // 是否为根路径
      };
      if (!!e.children && e.children.length > 0) {
        listToRoute(e.children, child.children);
      }
      routes.push(child);
    } else {
      if (e.children) {
        return listToRoute(e.children, routes);
      }
    }
  });
};
export const buildRouteNode = (config: Array<IRouteConfigs>): ReactNode[] => {
  let routes: ReactNode[] = [];
  const { login } = store.getState().user;
  routes = config.map((e, index) => {
    const DynamicComponent = lazy(() => import(`@src/page/${e.component}`));
    const attirbute: IRouteItemProps = {
      key: _.uniqueId('route_'),
      path: e.path,
      exact: e.exact,
      render: (props) => {
        // 验证登录 拦截
        if (e.auth && login === false) {
          return <Redirect to="/login" />;
        }
        // 子路由嵌套
        if (_.isArray(e.children) && e.children.length > 0) {
          return (
            <DynamicComponent {...props}>
              {e.children && buildRouteNode(e.children)}
            </DynamicComponent>
          );
        } else {
          return <DynamicComponent {...props} />;
        }
      },
    };
    return <Route {...attirbute} />;
  });
  routes.push(
    <Route
      path={'*'}
      key={'404'}
      render={(prop) => {
        if (prop.location.pathname === '/') {
          const path = config.find((e) => e.root !== undefined)?.path;
          return path ? <Redirect to={path} /> : <Redirect to="/404" />;
        }
        return <Redirect to="/404" />;
      }}
    />
  );
  return routes;
};
