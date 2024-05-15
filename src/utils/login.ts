import store from '@redux/store/configureStore';
import apiLogin from '@/api/apiLogin';
import apiFindEmail from '@api/apiFindEmail';

export default async function loginUser(login: string, password: string) {
  await apiLogin(login, password);

  if (!store.getState().login.isLogin) {
    await apiFindEmail(login);
  }
}
