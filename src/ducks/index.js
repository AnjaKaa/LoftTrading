import { combineReducers } from 'redux';
import currency from './currency';
import auth from './auth';
import reg from './reg';
import wallet from './wallet';
import transactions from './transactions';

export default combineReducers({
  auth,
  reg,
  currency,
  wallet,
  transactions,
});
