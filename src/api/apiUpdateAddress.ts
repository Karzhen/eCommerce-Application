import {
  createApiBuilderFromCtpClient,
  type ApiRoot,
} from '@commercetools/platform-sdk';
import { UPDATE_USER, UPDATE_VERSION } from '@/redux/actions/login';
import getAddressDataById from '@/utils/getAddressById';
import { Customer } from '@/interface';
import { createAndShowPopup } from '@/pages/registrationPage/registration/eventHandlers';
import store from '@/redux/store/configureStore';
import createCtpClientRefresh from './buildClient/buildClientRefreshTokenFlow';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
let apiRoot: ApiRoot;

async function setDefaultAddress(
  type: 'Billing' | 'Shipping',
  addressId: string,
  version: number,
) {
  try {
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: `setDefault${type}Address`,
              addressId,
            },
          ],
        },
      })
      .execute();

    if (response.statusCode === 200) {
      store.dispatch(UPDATE_VERSION(response.body.version));
      store.dispatch(UPDATE_USER({ user: response.body as Customer }));
      return response.body.version;
    }
  } catch (error) {
    if (error instanceof Error) {
      createAndShowPopup(
        'Error',
        `Error setting default ${type} address: ${error.message}`,
        false,
      );
    }
  }
  return version;
}

async function removeDefaultAddress(
  type: 'Billing' | 'Shipping',
  version: number,
) {
  try {
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: `setDefault${type}Address`,
            },
          ],
        },
      })
      .execute();

    if (response.statusCode === 200) {
      store.dispatch(UPDATE_VERSION(response.body.version));
      store.dispatch(UPDATE_USER({ user: response.body as Customer }));
      return response.body.version;
    }
  } catch (error) {
    if (error instanceof Error) {
      createAndShowPopup(
        'Error',
        `Error removing default ${type} address: ${error.message}`,
        false,
      );
    }
  }
  return version;
}

export default async function apiUpdateAddress(addressId: string) {
  const ctpClient = createCtpClientRefresh();
  apiRoot = createApiBuilderFromCtpClient(ctpClient);

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
      const defaultShipping =
        localStorage.getItem('defaultShipping') === 'true';

      const isDefaultBilling =
        store.getState().login.user?.defaultBillingAddressId === addressId;
      const isDefaultShipping =
        store.getState().login.user?.defaultShippingAddressId === addressId;

      if (defaultBilling) {
        newVersion = await setDefaultAddress('Billing', addressId, newVersion);
      } else if (!defaultBilling && isDefaultBilling) {
        newVersion = await removeDefaultAddress('Billing', newVersion);
      }

      if (defaultShipping) {
        await setDefaultAddress('Shipping', addressId, newVersion);
      } else if (!defaultShipping && isDefaultShipping) {
        await removeDefaultAddress('Shipping', newVersion);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      createAndShowPopup(
        'Error',
        `Error updating address: ${error.message}`,
        false,
      );
    }
  }
}
