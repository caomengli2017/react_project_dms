import { login } from '@src/apis/system/user';
import { CallReturnType } from '@src/types/saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  IGetUserDataAction,
  setUserData,
  getDataError,
} from '../../actions/user';
import { GET_USER_DATA } from '../../constants/userConstant';

function* asyncGetUserData(params: IGetUserDataAction) {
  try {
    const res: CallReturnType<typeof login> = yield call(login, {
      ...params.data,
    });
    if (res.code === 200) {
      yield put(setUserData(res.data));
    } else {
      yield put(getDataError({ code: res.code, msg: res.msg }));
    }
  } catch (error) {
    yield put(getDataError({ code: error.code, msg: error.msg }));
  }
}

const rootUser = [takeLatest(GET_USER_DATA, asyncGetUserData)];
export default rootUser;
