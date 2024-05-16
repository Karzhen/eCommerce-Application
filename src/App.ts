import router from '@/router/router';

import { getRefreshToken } from '@utils/refreshToken';

import apiCreateAnonymousSession from '@api/apiCreateAnonymousSession';
import apiReloginWithToken from '@api/apiReloginWithToken';

export default async function createApp() {
  if (getRefreshToken() !== null) {
    await apiReloginWithToken();
  } else {
    await apiCreateAnonymousSession();
  }
  router.init();
}
