import { createAction } from '@reduxjs/toolkit';

import { StateLogin } from '@/interface';

export const LOGIN = createAction<StateLogin>('LOGIN');
export const ERROR_LOGIN = createAction<StateLogin>('ERROR_LOGIN');
export const LOGOUT = createAction('LOGOUT');
