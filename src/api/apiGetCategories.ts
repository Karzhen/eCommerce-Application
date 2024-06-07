import store from '@redux/store/configureStore';

import { CategoryM } from '@/interface';

import {
  GET_CATEGORIES,
  ERROR_GET_CATEGORIES,
} from '@/redux/actions/parameters';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

import generateCategory from '@utils/generateCategory';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiGetCategories() {
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
      .categories()
      .get({
        queryArgs: {
          sort: `name.${store.getState().local.language}`,
        },
      })
      .execute();

    const categories: CategoryM[] = [];
    result.body.results.forEach((element) => {
      categories.push(generateCategory(element));
    });
    store.dispatch(GET_CATEGORIES(categories));
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_GET_CATEGORIES(
          'Something went wrong. Please should try again later.',
        ),
      );
    }
  }
}
