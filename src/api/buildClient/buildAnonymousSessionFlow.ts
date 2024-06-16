import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import store from '@/redux/store/configureStore';
import { SET_ANONYMOUS_ID } from '@/redux/actions/basket';

export default function createCtpClientAnonymous() {
  const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;
  const clientId: string = import.meta.env.VITE_CTP_CLIENT_ID;
  const clientSecret: string = import.meta.env.VITE_CTP_CLIENT_SECRET;
  const authHost: string = import.meta.env.VITE_CTP_AUTH_URL;
  const apiHost: string = import.meta.env.VITE_CTP_API_URL;
  const scopes: string[] = import.meta.env.VITE_CTP_SCOPES?.split(' ') || [''];
  const anonymousID =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  store.dispatch(SET_ANONYMOUS_ID(anonymousID));

  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      anonymousId: anonymousID,
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
