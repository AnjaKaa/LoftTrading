import { fork } from 'redux-saga/effects';
import authFlow from './auth';
import { fetchBtcWatch, currencyWatch } from './currency';
import { buyWatch, sellWatch, walletWatch } from './wallet';

export default function*() {
  yield fork(authFlow);
  yield fork(fetchBtcWatch);
  yield fork(currencyWatch);
  yield fork(buyWatch);
  yield fork(sellWatch);
  yield fork(walletWatch);
}
