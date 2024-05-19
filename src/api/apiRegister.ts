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
function getAddresses(newCustomer: CustomerData) {
  if (newCustomer.shippingAddress.city !== '') {
    return [
      {
        ...newCustomer.billingAddress,
        country: getCountryCode(newCustomer.billingAddress.country),
      },
      {
        ...newCustomer.shippingAddress,
        country: getCountryCode(newCustomer.shippingAddress.country),
      },
    ];
  }
  return [
    {
      ...newCustomer.billingAddress,
      country: getCountryCode(newCustomer.billingAddress.country),
    },
  ];
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
  // let ADDRESS_ID: string | undefined = '';
  let BILLING_ADDRESS_ID: string | undefined = '';
  let SHIPPING_ADDRESS_ID: string | undefined = '';
  try {
    const defaultBilling = localStorage.getItem('defaultBilling') === 'true';
    const defaultShipping = localStorage.getItem('defaultShipping') === 'true';
    let defaultShippingAddress;

    if (defaultShipping) {
      if (newCustomer.shippingAddress.city !== '') {
        defaultShippingAddress = 1;
      } else {
        defaultShippingAddress = 0;
      }
    } else {
      defaultShippingAddress = undefined;
    }

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
          addresses: getAddresses(newCustomer),
          defaultBillingAddress: defaultBilling ? 0 : undefined,
          defaultShippingAddress,
        },
      })
      .execute();
    console.log(newCustomer);
    if (response.body.customer.addresses.length > 1) {
      BILLING_ADDRESS_ID = response.body.customer.addresses[0].id;
      SHIPPING_ADDRESS_ID = response.body.customer.addresses[1].id;
    } else {
      BILLING_ADDRESS_ID = response.body.customer.addresses[0].id;
    }
    // ADDRESS_ID = response.body.customer.addresses[0].id;
    CUSTOMER_ID = response.body.customer.id;
    let { version } = response.body.customer;
    if (BILLING_ADDRESS_ID && CUSTOMER_ID) {
      const billingResponse = await assignBillingAddressToCustomer(
        BILLING_ADDRESS_ID,
        CUSTOMER_ID,
        version,
      );
      version = billingResponse.body.version;

      const shippingResponse = await assignShippingAddressToCustomer(
        SHIPPING_ADDRESS_ID || BILLING_ADDRESS_ID,
        CUSTOMER_ID,
        version,
      );
      version = shippingResponse.body.version;
    }
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
