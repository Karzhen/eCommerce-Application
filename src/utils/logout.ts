import store from '@redux/store/configureStore';
import { LOGOUT } from '@redux/actions/login';
import { DELETE_BASKET } from '@/redux/actions/basket';
import { resetAnonymousApiClient } from '@/api/apiAnonymous';
import { removeRefreshToken } from '@utils/refreshToken';
import tokenCache from './tokenCache';

export default async function logoutUser() {
  store.dispatch(LOGOUT());
  store.dispatch(DELETE_BASKET());
  resetAnonymousApiClient();
  removeRefreshToken();
  tokenCache.clear();
}
