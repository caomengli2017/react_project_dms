import { IMenuConfigs } from '@src/types/system';
export interface IUserModel {
  username: string;
  menus: IMenuConfigs;
}
export interface ILoginProps {
  account: string;
  password?: string;
  deviceToken?: string;
  verifyCode?: string;
}
