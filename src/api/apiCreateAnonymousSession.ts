import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiCreateAnonymousSession() {
  const ctpClient = createCtpClientAnonymous();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    await apiRoot.withProjectKey({ projectKey }).get().execute();
  } catch (error) {
    console.error('ERROR --->', error);
  }
}
