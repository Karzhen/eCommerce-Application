import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export default function createCtpClientAnonymous() {
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const scopes = import.meta.env.VITE_CTP_SCOPES?.split(' ') || [''];
  const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
  const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;
  const hostApi = import.meta.env.VITE_CTP_API_URL;

  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: hostAuth || '',
    projectKey: projectKey || '',
    credentials: {
      clientId: clientId || '',
      clientSecret: clientSecret || '',
    },
    scopes,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: hostApi || '',
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

  return ctpClient;
}
