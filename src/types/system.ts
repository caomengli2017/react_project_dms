export interface IRouteConfigs {
  path: string;
  component: string;
  exact: boolean;
  auth: boolean;
  children?: IRouteConfigs[];
  redirect?: string;
}
export interface IMenuConfigs extends Partial<Omit<IRouteConfigs, 'children'>> {
  id: number | string;
  icon: string;
  name: string;
  type: number;
  sort: number;
  children?: IMenuConfigs[];
  show: boolean;
}
