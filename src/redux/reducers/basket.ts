import { createReducer } from '@reduxjs/toolkit';

import {
  CREATE_BASKET,
  GET_BASKET,
  ADD_TO_BASKET,
  ERROR_BASKET,
} from '@/redux/actions/basket';

import { BasketState } from '@/interface';

const initialState: BasketState = {
  id: '',
  products: [],
  version: 0,
  error: '',
};

const products = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_BASKET, (state, action) => {
      const STATE = state;
      STATE.id = action.payload;
    })
    .addCase(GET_BASKET, (state, action) => {
      const STATE = state;
      STATE.version = action.payload.version;
      STATE.products = action.payload.products;
    })
    .addCase(ADD_TO_BASKET, (state, action) => {
      const STATE = state;
      STATE.version = action.payload.version;
      STATE.products.push(action.payload.product);
    })
    .addCase(ERROR_BASKET, (state, action) => {
      const STATE = state;
      STATE.error = action.payload;
    });
});

export default products;
