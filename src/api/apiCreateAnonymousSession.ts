import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

import tokenCache from '@/utils/tokenCache';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiCreateAnonymousSession() {
  const ctpClient = createCtpClientAnonymous();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    await apiRoot
      .withProjectKey({ projectKey })
      .get()
      .execute()
      .then((data) => {
        console.log('Project information --->', data);
        console.log(tokenCache.get());
      })
      .catch((error) => {
        console.log('ERROR --->', error);
      });
  } catch (error) {
    console.log('ERROR --->', error);
  }
  console.log('Got project information');
}
