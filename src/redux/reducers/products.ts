import { createReducer } from '@reduxjs/toolkit';

import {
  GET_PRODUCTS,
  ERROR_GET_PRODUCTS,
  GET_COUNT_OF_PRODUCTS,
} from '@/redux/actions/products';

import { StateProducts } from '@/interface';

const initialState: StateProducts = {
  value: [],
  error: '',
  countProducts: {
    total: 0,
    limit: 0,
    offset: 0,
  },
};

const products = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_PRODUCTS, (state, action) => {
      const STATE = state;
      STATE.value = action.payload;
    })
    .addCase(ERROR_GET_PRODUCTS, (state, action) => {
      const STATE = state;
      STATE.error = action.payload;
    })
    .addCase(GET_COUNT_OF_PRODUCTS, (state, action) => {
      const STATE = state;
      STATE.countProducts = action.payload;
    });
});

export default products;
