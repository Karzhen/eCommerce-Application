import { createAction } from '@reduxjs/toolkit';

export const GET_PROMO_CODES =
  createAction<{ promoCodeId: string; title: string; description: string }[]>(
    'GET_PROMO_CODES',
  );

export const ERROR_PROMO_CODES = createAction<string>('ERROR_GET_PRODUCTS');
