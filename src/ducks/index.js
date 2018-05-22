import { combineReducers } from 'redux';
import currency from './currency';
import auth from './auth';
import reg from './reg';

export default combineReducers({
  auth,
  reg,
  currency,
});
