import { createReducer } from '@reduxjs/toolkit';

import { GET_PRODUCT, ERROR_GET_PRODUCT } from '@/redux/actions/product';

import { StateProduct } from '@/interface';

const initialState: StateProduct = { value: {}, error: '' };

const products = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_PRODUCT, (state, action) => {
      const STATE = state;
      STATE.value = action.payload;
    })
    .addCase(ERROR_GET_PRODUCT, (state, action) => {
      const STATE = state;
      STATE.error = action.payload;
    });
});

export default products;
