import { createAction } from '@reduxjs/toolkit';

import { ProductData } from '@commercetools/platform-sdk';

export const GET_PRODUCT = createAction<ProductData>('GET_PRODUCT');
export const ERROR_GET_PRODUCT = createAction<string>('ERROR_GET_PRODUCT');
