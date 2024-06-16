import store from '@redux/store/configureStore';

import { ERROR_LOGIN } from '@redux/actions/login';

import { LoginError } from '@/interface';
import { getAnonymousApiClient } from './apiAnonymous';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiLogin(email: string) {
  const apiRoot = getAnonymousApiClient();

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
        if (body.count === 0) {
          store.dispatch(
            ERROR_LOGIN({ value: LoginError.ERROR_EMAIL, isLogin: false }),
          );
        } else {
          store.dispatch(
            ERROR_LOGIN({ value: LoginError.ERROR_PASSWORD, isLogin: false }),
          );
        }
      });
  } catch (error) {
    store.dispatch(
      ERROR_LOGIN({ value: 'Something went wrong', isLogin: false }),
    );
  }
}
