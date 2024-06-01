import store from '@redux/store/configureStore';
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

    // if (!response.body) {
    //     throw new Error('Failed to fetch product info');
    // }
    console.log(response.body.masterData.current);
    return response.body.masterData.current;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}
