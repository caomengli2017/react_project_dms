export interface IRouteConfigs {
  path: string | string[];
  component: string;
  exact: boolean;
  auth: boolean;
  children?: IRouteConfigs[];
}
export interface IMenuConfigs extends Partial<Omit<IRouteConfigs, 'children'>> {
  id: number | string;
  icon: string;
  name: string;
  children?: IMenuConfigs[];
}
