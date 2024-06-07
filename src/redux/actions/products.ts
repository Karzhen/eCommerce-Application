import { createAction } from '@reduxjs/toolkit';

import { ProductM } from '@/interface';

export const GET_PRODUCTS = createAction<ProductM[]>('GET_PRODUCTS');
export const ERROR_GET_PRODUCTS = createAction<string>('ERROR_GET_PRODUCTS');
