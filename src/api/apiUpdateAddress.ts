import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { UPDATE_USER, UPDATE_VERSION } from '@/redux/actions/login';
import getAddressDataById from '@/utils/getAddressById';
import { Customer } from '@/interface';
import store from '@/redux/store/configureStore';
import createCtpClientRefresh from './buildClient/buildClientRefreshTokenFlow';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const ctpClient = createCtpClientRefresh();
const apiRoot = createApiBuilderFromCtpClient(ctpClient);

export default async function apiUpdateAddress(addressId: string) {
  try {
    const data = store.getState().login.user;

    if (!data) {
      console.error('No user data found in the store.');
      return;
    }

    const updatedAddress = (await getAddressDataById(addressId)) as {
      streetName: string;
      postalCode: string;
      city: string;
      country: string;
    };

    const { streetName, postalCode, city, country } = updatedAddress;

    console.log(updatedAddress);

    // Fetch the latest version from the store before each request
    let newVersion = store.getState().login.user?.version;

    if (newVersion === undefined) {
      console.error('No version found in the store.');
      return;
    }

    const responseUpdateAddress = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .post({
        body: {
          version: newVersion,
          actions: [
            {
              action: 'changeAddress',
              addressId,
              address: {
                streetName,
                postalCode,
                city,
                country,
              },
            },
          ],
        },
      })
      .execute();

    if (responseUpdateAddress.statusCode === 200) {
      const updatedCustomer = responseUpdateAddress.body;
      newVersion = updatedCustomer.version;

      store.dispatch(UPDATE_VERSION(newVersion));
      store.dispatch(UPDATE_USER({ user: updatedCustomer as Customer }));

      const defaultBilling = localStorage.getItem('defaultBilling') === 'true';
      console.log(defaultBilling === true);

      if (defaultBilling) {
        newVersion = store.getState().login.user?.version; // Fetch latest version before action

        if (newVersion === undefined) {
          console.error('No version found in the store.');
          return;
        }

        const responseSetDefaultBilling = await apiRoot
          .withProjectKey({ projectKey })
          .me()
          .post({
            body: {
              version: newVersion,
              actions: [
                {
                  action: 'setDefaultBillingAddress',
                  addressId,
                },
              ],
            },
          })
          .execute();

        if (responseSetDefaultBilling.statusCode === 200) {
          const newVersionSetDef = responseSetDefaultBilling.body.version;
          store.dispatch(UPDATE_VERSION(newVersionSetDef));
          store.dispatch(
            UPDATE_USER({ user: responseSetDefaultBilling.body as Customer }),
          );
        }
      }

      const defaultShipping =
        localStorage.getItem('defaultShipping') === 'true';
      console.log(defaultShipping);

      if (defaultShipping === true) {
        newVersion = store.getState().login.user?.version; // Fetch latest version before action

        if (newVersion === undefined) {
          console.error('No version found in the store.');
          return;
        }

        const responseSetDefaultShipping = await apiRoot
          .withProjectKey({ projectKey })
          .me()
          .post({
            body: {
              version: newVersion,
              actions: [
                {
                  action: 'setDefaultShippingAddress',
                  addressId,
                },
              ],
            },
          })
          .execute();

        if (responseSetDefaultShipping.statusCode === 200) {
          const newVersionShip = responseSetDefaultShipping.body.version;
          store.dispatch(UPDATE_VERSION(newVersionShip));
          store.dispatch(
            UPDATE_USER({ user: responseSetDefaultShipping.body as Customer }),
          );
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating address:', error.message);
    }
  }
}
