import store from '@redux/store/configureStore';
import { LOGIN, ERROR_LOGIN } from '@redux/actions/login';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import tokenCache from '@/utils/tokenCache';
import createCtpClientPassword from '@api/buildClient/buildClientPasswordFlow';
import { Customer } from '@/interface';
import createUser from '@/utils/createCustomerObject';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiLogin(login: string, password: string) {
  const ctpClient = createCtpClientPassword(login, password);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    const result = await apiRoot
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
    const { customer } = result.body;

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
          value: 'Something went wrong. Please should try again later.',
          isLogin: false,
          user: null,
          version: null,
        }),
      );
    }
  }
}
