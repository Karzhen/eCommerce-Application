import { createReducer } from '@reduxjs/toolkit';

import { REGISTER, ERROR_REGISTER } from '@actions/register';

import { StateRegister } from '@/interface';

const register = createReducer(
  { value: null, isRegister: false } as StateRegister,
  (builder) => {
    builder
      .addCase(REGISTER, (state, action) => {
        const STATE = state;
        STATE.value = action.payload.value;
        STATE.isRegister = true;
      })
      .addCase(ERROR_REGISTER, (state, action) => {
        const STATE = state;
        STATE.value = action.payload.value;
        STATE.isRegister = false;
      });
  },
);

export default register;
