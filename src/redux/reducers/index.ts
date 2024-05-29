import { combineReducers } from '@reduxjs/toolkit';
import login from '@reducers/login';
import register from '@reducers/register';
import products from '@reducers/products';
import parameters from '@reducers/parameters';
import local from '@reducers/local';

export default combineReducers({
  login,
  register,
  products,
  parameters,
  local,
});
