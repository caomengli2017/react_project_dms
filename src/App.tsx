import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import intl from 'react-intl-universal';
import zhCN from 'antd/lib/locale/zh_CN';
import './App.less';
import { generatorDynamicRouter } from './router/route-tool';
import { useSelector } from 'react-redux';
import { IRootState } from './redux/reducers/index';
import { FRouteView } from './component';

const App = () => {
  const [initDone, setInitDone] = useState(false);
  const { menus } = useSelector((state: IRootState) => state.user);
  useEffect(() => {
    // 多语言设置 可优化 将翻译文件放入静态服务器 请求获取 减少打包体积
    intl
      .init({
        currentLocale: 'zh-CN',
        locales: {
          'zh-CN': require('./utils/locales/zh-CN.json'),
        },
      })
      .then(() => {
        setInitDone(true);
      });
  }, []);
  const suspenseSpin = useMemo(() => {
    return (
      <div className="App-spin">
        <Spin>
          <div className="App-spin-content"></div>
        </Spin>
      </div>
    );
  }, []);
  const routes = useMemo(() => {
    return <FRouteView>{generatorDynamicRouter(menus)}</FRouteView>;
  }, [menus]);
  if (initDone === false)
    return <React.Fragment>{suspenseSpin}</React.Fragment>;
  return (
    <div className="App">
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>{routes}</ConfigProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
