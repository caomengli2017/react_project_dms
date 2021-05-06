import { Spin } from 'antd';
import React, { FC, Suspense, useMemo } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.less';

const PREFIX = 'f-route';
type IFRouteViewProps = {
  animation?: boolean;
};
const FRouteView: FC<IFRouteViewProps> = ({ children, animation = false }) => {
  let location = useLocation();
  const suspenseSpin = useMemo(() => {
    return (
      <div className="spin">
        <Spin>
          <div className="spin-content"></div>
        </Spin>
      </div>
    );
  }, []);
  if (!animation)
    return (
      <div className={PREFIX}>
        <Suspense fallback={suspenseSpin}>
          <Switch location={location}>{children}</Switch>
        </Suspense>
      </div>
    );
  return (
    <div className={PREFIX}>
      <TransitionGroup className={`${PREFIX}-wrapper`}>
        <CSSTransition
          key={location.pathname}
          timeout={200}
          classNames={'fade'}
        >
          <Suspense fallback={suspenseSpin}>
            <Switch location={location}>{children}</Switch>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default FRouteView;
