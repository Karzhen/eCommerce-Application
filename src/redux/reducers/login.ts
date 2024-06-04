import { createReducer } from '@reduxjs/toolkit';
import {
  LOGIN,
  ERROR_LOGIN,
  LOGOUT,
  UPDATE_USER,
  ERROR_UPDATE_PERSONAL_DATA,
  ERROR_UPDATE_PASSWORD,
  UPDATE_VERSION,
} from '@actions/login';
import { StateLogin } from '@/interface';

const initialState = {
  value: null,
  isLogin: false,
  user: null,
  version: 0,
  errorUpdate: null,
  errorChangePassword: null,
} as StateLogin;

const login = createReducer(initialState, (builder) => {
  builder
    .addCase(LOGIN, (state, action) => {
      const STATE = state;
      STATE.value = action.payload.value;
      STATE.isLogin = true;
      STATE.user = action.payload.user;
      STATE.version = action.payload.version;
    })
    .addCase(ERROR_LOGIN, (state, action) => {
      const STATE = state;
      STATE.value = action.payload.value;
      STATE.isLogin = false;
      STATE.user = null;
      STATE.version = null;
    })
    .addCase(LOGOUT, (state) => {
      const STATE = state;
      STATE.value = '';
      STATE.isLogin = false;
      STATE.user = null;
      STATE.version = null;
    })
    .addCase(UPDATE_USER, (state, action) => {
      const { user } = action.payload;
      if (user) {
        const STATE = state;
        STATE.user = user;
        STATE.errorUpdate = null;
        STATE.version = user.version;
      }
    })
    .addCase(UPDATE_VERSION, (state, action) => {
      const STATE = state;
      STATE.version = action.payload;
    })
    .addCase(ERROR_UPDATE_PERSONAL_DATA, (state, action) => {
      const STATE = state;
      STATE.errorUpdate = action.payload;
    })
    .addCase(ERROR_UPDATE_PASSWORD, (state, action) => {
      const STATE = state;
      STATE.errorChangePassword = action.payload;
    });
});

export default login;
