import { fork } from 'redux-saga/effects';
import authFlow from './auth';
import regFlow from './reg';
import { fetchBtcWatch, fetchEthWatch, currencyWatch } from './currency';
import { buyWatch, sellWatch, walletWatch } from './wallet';
import { transactionsWatch } from './transactions';

export default function*() {
  yield fork(authFlow);
  yield fork(regFlow);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);
  yield fork(buyWatch);
  yield fork(sellWatch);
  yield fork(walletWatch);
  yield fork(transactionsWatch);
}
