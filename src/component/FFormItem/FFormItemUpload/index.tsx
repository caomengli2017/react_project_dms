import { Button, Upload } from 'antd';
import {
  UploadProps,
  UploadChangeParam,
  UploadFile,
} from 'antd/lib/upload/interface';
import React, { FC, useEffect, useMemo, useReducer } from 'react';
import { UploadReducer } from './reducer';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import HttpApi from '@src/utils/https';
/**
 *
 * @author Leo
 * @desc 自定义文件上传 默认多文件 返回数组 可再优化
 * @date 2021-05-07 15:08:13
 */
interface FFormItemUploadProps {
  value?: Array<string>;
  onChange?: (val: Array<unknown>) => void;
  uploadState?: Omit<UploadProps, 'showUploadList'>;
  title?: string;
  customReturnData?: (val: any) => Object;
  prefixUrl?: string;
}
const FFormItemUpload: FC<FFormItemUploadProps> = ({
  value,
  onChange,
  uploadState,
  children,
  title,
  customReturnData,
  prefixUrl,
}) => {
  const handleChange = ({ fileList }: UploadChangeParam) => {
    const uploadState = state.uploadState;
    uploadState.fileList = fileList;
    dispatch({ uploadState: uploadState });
    if (_.isArray(fileList)) {
      if (fileList.find((e) => e.status !== 'done')) return;
      const imgs: unknown[] = [];
      fileList.forEach((val) => {
        if (val.status === 'done') {
          if (val.response) {
            imgs.push(
              customReturnData ? customReturnData(val.response) : val.response
            );
          } else if (val.url) {
            imgs.push(val.url);
          }
        }
      });
      onChange && onChange(imgs);
    }
  };
  const customRequest = (fileList: any) => {
    const data = new FormData();
    data.append('file', fileList.file);
    HttpApi.request({
      url: '/admin/images/upload',
      data,
      timeout: 3 * 60 * 1000,
      method: 'POST',
      onUploadProgress: (progressEvent) => {
        let percent =
          Math.round((progressEvent.loaded / progressEvent.total) * 10000) /
          100.0;
        fileList.onProgress({ percent });
      },
    })
      .then((res) => {
        fileList.onSuccess({ ...res.data });
      })
      .catch((err) => {
        fileList.onError(err, fileList);
      });
  };
  const [state, dispatch] = useReducer(
    UploadReducer,
    {
      uploadState: {
        listType: 'text',
        customRequest: customRequest,
        onChange: handleChange,
        maxCount: 1,
      },
      loading: false,
    },
    (e) => {
      e.uploadState = { ...e.uploadState, ...uploadState };
      return e;
    }
  );
  const node = useMemo(() => {
    if (children) return children;
    if (
      state.uploadState &&
      state.uploadState.fileList &&
      state.uploadState.fileList.length >= state.uploadState.maxCount!
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
  }, [state, title, children]);
  useEffect(() => {
    if (
      !state.uploadState.fileList ||
      state.uploadState.fileList.length === 0
    ) {
      dispatch((e) => {
        return (e.uploadState.fileList = fileListFormat(
          value,
          prefixUrl
        ) as Array<UploadFile>);
      });
    }
  }, [value, state.uploadState, prefixUrl]);
  return <Upload {...state.uploadState}>{node}</Upload>;
};
const fileListFormat = (file?: Array<string>, prefixUrl?: string) => {
  if (!file) return undefined;
  return file.map((val, index) => ({
    uid: `-${index}`,
    name: 'image.png',
    status: 'done',
    response: val,
    url: prefixUrl ? prefixUrl + val : val,
  }));
};
FFormItemUpload.defaultProps = {
  title: '上传',
};
export default FFormItemUpload;
