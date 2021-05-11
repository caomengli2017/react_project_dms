import { IUserModel } from '@src/types/model/user';
import { IMenuConfigs } from '../../../types/system';
export type IUserReducer = {
  loading: boolean;
  login: boolean;
  error?: {
    code: number;
    msg: string;
  };
} & Partial<IUserModel> &
  Record<'menus', IMenuConfigs>;
