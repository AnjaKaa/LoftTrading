import { takeLatest, fork, take, select, put, cancel, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { authSuccess, logout } from '../ducks/auth';
import { getOffset } from '../ducks/currency';
import {
  selectBtc,
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  selectOffset,
} from '../ducks/currency';
import { candles } from '../api';

function* fetchBtcFlow(action) {
  try {
    const response = yield call(candles, 'btc', action.payload);
    yield put(fetchBtcSuccess(response.data.result));
  } catch (error) {
    yield put(fetchBtcFailure(error));
  }
}

function* loginCurrencyFlow() {
  while (true) {
    const offset = yield select(getOffset);
    yield put(fetchBtcRequest(offset));

    yield delay(15000);
  }
}

export function* currencyWatch() {
  let currencyTask;
  while (true) {
    const action = yield take([authSuccess, logout, selectBtc, selectOffset]);

    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== logout.toString()) currencyTask = yield fork(loginCurrencyFlow);
  }
}

export function* fetchBtcWatch() {
  yield takeLatest(fetchBtcRequest, fetchBtcFlow);
}