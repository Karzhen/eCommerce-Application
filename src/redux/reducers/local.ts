import { createReducer } from '@reduxjs/toolkit';

import SET_LOCAL from '@actions/local';

import { CurrencyCode, Language, StateLocal } from '@/interface';

const initialState: StateLocal = {
  language: Language.EN,
  currencyCode: CurrencyCode.EN,
};

const local = createReducer(initialState, (builder) => {
  builder.addCase(SET_LOCAL, (state, action) => {
    const STATE = state;
    STATE.language = action.payload.language;
    STATE.currencyCode = action.payload.currencyCode;
  });
});

export default local;
