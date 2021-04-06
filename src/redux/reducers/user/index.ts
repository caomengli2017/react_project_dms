import { IUserAction } from '../../actions/user';
import {
  GET_USER_DATA,
  SET_USER_DATA,
  GET_DATA_ERROR,
  LOGOUT,
} from '../../constants/userConstant';
import { IUserReducer } from './types';

const localState = sessionStorage.getItem('USER_DATA');
const initState: IUserReducer = localState
  ? JSON.parse(localState)
  : {
      username: '',
      menus: [],
      login: false,
      loading: false,
    };

const userReducer = (state = initState, action: IUserAction): IUserReducer => {
  switch (action.type) {
    case GET_USER_DATA:
      return Object.assign({}, state, { loading: true });
    case SET_USER_DATA:
      const newState = Object.assign({}, state, action.data, {
        loading: false,
        login: true,
      });
      sessionStorage.setItem('USER_DATA', JSON.stringify(newState));
      return newState;
    case GET_DATA_ERROR:
      return Object.assign({}, state, { loading: false });
    case LOGOUT:
      sessionStorage.removeItem('USER_DATA');
      state.login = false;
      return state;
    default:
      return state;
  }
};
export default userReducer;
