import React from 'react';
import { useLocation } from 'react-router';
import './index.less';

const PREFIX = 'account-setting';
const LogPage = () => {
  const location = useLocation();
  console.log(location);
  return <div className={PREFIX}>用户设置页面</div>;
};

export default LogPage;
