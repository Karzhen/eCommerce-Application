import store from '@redux/store/configureStore';
import { LOGOUT } from '@redux/actions/login';
import { DELETE_BASKET } from '@/redux/actions/basket';

import { removeRefreshToken } from '@utils/refreshToken';
import tokenCache from './tokenCache';

export default async function logoutUser() {
  store.dispatch(LOGOUT());
  store.dispatch(DELETE_BASKET());
  removeRefreshToken();
  tokenCache.clear();
}
