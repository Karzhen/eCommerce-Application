import store from '@redux/store/configureStore';

import apiLogin from '@/api/apiLogin';
import apiFindEmail from '@api/apiFindEmail';
import apiCreateBasket from '@api/apiCreateBasket';
import apiGetBasket from '@api/apiGetBasket';

import { setRefreshToken } from '@utils/refreshToken';
import tokenCache from '@utils/tokenCache';

export default async function loginUser(login: string, password: string) {
  await apiLogin(login, password);
  const { refreshToken } = tokenCache.get();

  if (!store.getState().login.isLogin) {
    await apiFindEmail(login);
  } else if (refreshToken) {
    setRefreshToken(refreshToken);
  }

  await apiCreateBasket();
  await apiGetBasket();
}
