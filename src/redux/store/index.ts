import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from '@src/redux/reducers/index';
import rootSage from '@src/redux/saga/index';
import history from '@src/router/route-root';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, routerMiddleware(history))
);

sagaMiddleware.run(rootSage);
export default store;
