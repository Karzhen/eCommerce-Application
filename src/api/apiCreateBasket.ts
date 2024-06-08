import store from '@redux/store/configureStore';

import { CREATE_BASKET, ERROR_BASKET } from '@redux/actions/basket';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiGetBasket() {
  let ctpClient;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
  } else {
    ctpClient = createCtpClientAnonymous();
  }

  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  let result1;
  let result2;

  try {
    result1 = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .carts()
      .get()
      .execute();
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_BASKET('Something went wrong. Please should try again later.'),
      );
    }
  }

  if (result1 && result1.body.count > 0) {
    store.dispatch(CREATE_BASKET(result1.body.results[0].id));
  } else {
    try {
      result2 = await apiRoot
        .withProjectKey({ projectKey })
        .me()
        .carts()
        .post({
          body: { currency: store.getState().local.currencyCode },
        })
        .execute();

      store.dispatch(CREATE_BASKET(result2.body.id));
    } catch (error) {
      if (error instanceof Error) {
        store.dispatch(
          ERROR_BASKET('Something went wrong. Please should try again later.'),
        );
      }
    }
  }
}
