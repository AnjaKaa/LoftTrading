import { fork } from 'redux-saga/effects';
import authFlow from './auth';
import { fetchBtcWatch, currencyWatch } from './currency';

export default function*() {
  yield fork(authFlow);
  yield fork(fetchBtcWatch);
  yield fork(currencyWatch);
}
