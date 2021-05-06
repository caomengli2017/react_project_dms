import { Button, Upload } from 'antd';
import { UploadProps, UploadChangeParam } from 'antd/lib/upload/interface';
import React, { FC, useMemo, useReducer } from 'react';
import { UploadReducer } from './reducer';
import _ from 'lodash';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';

interface FFormItemUploadProps {
  value?: string | Array<string>;
  onChange?: (val: string | Array<string>) => void;
  uploadState?: UploadProps;
  title?: string;
  maxLength?: number;
}
const FFormItemUpload: FC<FFormItemUploadProps> = ({
  value,
  onChange,
  uploadState,
  children,
  title,
  maxLength = 1,
}) => {
  const handleChange = ({ fileList }: UploadChangeParam) => {
    const obj = state.uploadState;
    obj.fileList = fileList;
    dispatch({ uploadState: obj });
  };
  const [state, dispatch] = useReducer(
    UploadReducer,
    {
      uploadState: {
        listType: 'text',
      },
      loading: false,
      onChange: handleChange,
    },
    (e) => {
      return _.assign({}, e, { uploadState });
    }
  );
  // customRequest = (fileList: any) => {
  //   oss.upload({ e: fileList });
  // };
  const node = useMemo(() => {
    if (children) return children;
    if (
      state.uploadState &&
      state.uploadState.fileList &&
      state.uploadState.fileList.length >= maxLength
    )
      return null;
    if (state.uploadState?.listType === 'picture-card') {
      return (
        <div>
          {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>{title}</div>
        </div>
      );
    } else {
      return <Button icon={<UploadOutlined />}>{title}</Button>;
    }
  }, [state, title, children, maxLength]);

  return <Upload {...state.uploadState}>{node}</Upload>;
};
FFormItemUpload.defaultProps = {
  title: '上传',
  maxLength: 1,
};
export default FFormItemUpload;
