// import { getMenuList } from '@src/apis/system/menu';
import { login } from '@src/apis/system/user';
import { CallReturnType } from '@src/types/saga';
import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  IGetUserDataAction,
  setUserData,
  getDataError,
} from '../../actions/user';
import { GET_USER_DATA } from '../../constants/userConstant';

function* asyncGetUserData(params: IGetUserDataAction) {
  try {
    const user: CallReturnType<typeof login> = yield call(login, {
      ...params.data,
    });
    // const menu: CallReturnType<typeof getMenuList> = yield call(getMenuList, {
    //   accessToken: user.data.accessToken,
    //   uuid: user.data.uuid,
    // });
    yield put(setUserData({ ...user.data }));
    yield put(push('/'));
  } catch (error) {
    yield put(getDataError({ code: error.code, msg: error.msg }));
  }
}

const rootUser = [takeLatest(GET_USER_DATA, asyncGetUserData)];
export default rootUser;
