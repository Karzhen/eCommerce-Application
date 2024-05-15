import store from '@redux/store/configureStore';
import { LOGOUT } from '@redux/actions/login';

import { removeRefreshToken } from '@utils/refreshToken';

export default function logoutUser() {
  store.dispatch(LOGOUT());
  removeRefreshToken();
}
