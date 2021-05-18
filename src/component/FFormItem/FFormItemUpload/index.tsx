import { Button, Modal, Upload } from 'antd';
import {
  UploadProps,
  UploadChangeParam,
  UploadFile,
} from 'antd/lib/upload/interface';
import React, { FC, useCallback, useEffect, useMemo, useReducer } from 'react';
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
  value?: unknown;
  onChange?: (val: Array<unknown>) => void;
  uploadState?: Omit<UploadProps, 'showUploadList' | 'onPreview'>;
  title?: string;
  customizeReturn?: (val: any) => Object; //自定义返回
  getUrl?: (val: any) => string; //自定义初始
}
const FFormItemUpload: FC<FFormItemUploadProps> = ({
  value,
  onChange,
  uploadState,
  children,
  title,
  customizeReturn,
  getUrl,
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
              customizeReturn ? customizeReturn(val.response) : val.response
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
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    dispatch({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url?.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  const [state, dispatch] = useReducer(
    UploadReducer,
    {
      uploadState: {
        listType: 'text',
        customRequest: customRequest,
        onChange: handleChange,
        onPreview: handlePreview,
        maxCount: 1,
      },
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
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
  const format = useCallback(
    (file?: Array<any>) => {
      if (!file || (file && file.length === 0)) return undefined;
      return file.map((val: any, index: number) => {
        return {
          uid: `-${index}`,
          name: 'image.png',
          status: 'done',
          response: val,
          url: _.isString(val) ? val : getUrl ? getUrl(val) : val,
        };
      });
    },
    [getUrl]
  );

  useEffect(() => {
    if (!state.uploadState.fileList && !!value) {
      dispatch((e) => {
        return (e.uploadState.fileList = format(
          _.isArray(value) ? value : [value]
        ) as Array<UploadFile>);
      });
    }
  }, [value, state.uploadState, format]);
  return (
    <React.Fragment>
      <Upload {...state.uploadState}>{node}</Upload>
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={() => dispatch({ previewVisible: false })}
      >
        <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
      </Modal>
    </React.Fragment>
  );
};
function getBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

FFormItemUpload.defaultProps = {
  title: '上传',
};
export default FFormItemUpload;
