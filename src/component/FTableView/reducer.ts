import { ITableViewState } from '@src/types/baseTypes';
import _ from 'lodash';

export type ITableViewAction =
  | ((e: ITableViewState) => ITableViewState)
  | Object;

export function TableViewReducer(
  state: ITableViewState,
  action: ITableViewAction
) {
  if (_.isFunction(action)) {
    return { ...state, ...action(state) };
  }
  if (_.isObject(action)) {
    return { ...state, ...action };
  }
  return state;
}
export const initialState: ITableViewState = {
  pagination: {
    current: 1,
    pageSize: 10,
    showTotal: (total: number, range: [number, number]) =>
      `共 ${total} 项, 当前 ${range[0]}-${range[1]}`,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '40', '60', '100', '150', '200'],
  },
  dataSource: [],
  tableProps: {},
};
