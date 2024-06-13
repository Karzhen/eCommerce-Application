import { createAction } from '@reduxjs/toolkit';

import { ProductVariants } from '@/interface';

export const GET_PRODUCT = createAction<ProductVariants>('GET_PRODUCT');
export const ERROR_GET_PRODUCT = createAction<string>('ERROR_GET_PRODUCT');
