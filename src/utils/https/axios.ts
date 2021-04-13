import { notification } from 'antd';
import Axios from 'axios';

const axios = Axios.create();

// axios.interceptors.request.use((value) => {});

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      openErrorNotification(res.statusText);
      return Promise.reject(res);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
const openErrorNotification = (text: string) => {
  notification.error({
    message: 'Notification Title',
    description: text,
  });
};
export default axios;
