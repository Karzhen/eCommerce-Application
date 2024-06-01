import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import store from '@redux/store/configureStore';
import { LOGIN } from '@redux/actions/login';
import tokenCache from '@utils/tokenCache';
import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import { Customer } from '@/interface';
import createUser from '@/utils/createCustomerObject';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiReloginWithToken() {
  const ctpClient = createCtpClientRefresh();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    const result = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .get()
      .execute();

    const customer = result.body;

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
    console.error('ERROR --->', error);
  }
}
