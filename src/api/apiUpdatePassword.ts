import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import store from '@/redux/store/configureStore';
import tokenCache from '@/utils/tokenCache';
import loginUser from '@/utils/login';
import { ERROR_UPDATE_PASSWORD } from '@/redux/actions/login';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

const ctpClient = createCtpClientRefresh();
const apiRoot = createApiBuilderFromCtpClient(ctpClient);

export default async function apiUpdatePassword(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const data = store.getState().login;

    const result = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .password()
      .post({
        body: {
          'version': data.version || 0,
          'currentPassword': currentPassword,
          'newPassword': newPassword,
        },
      })
      .execute();
    if (result.body) {
      console.log(result.body);
    }
    if (result.statusCode === 200) {
      tokenCache.clear();
      loginUser(store.getState().login.user?.email as string, newPassword);
      store.dispatch(ERROR_UPDATE_PASSWORD(null));
    }
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(ERROR_UPDATE_PASSWORD(error.message));
    }
  }
}
