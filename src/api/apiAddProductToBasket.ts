import store from '@redux/store/configureStore';

import { ADD_TO_BASKET, ERROR_BASKET } from '@redux/actions/basket';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

import generateBasket from '@utils/generateBasket';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiGetBasket(
  productId: string,
  variantId: number,
) {
  let ctpClient;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
  } else {
    ctpClient = createCtpClientAnonymous();
  }

  const apiRoot = createApiBuilderFromCtpClient(ctpClient);
  const idBasket = store.getState().basket.id;

  try {
    const result = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .carts()
      .withId({ ID: idBasket })
      .post({
        body: {
          version: store.getState().basket.version,
          actions: [
            {
              'action': 'addLineItem',
              'productId': productId,
              'variantId': variantId,
              'quantity': 1,
            },
          ],
        },
      })
      .execute();

    const product = generateBasket(result.body.lineItems[0]);

    store.dispatch(
      ADD_TO_BASKET({
        basketId: result.body.id,
        version: result.body.version,
        product,
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_BASKET('Something went wrong. Please should try again later.'),
      );
    }
  }
}
