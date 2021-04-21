import {
  SET_USER_DATA,
  GET_USER_DATA,
  GET_DATA_ERROR,
} from '../constants/userConstant';
import { IUserModel } from '@src/types/model/user';
import { LOGOUT } from '../constants/userConstant';

/**
 *
 * @author Leo
 * @desc 获取用户信息
 * @date 2021-03-30 10:15:07
 */
export type IGetUserDataParams = {
  username: string;
  password: string;
};
export type IGetUserDataAction = {
  type: typeof GET_USER_DATA;
  data: IGetUserDataParams;
};
export const getUserData = (params: IGetUserDataParams): IGetUserDataAction => {
  return { type: GET_USER_DATA, data: params };
};
/**
 *
 * @author Leo
 * @desc 设置用户信息
 * @date 2021-03-30 10:15:22
 */
export type ISetUserDataAction = {
  type: typeof SET_USER_DATA;
  data: IUserModel;
};
export const setUserData = (params: IUserModel): ISetUserDataAction => {
  return { type: SET_USER_DATA, data: params };
};
/**
 *
 * @author Leo
 * @desc 登录失败
 * @date 2021-03-31 16:53:42
 */
export type IGetDataErrorAction = {
  type: typeof GET_DATA_ERROR;
  data: {
    code: number;
    msg: string;
  };
};
export const getDataError = (err: {
  code: number;
  msg: string;
}): IGetDataErrorAction => ({
  type: GET_DATA_ERROR,
  data: err,
});

/**
 *
 * @author Leo
 * @desc 登出
 * @date 2021-03-31 16:53:25
 */
export type ILogoutAction = {
  type: typeof LOGOUT;
};
export const logout = (): ILogoutAction => ({
  type: LOGOUT,
});
export type IUserAction =
  | ISetUserDataAction
  | IGetUserDataAction
  | IGetDataErrorAction
  | ILogoutAction;
