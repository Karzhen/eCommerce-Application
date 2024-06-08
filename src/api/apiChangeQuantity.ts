import store from '@redux/store/configureStore';

import { GET_BASKET, ERROR_BASKET } from '@redux/actions/basket';

import { ProductBasket } from '@/interface';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

import generateBasket from '@utils/generateBasket';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiChangeQuantity(
  itemBasketId: string,
  quantity: number,
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
              'action': 'changeLineItemQuantity',
              'lineItemId': itemBasketId,
              'quantity': quantity,
            },
          ],
        },
      })
      .execute();

    console.log(result.body);

    const basketItems: ProductBasket[] = [];
    result.body.lineItems.forEach((item) => {
      basketItems.push(generateBasket(item));
    });

    store.dispatch(
      GET_BASKET({
        id: result.body.id,
        version: result.body.version,
        lastModified: result.body.lastModifiedAt,
        totalPrice: result.body.totalPrice.centAmount,
        totalQuantity: result.body.totalLineItemQuantity || 0,
        products: basketItems,
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
