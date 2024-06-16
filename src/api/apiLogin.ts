import store from '@redux/store/configureStore';
import { LOGIN, ERROR_LOGIN } from '@redux/actions/login';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import tokenCache from '@/utils/tokenCache';
import createCtpClientPassword from '@api/buildClient/buildClientPasswordFlow';
import { Customer } from '@/interface';
import createUser from '@/utils/createCustomerObject';
import { getAnonymousApiClient } from './apiAnonymous';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiLogin(login: string, password: string) {
  let apiRoot = getAnonymousApiClient();

  try {
    const anonymousResult = await apiRoot
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

    if (anonymousResult.statusCode === 200) {
      // Проверяем успешный ответ на логин для анонимного клиента

      const ctpClient = createCtpClientPassword(login, password);
      apiRoot = createApiBuilderFromCtpClient(ctpClient);

      try {
        const loginResult = await apiRoot
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
        const { customer } = loginResult.body;

        const user = createUser(customer as Customer);
        const currentVersion = customer.version;

        store.dispatch(
          LOGIN({
            value: tokenCache.get().refreshToken || '',
            isLogin: true,
            user,
            version: currentVersion,
          }),
        );
      } catch (error) {
        if (error instanceof Error) {
          store.dispatch(
            ERROR_LOGIN({
              value: 'Something went wrong. Please try again later.',
              isLogin: false,
              user: null,
              version: null,
            }),
          );
        }
      }
    } else {
      store.dispatch(
        ERROR_LOGIN({
          value: 'Failed to login anonymously.',
          isLogin: false,
          user: null,
          version: null,
        }),
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_LOGIN({
          value: 'Something went wrong. Please try again later.',
          isLogin: false,
          user: null,
          version: null,
        }),
      );
    }
  }
}
