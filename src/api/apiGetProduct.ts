import store from '@redux/store/configureStore';

import { GET_PRODUCT, ERROR_GET_PRODUCT } from '@redux/actions/product';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiGetEachProduct(productID: string) {
  let ctpClient;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
  } else {
    ctpClient = createCtpClientAnonymous();
  }

  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .products()
      .withId({ ID: productID })
      .get()
      .execute();

    store.dispatch(GET_PRODUCT(response.body.masterData.current));
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_GET_PRODUCT(
          'Something went wrong. Please should try again later.',
        ),
      );
    }
  }
}
