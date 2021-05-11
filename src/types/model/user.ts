import { IMenuConfigs } from '../system';

export interface IUserModel {
  id: number;
  uuid: string;
  name: string;
  realName?: any;
  avatar: string;
  tel: string;
  storeId: number;
  companyId: number;
  idCard: string;
  mixSecret: string;
  accessToken: string;
  tik: string;
  menus: IMenuConfigs[];
}
export interface ILoginProps {
  account: string;
  password?: string;
  deviceToken?: string;
  verifyCode?: string;
}
