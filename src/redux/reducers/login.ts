import { createReducer } from '@reduxjs/toolkit';

import { LOGIN, ERROR_LOGIN, LOGOUT } from '@actions/login';

import { StateLogin } from '@/interface';

const login = createReducer(
  { value: null, isLogin: false } as StateLogin,
  (builder) => {
    builder
      .addCase(LOGIN, (state, action) => {
        const STATE = state;
        STATE.value = action.payload.value;
        STATE.isLogin = true;
      })
      .addCase(ERROR_LOGIN, (state, action) => {
        const STATE = state;
        STATE.value = action.payload.value;
        STATE.isLogin = false;
      })
      .addCase(LOGOUT, (state) => {
        const STATE = state;
        STATE.value = '';
        STATE.isLogin = false;
      });
  },
);

export default login;
