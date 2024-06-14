import store from '@redux/store/configureStore';

import { UPDATE_BASKET, ERROR_BASKET } from '@redux/actions/basket';

import { ProductBasket } from '@/interface';
import generateBasket from '@utils/generateBasket';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import apiCreateBasket from '@api/apiCreateBasket';

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

  if (store.getState().basket.id === '') {
    await apiCreateBasket();
  }

  try {
    const result1 = await apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: store.getState().basket.id })
      .get()
      .execute();

    const data = result1.body;

    let promoCodeId;
    let promoCode;
    if (data.discountCodes && data.discountCodes.length > 0) {
      promoCodeId = data.discountCodes[0].discountCode.id;

      const result2 = await apiRoot
        .withProjectKey({ projectKey })
        .discountCodes()
        .withId({ ID: promoCodeId })
        .get()
        .execute();

      promoCode = { promoCodeId, title: result2.body.code };
    }

    const basketItems: ProductBasket[] = [];
    data.lineItems.forEach((item) => {
      basketItems.push(generateBasket(item));
    });

    store.dispatch(
      UPDATE_BASKET({
        id: data.id,
        totalPrice: data.totalPrice.centAmount,
        totalQuantity: data.totalLineItemQuantity || 0,
        lastModified: data.lastModifiedAt,
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
