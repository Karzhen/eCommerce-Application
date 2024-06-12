import { createAction } from '@reduxjs/toolkit';

import {ProductM} from "@/interface";

export const GET_PRODUCT = createAction<ProductM>('GET_PRODUCT');
export const ERROR_GET_PRODUCT = createAction<string>('ERROR_GET_PRODUCT');
