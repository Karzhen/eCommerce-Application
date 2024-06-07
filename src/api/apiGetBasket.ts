import store from '@redux/store/configureStore';

import { GET_BASKET, ERROR_BASKET } from '@redux/actions/basket';

import { ProductM } from '@/interface';
import generateBasket from '@utils/generateBasket';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

// const idBasket = 'de325073-75c0-484b-86be-e5db9758bf10';

export default async function apiGetBasket(idBasket: string) {
  let ctpClient;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
  } else {
    ctpClient = createCtpClientAnonymous();
  }

  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    const result = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .carts()
      .withId({ ID: idBasket })
      .get()
      .execute();

    const basketItems: ProductM[] = [];
    result.body.lineItems.forEach((item) => {
      basketItems.push(generateBasket(item));
    });

    store.dispatch(
      GET_BASKET({
        id: result.body.id,
        version: result.body.version,
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
