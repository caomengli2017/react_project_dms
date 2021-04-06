/**
 *
 * @author Leo
 * @desc Menu菜单
 * @date 2021-03-30 11:47:27
 */

import { Menu } from 'antd';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IMenuConfigs } from '@src/types/system';
import _ from 'lodash';
import './index.less';
import { useHistory, useLocation } from 'react-router';

const { SubMenu } = Menu;

export interface IFMenuProps {
  menuList: IMenuConfigs[];
}

interface MenuInfo {
  key: React.Key;
  keyPath: React.Key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}

const PREFIX = 'f-menu';

const FMenu = ({ menuList }: IFMenuProps) => {
  const [selectKey, setSelectKey] = useState<Array<string>>([]);
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const history = useHistory();
  const location = useLocation();

  // 根据路由初始化展开菜单
  const initMenuKey = useCallback(
    (path: string) => {
      const arr: string[] = [];
      const findKeys = (menus: IMenuConfigs[], path: string, arr: string[]) => {
        if (menus.length === 0 || !path) {
          return (arr = []);
        }
        for (let i = 0; i < menus.length; i++) {
          arr.push(menus[i].id.toString());
          if (
            menus[i].path === path ||
            (_.isArray(menus[i].path) && menus[i].path?.includes(path))
          ) {
            return true;
          }
          if (menus[i] && menus[i].children) {
            if (findKeys(menus[i].children as IMenuConfigs[], path, arr)) {
              return true;
            } else {
              arr.pop();
            }
          } else {
            arr.pop();
          }
        }
      };

      findKeys(menuList, path, arr);
      if (arr.length > 0) {
        const key = arr.pop();
        setOpenKeys(arr);
        if (key) {
          setSelectKey([key]);
        }
      }
    },
    [menuList]
  );
  useEffect(() => {
    initMenuKey(location.pathname);
  }, [location, initMenuKey]);
  const findMenuByKey = (key: string | number): IMenuConfigs | null => {
    let result: IMenuConfigs | null = null;
    const recursion = (items: IMenuConfigs[]) => {
      for (const item of items) {
        if (item.id === key) {
          result = item;
        }
        if (result === null && item.children) {
          recursion(item.children);
        }
      }
    };
    recursion(menuList);
    return result;
  };
  const menuClick = (e: MenuInfo) => {
    const menu = findMenuByKey(e.key);
    setSelectKey([e.key.toString()]);
    if (menu && menu.path) {
      const path = _.isArray(menu.path) ? menu.path[1] : menu.path;
      history.push(path);
    }
  };
  const onOpenChange = (keys: Array<any>) => {
    setOpenKeys(keys);
  };
  return (
    <div className={PREFIX}>
      <Menu
        selectedKeys={selectKey}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={menuClick}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
      >
        {BuildMenu(menuList)}
      </Menu>
    </div>
  );
};

function BuildMenu(items: IMenuConfigs[]) {
  if (!_.isArray(items) || items.length === 0) {
    return null;
  }
  let nodes = [];
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      nodes.push(
        <SubMenu key={item.id} title={BuildMenuTitle(item)}>
          {BuildMenu(item.children)}
        </SubMenu>
      );
    } else {
      nodes.push(<Menu.Item key={item.id}>{BuildMenuTitle(item)}</Menu.Item>);
    }
  }
  return nodes;
}

/**
 *
 * @author Leo
 * @desc 阿里图标库在线地址 不做本地icon打包 减少包大小
 * @date 2021-03-30 11:46:11
 */
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2451198_u493xr74btg.js',
});
function BuildMenuTitle(menu: IMenuConfigs): ReactNode {
  let icon = null;
  if (!!menu.icon) {
    if (_.isString(menu.icon)) {
      icon = <IconFont type={menu.icon} />;
    }
  } else {
    icon = <i className="def-icon">·</i>;
  }
  return (
    <React.Fragment>
      {icon}
      <span className="name">{menu.name}</span>
    </React.Fragment>
  );
}
export default FMenu;
