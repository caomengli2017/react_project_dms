import { Button, Upload } from 'antd';
import {
  UploadProps,
  UploadChangeParam,
  UploadFile,
} from 'antd/lib/upload/interface';
import React, { FC, useMemo, useReducer } from 'react';
import { UploadReducer } from './reducer';
import axios from '@src/utils/https/axios';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import _ from 'lodash';

interface FFormItemUploadProps {
  value?: string | Array<string>;
  onChange?: (val: Array<unknown>) => void;
  uploadState?: Omit<UploadProps, 'showUploadList'>;
  title?: string;
}
const FFormItemUpload: FC<FFormItemUploadProps> = ({
  value,
  onChange,
  uploadState,
  children,
  title,
}) => {
  const handleChange = ({ fileList }: UploadChangeParam) => {
    console.log(fileList);
    const obj = state.uploadState;
    obj.fileList = fileList;
    dispatch({ uploadState: obj });
    if (_.isArray(fileList)) {
      const imgs: unknown[] = [];
      fileList.forEach((val) => {
        if (val.status === 'done') imgs.push(val.response);
      });
      onChange && onChange(imgs);
    }
  };
  const customRequest = (fileList: any) => {
    const data = new FormData();
    data.append('file', fileList.file);
    axios
      .post('/admin/images/upload', data, {
        timeout: 3 * 60 * 1000,
        onUploadProgress: (progressEvent) => {
          let percent =
            Math.round((progressEvent.loaded / progressEvent.total) * 10000) /
            100.0;
          fileList.onProgress({ percent });
        },
      })
      .then((res) => {
        fileList.onSuccess({ ...res.data.data });
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
        maxCount: 3,
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
  // useEffect(() => {
  //   state.uploadState.fileList =
  //   dispatch()
  // }, [value])
  return (
    <Upload
      {...state.uploadState}
      defaultFileList={fileListFormat(value) as Array<UploadFile>}
    >
      {node}
    </Upload>
  );
};
const fileListFormat = (file?: string | Array<string>) => {
  if (!file) return undefined;
  if (_.isArray(file)) {
    return file.map((val, index) => ({
      uid: `-${index}`,
      name: 'image.png',
      status: 'done',
      url: val,
    }));
  } else {
    return {
      uid: `-1`,
      name: 'image.png',
      status: 'done',
      url: file,
    };
  }
};
FFormItemUpload.defaultProps = {
  title: '上传',
};
export default FFormItemUpload;
