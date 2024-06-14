import { createAction } from '@reduxjs/toolkit';

import { Basket } from '@/interface';

export const CREATE_BASKET = createAction<string>('CREATE_BASKET');
export const UPDATE_BASKET = createAction<Basket>('UPDATE_BASKET');
export const DELETE_BASKET = createAction('DELETE_BASKET');
export const CLEAR_BASKET = createAction('CLEAR_BASKET');
export const ERROR_BASKET = createAction<string>('ERROR_GET_PRODUCT');
