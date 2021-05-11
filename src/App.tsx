import React, { useMemo } from 'react';
import './App.less';
import { generatorDynamicRouter } from './router/route-tool';
import { useSelector } from 'react-redux';
import { IRootState } from './redux/reducers/index';
import { FIntlProvider, FRouteView } from './component';
import history from './router/route-root';
import { ConnectedRouter } from 'connected-react-router';

const App = () => {
  const { menus } = useSelector((state: IRootState) => state.user);
  const routes = useMemo(() => {
    return <FRouteView>{generatorDynamicRouter(menus)}</FRouteView>;
  }, [menus]);

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <FIntlProvider>{routes}</FIntlProvider>
      </ConnectedRouter>
    </div>
  );
};

export default App;
