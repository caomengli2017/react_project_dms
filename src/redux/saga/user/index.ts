import { login } from '@src/apis/system/user';
import { CallReturnType } from '@src/types/saga';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  IGetUserDataAction,
  setUserData,
  getDataError,
} from '../../actions/user';
import { GET_USER_DATA } from '../../constants/userConstant';

function* asyncGetUserData(params: IGetUserDataAction) {
  yield delay(3000);
  try {
    const res: CallReturnType<typeof login> = yield call(login, {
      ...params.data,
    });
    if (res.code === 200) {
      yield put(setUserData(res.data));
    } else {
      yield put(getDataError());
    }
  } catch (error) {
    yield put(getDataError());
  }
}

const rootUser = [takeLatest(GET_USER_DATA, asyncGetUserData)];
export default rootUser;
