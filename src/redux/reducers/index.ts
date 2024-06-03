import { combineReducers } from '@reduxjs/toolkit';
import login from '@reducers/login';
import register from '@reducers/register';
import products from '@reducers/products';
import parameters from '@reducers/parameters';
import local from '@reducers/local';
import filter from '@reducers/filter';
import product from '@reducers/product';

export default combineReducers({
  login,
  register,
  products,
  parameters,
  local,
  filter,
  product,
});
