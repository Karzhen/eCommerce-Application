import { createAction } from '@reduxjs/toolkit';

import { Basket, ProductBasket } from '@/interface';

export const CREATE_BASKET = createAction<string>('CREATE_BASKET');
export const ADD_TO_BASKET = createAction<{
  basketId: string;
  version: number;
  product: ProductBasket;
}>('ADD_TO_BASKET');
export const CHANGE_QUANTITY = createAction<{
  basketId: string;
  version: number;
  itemBAsketId: string;
  quantity: number;
}>('CHANGE_QUANTITY');
export const GET_BASKET = createAction<Basket>('GET_BASKET');
export const ERROR_BASKET = createAction<string>('ERROR_GET_PRODUCT');
