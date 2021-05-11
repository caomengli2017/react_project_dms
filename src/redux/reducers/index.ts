import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user/index';
import history from '@src/router/route-root';

const rootReducer = combineReducers({
  router: connectRouter(history),
  user: userReducer,
});
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
