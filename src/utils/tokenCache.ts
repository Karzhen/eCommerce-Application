import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  myCache: TokenStore;

  constructor(
    initialCache: TokenStore = {
      token: '',
      refreshToken: '',
      expirationTime: 0,
    },
  ) {
    this.myCache = initialCache;
  }

  set(newCache: TokenStore): void {
    this.myCache = newCache;
  }

  get(): TokenStore {
    return this.myCache;
  }
}
const tokenCache = new MyTokenCache();
export default tokenCache;
