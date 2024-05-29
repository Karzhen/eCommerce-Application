import { createReducer } from '@reduxjs/toolkit';

import {
  GET_CATEGORIES,
  ERROR_GET_CATEGORIES,
  GET_ATTRIBUTES,
  ERROR_GET_ATTRIBUTES,
} from '@/redux/actions/parameters';

import { StateParameters } from '@/interface';

const initialState: StateParameters = {
  categories: [],
  attributes: {},
  error: '',
};

const parameters = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_CATEGORIES, (state, action) => {
      const STATE = state;
      STATE.categories = action.payload;
    })
    .addCase(ERROR_GET_CATEGORIES, (state, action) => {
      const STATE = state;
      STATE.error = action.payload;
    })
    .addCase(GET_ATTRIBUTES, (state, action) => {
      const STATE = state;
      STATE.attributes = action.payload;
    })
    .addCase(ERROR_GET_ATTRIBUTES, (state, action) => {
      const STATE = state;
      STATE.error = action.payload;
    });
});

export default parameters;
