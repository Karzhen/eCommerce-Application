import { createAction } from '@reduxjs/toolkit';

import { StateLocal } from '@/interface';

const SET_LOCAL = createAction<StateLocal>('SET_LOCAL');

export default SET_LOCAL;
