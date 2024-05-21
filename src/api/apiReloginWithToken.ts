import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import store from '@redux/store/configureStore';
import { LOGIN } from '@redux/actions/login';

import tokenCache from '@utils/tokenCache';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiReloginWithToken() {
  const ctpClient = createCtpClientRefresh();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    await apiRoot.withProjectKey({ projectKey }).me().get().execute();

    store.dispatch(
      LOGIN({ value: tokenCache.get().refreshToken || '', isLogin: true }),
    );
  } catch (error) {
    console.log('ERROR --->', error);
  }
}
