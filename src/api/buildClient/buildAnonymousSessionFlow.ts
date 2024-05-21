import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export default function createCtpClientAnonymous() {
  const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;
  const clientId: string = import.meta.env.VITE_CTP_CLIENT_ID;
  const clientSecret: string = import.meta.env.VITE_CTP_CLIENT_SECRET;
  const authHost: string = import.meta.env.VITE_CTP_AUTH_URL;
  const apiHost: string = import.meta.env.VITE_CTP_API_URL;
  const scopes: string[] = import.meta.env.VITE_CTP_SCOPES?.split(' ') || [''];

  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHost,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
}
