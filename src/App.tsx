import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.less';
import { generatorDynamicRouter } from './router/route-tool';
import { useSelector } from 'react-redux';
import { IRootState } from './redux/reducers/index';
import { FIntlProvider, FRouteView } from './component';

const App = () => {
  const { menus } = useSelector((state: IRootState) => state.user);
  const routes = useMemo(() => {
    return <FRouteView>{generatorDynamicRouter(menus)}</FRouteView>;
  }, [menus]);

  return (
    <div className="App">
      <BrowserRouter>
        <FIntlProvider>{routes}</FIntlProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
