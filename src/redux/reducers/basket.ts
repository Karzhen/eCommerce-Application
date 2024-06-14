import { createReducer } from '@reduxjs/toolkit';

import {
  CREATE_BASKET,
  UPDATE_BASKET,
  CLEAR_BASKET,
  DELETE_BASKET,
  ERROR_BASKET,
} from '@/redux/actions/basket';

import { BasketState } from '@/interface';

const initialState: BasketState = {
  id: '',
  totalPrice: 0,
  totalQuantity: 0,
  discountOnTotalPrice: 0,
  lastModified: '',
  promoCode: null,
  products: [],
  error: '',
};

const products = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_BASKET, (state, action) => {
      const STATE = state;
      STATE.id = action.payload;
      STATE.error = '';
    })
    .addCase(UPDATE_BASKET, (state, action) => {
      const STATE = state;
      STATE.totalPrice = action.payload.totalPrice;
      STATE.discountOnTotalPrice = action.payload.discountOnTotalPrice;
      STATE.totalQuantity = action.payload.totalQuantity;
      STATE.lastModified = action.payload.lastModified;
      STATE.promoCode = action.payload.promoCode;
      STATE.products = action.payload.products;
      STATE.error = '';
    })
    .addCase(ERROR_BASKET, (state, action) => {
      const STATE = state;
      STATE.error = action.payload;
    })
    .addCase(CLEAR_BASKET, (state) => {
      const STATE = state;
      STATE.totalPrice = 0;
      STATE.discountOnTotalPrice = 0;
      STATE.totalQuantity = 0;
      STATE.lastModified = '';
      STATE.promoCode = null;
      STATE.products = [];
      STATE.error = '';
    })
    .addCase(DELETE_BASKET, (state) => {
      const STATE = state;
      STATE.id = '';
      STATE.totalPrice = 0;
      STATE.discountOnTotalPrice = 0;
      STATE.totalQuantity = 0;
      STATE.lastModified = '';
      STATE.promoCode = null;
      STATE.products = [];
      STATE.error = '';
    });
});

export default products;
