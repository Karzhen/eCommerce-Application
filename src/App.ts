import store from '@redux/store/configureStore';

import router from '@/router/router';

import { getRefreshToken } from '@utils/refreshToken';

import apiCreateAnonymousSession from '@api/apiCreateAnonymousSession';
import apiReloginWithToken from '@api/apiReloginWithToken';
import apiCreateBasket from '@api/apiCreateBasket';
import apiGetBasket from '@api/apiGetBasket';

export default async function createApp() {
  if (getRefreshToken() !== null) {
    await apiReloginWithToken();
  } else {
    await apiCreateAnonymousSession();
  }
  await apiCreateBasket();
  await apiGetBasket(store.getState().basket.id);
  router.init();
}
