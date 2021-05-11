import store from '@src/redux/store';
import { notification } from 'antd';
import Axios from 'axios';

const axios = Axios.create();

axios.interceptors.request.use((value) => {
  const { login, accessToken, uuid } = store.getState().user;
  value.headers['lang'] = 'cn';
  if (login) {
    value.headers = {
      ...value.headers,
      accessToken,
      uuid,
    };
  }

  return value;
});

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      openErrorNotification(res.statusText, 'Network Error');
      return Promise.reject(res);
    }
  },
  (error) => {
    openErrorNotification(error.toString(), 'Network Error');
    return Promise.reject(error);
  }
);
const openErrorNotification = (text: string, msg: string = 'Error') => {
  notification.error({
    message: msg,
    description: text,
  });
};
export default axios;
