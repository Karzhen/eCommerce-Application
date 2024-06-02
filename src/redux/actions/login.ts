import { createAction } from '@reduxjs/toolkit';
import { Customer, StateLogin } from '@/interface';

export const LOGIN = createAction<StateLogin>('LOGIN');
export const ERROR_LOGIN = createAction<StateLogin>('ERROR_LOGIN');
export const LOGOUT = createAction('LOGOUT');

export const UPDATE_VERSION = createAction<number>('UPDATE_VERSION');
export const UPDATE_USER = createAction<{ user: Customer }>('UPDATE_USER');
export const ERROR_UPDATE_PERSONAL_DATA = createAction<string | null>(
  'ERROR_UPDATE_PERSONAL_DATA',
);
export const ERROR_UPDATE_PASSWORD = createAction<string | null>(
  'ERROR_UPDATE_PASSWORD',
);
