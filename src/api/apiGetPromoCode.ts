import store from '@redux/store/configureStore';

import { GET_PROMO_CODES, ERROR_PROMO_CODES } from '@/redux/actions/promoCode';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import { getAnonymousApiClient } from './apiAnonymous';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiGetPromoCodes() {
  let ctpClient;
  let apiRoot;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
    apiRoot = createApiBuilderFromCtpClient(ctpClient);
  } else {
    apiRoot = getAnonymousApiClient();
  }

  try {
    const result = await apiRoot
      .withProjectKey({ projectKey })
      .discountCodes()
      .get()
      .execute();

    const promoCodes = result.body.results.map((el) => ({
      promoCodeId: el.id,
      title: el.code,
      description: el.description?.en || '',
    }));

    store.dispatch(GET_PROMO_CODES(promoCodes));
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_PROMO_CODES(
          'Something went wrong. Please should try again later.',
        ),
      );
    }
  }
}
