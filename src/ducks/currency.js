import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

export const {
  selectBtc,

  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,

  selectOffset,

  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure,

  sellCurrencySuccess,
  sellCurrencyRequest,
  sellCurrencyFailure,
} = createActions(
  'SELECT_BTC',
  'FETCH_BTC_REQUEST',
  'FETCH_BTC_SUCCESS',
  'FETCH_BTC_FAILURE',

  'SELECT_OFFSET',

  'BUY_CURRENCY_REQUEST',
  'BUY_CURRENCY_SUCCESS',
  'BUY_CURRENCY_FAILURE',

  'SELL_CURRENCY_REQUEST',
  'SELL_CURRENCY_SUCCESS',
  'SELL_CURRENCY_FAILURE',
);

export const selected = handleActions(
  {
    [selectBtc]: () => 'btc',
  },
  'btc',
);
export const offset = handleActions(
  {
    [selectOffset]: (state, action) => action.payload,
  },
  '4h',
);
export const btc = handleActions(
  {
    [fetchBtcSuccess]: (state, action) => action.payload,
  },
  [],
);

export const isBtcLoading = handleActions(
  {
    [fetchBtcRequest]: () => true,
    [fetchBtcSuccess]: () => false,
    [fetchBtcFailure]: () => false,
  },
  false,
);

export default combineReducers({
  selected,
  offset,
  btc,
  isBtcLoading,
});

export const getOffset = state => state.currency.offset;
export const getSelected = state => state.currency.selected;
export const getIsBtcLoading = state => state.currency.isBtcLoading;

export const getCurrentBtcPurchase = state => {
  if (state.currency.btc[0]) return state.currency.btc[0].purchase;
  return 0;
};

export const getCurrentBtcSell = state => {
  if (state.currency && state.currency.btc[0]) return state.currency.btc[0].sell;
  return 0;
};

export const sellBtc = state => state.currency.btc.map(item => [new Date(item.mts), item.sell]);
export const purchaseBtc = state =>
  state.currency.btc.map(item => [new Date(item.mts), item.purchase]);
