import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import createCtpClientAnonymous from './buildClient/buildAnonymousSessionFlow';

let anonymousApiRoot: ApiRoot | null = null;

export function getAnonymousApiClient(): ApiRoot {
  if (!anonymousApiRoot) {
    const ctpClient = createCtpClientAnonymous();
    anonymousApiRoot = createApiBuilderFromCtpClient(ctpClient);
  }
  return anonymousApiRoot;
}

export function resetAnonymousApiClient(): void {
  anonymousApiRoot = null;
}
