import { createReducer } from '@reduxjs/toolkit';

import { GET_PROMO_CODES, ERROR_PROMO_CODES } from '@actions/promoCode';

const initialState: {
  promoCodes: { promoCodeId: string; title: string; description: string }[];
  error: string;
} = {
  promoCodes: [],
  error: '',
};

const local = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_PROMO_CODES, (state, action) => {
      const STATE = state;
      STATE.promoCodes = action.payload;
      STATE.error = '';
    })
    .addCase(ERROR_PROMO_CODES, (state, action) => {
      const STATE = state;
      STATE.error = action.payload;
    });
});

export default local;
