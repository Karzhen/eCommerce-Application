import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import store from '@/redux/store/configureStore';
import { UPDATE_USER } from '@/redux/actions/login';
import createUser from '@/utils/createCustomerObject';
import { Customer } from '@/interface';
import { createAndShowPopup } from '@/pages/registrationPage/registration/eventHandlers';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

const ctpClient = createCtpClientRefresh();
const apiRoot = createApiBuilderFromCtpClient(ctpClient);

export default async function apiDeleteAddress(addressId: string) {
  try {
    const data = store.getState().login;
    const result = await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID: data.user?.id as string })
      .post({
        body: {
          version: data.version || 0,
          actions: [
            {
              action: 'removeAddress',
              addressId,
            },
          ],
        },
      })
      .execute();

    const customer = result.body;
    const user = createUser(customer as Customer);
    if (result.statusCode === 200) {
      store.dispatch(UPDATE_USER({ user }));
      createAndShowPopup(
        'Address successfully deleted',
        'You have deleted the address',
        true,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      createAndShowPopup(
        'The address was not deleted',
        `Error: ${error.message}`,
        false,
      );
    }
  }
}
