import { createAction } from '@reduxjs/toolkit';

import { ProductM } from '@/interface';

export const GET_PRODUCTS = createAction<ProductM[]>('GET_PRODUCTS');
export const ERROR_GET_PRODUCTS = createAction<string>('ERROR_GET_PRODUCTS');
export const GET_COUNT_OF_PRODUCTS = createAction<{
  total: number;
  limit: number;
  offset: number;
}>('GET_COUNT_OF_PRODUCTS');
