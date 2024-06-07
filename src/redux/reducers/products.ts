import { createReducer } from '@reduxjs/toolkit';

import { GET_PRODUCTS, ERROR_GET_PRODUCTS } from '@/redux/actions/products';

import { StateProducts } from '@/interface';

const initialState: StateProducts = { value: [], error: '' };

const products = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_PRODUCTS, (state, action) => {
      const STATE = state;
      STATE.value = action.payload;
    })
    .addCase(ERROR_GET_PRODUCTS, (state, action) => {
      const STATE = state;
      STATE.error = action.payload;
    });
});

export default products;
