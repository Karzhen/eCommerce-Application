import { combineReducers } from '@reduxjs/toolkit';
import login from '@reducers/login';
import register from '@reducers/register';

export default combineReducers({
  login,
  register,
});
