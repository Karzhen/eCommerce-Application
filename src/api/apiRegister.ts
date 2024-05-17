import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';
import { CustomerData } from '@utils/getRegistrationData';

const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;

const client = createCtpClientAnonymous();
const apiRoot = createApiBuilderFromCtpClient(client);

function getCountryCode(country: string): string {
  switch (country.toLowerCase()) {
    case 'germany':
      return 'DE';
    case 'united states':
      return 'US';
    case 'russia':
      return 'RU';
    default:
      throw new Error(`Country code not found for ${country}`);
  }
}

async function assignBillingAddressToCustomer(
  addressId: string,
  customerId: string,
  version: number,
) {
  try {
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addBillingAddressId',
              addressId,
            },
          ],
        },
      })
      .execute();
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function assignShippingAddressToCustomer(
  addressId: string,
  customerId: string,
  version: number,
) {
  try {
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addShippingAddressId',
              addressId,
            },
          ],
        },
      })
      .execute();
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export default async function createCustomer(newCustomer: CustomerData) {
  let CUSTOMER_ID: string | undefined = '';
  let ADDRESS_ID: string | undefined = '';
  try {
    const defaultBilling = localStorage.getItem('defaultBilling') === 'true';
    const defaultShipping = localStorage.getItem('defaultShipping') === 'true';

    const response = await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .post({
        body: {
          email: newCustomer.email,
          password: newCustomer.password,
          firstName: newCustomer.firstName,
          lastName: newCustomer.lastName,
          dateOfBirth: newCustomer.dateOfBirth,
          addresses: [
            {
              ...newCustomer.address,
              country: getCountryCode(newCustomer.address.country),
            },
          ],
          defaultBillingAddress: defaultBilling ? 0 : undefined,
          defaultShippingAddress: defaultShipping ? 0 : undefined,
        },
      })
      .execute();
    ADDRESS_ID = response.body.customer.addresses[0].id;
    CUSTOMER_ID = response.body.customer.id;
    if (ADDRESS_ID && CUSTOMER_ID) {
      await assignBillingAddressToCustomer(
        ADDRESS_ID,
        CUSTOMER_ID,
        response.body.customer.version,
      );
      await assignShippingAddressToCustomer(
        ADDRESS_ID,
        CUSTOMER_ID,
        response.body.customer.version + 1,
      );
    }
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
