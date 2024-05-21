import store from '@redux/store/configureStore';

import { LOGIN, ERROR_LOGIN } from '@redux/actions/login';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import tokenCache from '@/utils/tokenCache';
import createCtpClientPassword from '@api/buildClient/buildClientPasswordFlow';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiLogin(login: string, password: string) {
  const ctpClient = createCtpClientPassword(login, password);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .login()
      .post({
        body: {
          email: login,
          password,
        },
      })
      .execute();

    store.dispatch(
      LOGIN({ value: tokenCache.get().refreshToken || '', isLogin: true }),
    );
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_LOGIN({
          value: 'Something went wrong. Please should try again later.',
          isLogin: false,
        }),
      );
    }
  }
}
