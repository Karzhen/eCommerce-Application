import { createAction } from '@reduxjs/toolkit';

import { CategoryM, AttributeM } from '@/interface';

export const GET_CATEGORIES = createAction<CategoryM[]>('GET_CATEGORIES');
export const GET_ATTRIBUTES = createAction<{ [id: string]: AttributeM }>(
  'GET_ATTRIBUTES',
);
export const ERROR_GET_CATEGORIES = createAction<string>(
  'ERROR_GET_CATEGORIES',
);
export const ERROR_GET_ATTRIBUTES = createAction<string>(
  'ERROR_GET_ATTRIBUTES',
);
