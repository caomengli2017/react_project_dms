import { combineReducers } from 'redux';
import userReducer from './user/index';

const rootReducer = combineReducers({
  user: userReducer,
});
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
