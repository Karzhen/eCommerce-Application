import fetch from 'node-fetch';
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import tokenCache from '@/utils/tokenCache';

export default function createCtpClientPassword(
  username: string,
  password: string,
) {
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
  const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;
  const hostApi = import.meta.env.VITE_CTP_API_URL;

  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: hostAuth,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password,
      },
    },
    tokenCache,
    scopes: [`manage_project:${projectKey}`],
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: hostApi || '',
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
}
