import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { call } from 'redux-saga/effects';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');

// 로그 아웃의 경우 LOGOUT_SUCCESS, LOGOUT_FAIL이 큰 의미가 없으므로 만들지 않는다
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

/**
 * @brief  CHECK_FAILURE 액션 발생 시 localStorage user값을 제거
 *          이 함수는 createRequestSaga에서 사용하는 yield를 사용하지 않으므로 Generator 함수 형태로 만들지 않아도 된다
 */
function checkFailureSaga() {
  try {
    localStorage.removeItem('user'); // localStorage 에서 user 제거
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user'); // localStorage 에서 user 제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  // CHECK 액션이 발생 시 checkSaga 동작
  yield takeLatest(CHECK, checkSaga);
  // CHECK_FAILURE 액션이 발생했을 때 checkFailureSaga 함수가 동작하도록 설정한다
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  // LOGOUT action -> logoutSaga
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
