import store from '@redux/store/configureStore';

import { AttributeM } from '@/interface';

import generateAttribute from '@utils/generateAttribute';

import {
  GET_ATTRIBUTES,
  ERROR_GET_ATTRIBUTES,
} from '@/redux/actions/parameters';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import { getAnonymousApiClient } from './apiAnonymous';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiGetAttributes() {
  let ctpClient;
  let apiRoot;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
    apiRoot = createApiBuilderFromCtpClient(ctpClient);
  } else {
    apiRoot = getAnonymousApiClient();
  }

  const ID_TYPE = '8423575c-eb4c-4fa1-bcb8-2cee21834968';

  try {
    const result = await apiRoot
      .withProjectKey({ projectKey })
      .productTypes()
      .get({
        queryArgs: {
          where: `id="${ID_TYPE}"`,
          priceCurrency: `"${store.getState().local.currencyCode}"`,
        },
      })
      .execute();

    const attributes: { [id: string]: AttributeM } = {};
    result.body.results[0].attributes?.forEach((element) => {
      attributes[element.name] = generateAttribute(element);
    });
    store.dispatch(GET_ATTRIBUTES(attributes));
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_GET_ATTRIBUTES(
          'Something went wrong. Please should try again later.',
        ),
      );
    }
  }
}
