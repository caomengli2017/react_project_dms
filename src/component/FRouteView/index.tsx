import { Spin } from 'antd';
import React, { FC, Suspense, useMemo } from 'react';
import { Switch, useLocation } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.less';

const PREFIX = 'f-route';
type IFRouteViewProps = {};
const FRouteView: FC<IFRouteViewProps> = ({ children }) => {
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
  return (
    // <TransitionGroup className={PREFIX}>
    //   <CSSTransition
    //     unmountOnExit
    //     key={location.key}
    //     classNames="fade"
    //     timeout={3000}
    //   >
    <div className={PREFIX}>
      <Suspense fallback={suspenseSpin}>
        <Switch location={location}>{children}</Switch>
      </Suspense>
    </div>

    //   </CSSTransition>
    // </TransitionGroup>
  );
};

export default FRouteView;
