import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import store from '@/redux/store/configureStore';
import { UPDATE_USER, ERROR_UPDATE_PERSONAL_DATA } from '@/redux/actions/login';
import createUser from '@/utils/createCustomerObject';
import { Customer } from '@/interface';
import { setUserFields } from '@/pages/profilePage/fillProfile';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiUpdatePersonalData(
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
) {
  const ctpClient = createCtpClientRefresh();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    const data = store.getState().login;
    const result = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .post({
        body: {
          version: data.version || 0,
          actions: [
            { action: 'setFirstName', firstName },
            { action: 'setLastName', lastName },
            { action: 'changeEmail', email },
            { action: 'setDateOfBirth', dateOfBirth },
          ],
        },
      })
      .execute();

    const customer = result.body;
    const user = createUser(customer as Customer);

    store.dispatch(UPDATE_USER({ user }));
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_UPDATE_PERSONAL_DATA({ errorUpdate: error.message }),
      );
      const PROFILE_DATA = document.getElementById(
        'profileData',
      ) as HTMLElement;
      const data = store.getState().login.user;
      if (data) {
        setUserFields(data, PROFILE_DATA);
      }
    }
  }
}
