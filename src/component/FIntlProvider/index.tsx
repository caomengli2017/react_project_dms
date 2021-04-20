import React, { useEffect, useMemo, useState, FC } from 'react';
import { ConfigProvider, Spin } from 'antd';
import intl from 'react-intl-universal';
// 时间选择框 多语言基于moment  需要优化一下多语言配置
import 'moment/locale/zh-cn';
import zhCN from '@src/utils/locales/zh-CN';
import AntdZhCN from 'antd/lib/locale/zh_CN';
import './index.less';

interface IFIntlProviderProps {}
const FIntlProvider: FC<IFIntlProviderProps> = ({ children }) => {
  const [initDone, setInitDone] = useState(false);
  useEffect(() => {
    // 多语言设置 可优化 将翻译文件放入静态服务器 请求获取 减少打包体积
    intl
      .init({
        currentLocale: 'zh-CN',
        locales: {
          'zh-CN': zhCN,
        },
      })
      .then(() => {
        setInitDone(true);
      });
  }, []);
  const suspenseSpin = useMemo(() => {
    return (
      <div className="f-intl-spin">
        <Spin>
          <div className="f-intl-spin-content"></div>
        </Spin>
      </div>
    );
  }, []);
  if (initDone === false)
    return <React.Fragment>{suspenseSpin}</React.Fragment>;
  return <ConfigProvider locale={AntdZhCN}>{children}</ConfigProvider>;
};

export default FIntlProvider;
