import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write from './write';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
