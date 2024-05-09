import { createAction } from '@reduxjs/toolkit';

import { StateRegister } from '@/interface';

export const REGISTER = createAction<StateRegister>('REGISTER');
export const ERROR_REGISTER = createAction<StateRegister>('ERROR_REGISTER');
