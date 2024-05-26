import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import { getRefreshToken } from './refreshToken';

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
    const refreshToken = getRefreshToken();
    if (refreshToken && !this.myCache.refreshToken) {
      this.myCache.refreshToken = refreshToken;
    }
  }

  clear(): void {
    this.myCache = {
      token: '',
      refreshToken: '',
      expirationTime: 0,
    };
  }

  get(): TokenStore {
    return this.myCache;
  }
}
const tokenCache = new MyTokenCache();
export default tokenCache;
