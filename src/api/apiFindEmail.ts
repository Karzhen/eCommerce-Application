import store from '@redux/store/configureStore';

import { ERROR_LOGIN } from '@redux/actions/login';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

import { LoginError } from '@/interface';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiLogin(email: string) {
  const ctpClient = createCtpClientAnonymous();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`,
        },
      })
      .execute()
      .then(({ body }) => {
        console.log('Has email --->', body);
        console.log(body.count);
        if (body.count === 0) {
          store.dispatch(
            ERROR_LOGIN({ value: LoginError.ERROR_EMAIL, isLogin: false }),
          );
        } else {
          store.dispatch(
            ERROR_LOGIN({ value: LoginError.ERROR_PASSWORD, isLogin: false }),
          );
        }
  } catch (error) {
    console.log('ERROR --->', error);
    store.dispatch(
      ERROR_LOGIN({ value: 'Something went wrong', isLogin: false }),
    );
  }
}
