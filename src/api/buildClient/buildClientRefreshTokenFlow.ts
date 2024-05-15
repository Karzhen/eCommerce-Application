import fetch from 'node-fetch';
import {
  ClientBuilder,
  type RefreshAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import tokenCache from '@utils/tokenCache';
import { getRefreshToken } from '@utils/refreshToken';

export default function createCtpClientRefresh() {
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
  const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;
  const hostApi = import.meta.env.VITE_CTP_API_URL;

  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: hostAuth,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    refreshToken: getRefreshToken() || '',
    tokenCache,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: hostApi || '',
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
}
