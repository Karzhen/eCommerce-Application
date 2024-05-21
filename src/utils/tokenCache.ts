import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

import { setRefreshToken } from '@utils/refreshToken';

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
    if (newCache.refreshToken) {
      setRefreshToken(newCache.refreshToken);
    }
  }

  get(): TokenStore {
    return this.myCache;
  }
}
const tokenCache = new MyTokenCache();
export default tokenCache;
