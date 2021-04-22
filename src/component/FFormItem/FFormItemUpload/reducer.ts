import _ from 'lodash';
import { UploadProps } from 'antd/lib/upload/interface';

interface IFormItemUploadProps {
  uploadState: UploadProps;
  loading: boolean;
}
type IFormItemUploadAction =
  | ((e: IFormItemUploadProps) => IFormItemUploadProps)
  | Object;

export function UploadReducer(
  state: IFormItemUploadProps,
  action: IFormItemUploadAction
) {
  if (_.isFunction(action)) {
    return { ...state, ...action(state) };
  }
  if (_.isObject(action)) {
    return { ...state, ...action };
  }
  return state;
}
export const initalReducer: IFormItemUploadProps = {
  uploadState: {
    listType: 'text',
  },
  loading: false,
};
