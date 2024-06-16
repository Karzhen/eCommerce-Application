import store from '@redux/store/configureStore';

import { UPDATE_BASKET, ERROR_BASKET } from '@redux/actions/basket';

import { ProductBasket } from '@/interface';

import {
  createApiBuilderFromCtpClient,
  type MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';

import generateBasket from '@utils/generateBasket';
import { getAnonymousApiClient } from './apiAnonymous';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiClearBasket() {
  let ctpClient;
  let apiRoot;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
    apiRoot = createApiBuilderFromCtpClient(ctpClient);
  } else {
    apiRoot = getAnonymousApiClient();
  }

  const idBasket = store.getState().basket.id;

  try {
    const result1 = await apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .get({
        queryArgs: {
          where: `id = "${store.getState().basket.id}"`,
        },
      })
      .execute();

    const { version } = result1.body.results[0];

    const actions: MyCartRemoveLineItemAction[] = store
      .getState()
      .basket.products.map((el) => ({
        action: 'removeLineItem',
        lineItemId: el.itemBasketId,
      }));

    const result2 = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .carts()
      .withId({ ID: idBasket })
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute();

    let promoCodeId;
    let promoCode;
    if (result2.body.discountCodes && result2.body.discountCodes.length > 0) {
      promoCodeId = result2.body.discountCodes[0].discountCode.id;

      const result3 = await apiRoot
        .withProjectKey({ projectKey })
        .discountCodes()
        .withId({ ID: promoCodeId })
        .get()
        .execute();

      promoCode = { promoCodeId, title: result3.body.code };
    }

    const basketItems: ProductBasket[] = [];
    result2.body.lineItems.forEach((item) => {
      basketItems.push(generateBasket(item));
    });

    store.dispatch(
      UPDATE_BASKET({
        id: result2.body.id,
        lastModified: result2.body.lastModifiedAt,
        totalPrice: result2.body.totalPrice.centAmount,
        discountOnTotalPrice:
          result2.body.discountOnTotalPrice?.discountedAmount.centAmount || 0,
        totalQuantity: result2.body.totalLineItemQuantity || 0,
        promoCode: promoCode || null,
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
