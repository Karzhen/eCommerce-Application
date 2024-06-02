import { createAction } from '@reduxjs/toolkit';

// import { StateLocal } from '@/interface';

export const SET_CATEGORIES = createAction<string[]>('SET_CATEGORIES');
export const SET_SORT = createAction<{ name: string; order: string }>(
  'SET_SORT',
);
export const SET_BRAND = createAction<string>('SET_BRAND');
export const SET_COLOR = createAction<string>('SET_COLOR');
export const SET_SIZE1 = createAction<boolean>('SET_SIZE1');
export const SET_SIZE2 = createAction<boolean>('SET_SIZE2');
export const SET_SIZE3 = createAction<boolean>('SET_SIZE3');
export const SET_START_PRICE = createAction<number>('SET_START_PRICE');
export const SET_END_PRICE = createAction<number>('SET_END_PRICE');
export const SET_SEARCH = createAction<string>('SET_SEARCH');
