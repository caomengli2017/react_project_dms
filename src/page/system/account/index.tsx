import React, { FC, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import './index.less';

type IAccountPageProp = {};

const PREFIX = 'accout-page';
const AccountPage: FC<IAccountPageProp> = ({ children }) => {
  return (
    <div className={PREFIX}>
      <Suspense fallback={<span></span>}>
        <Switch>{children}</Switch>
      </Suspense>
    </div>
  );
};

export default AccountPage;
