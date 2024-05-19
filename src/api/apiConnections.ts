import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  // type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { CustomerData } from '@utils/getRegistrationData.ts';

// Данный тип будет позже вынесен в файл interface.ts
type TokenData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;
const clientId: string = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret: string = import.meta.env.VITE_CTP_CLIENT_SECRET;
const authHost: string = import.meta.env.VITE_CTP_AUTH_URL;
const apiHost: string = import.meta.env.VITE_CTP_API_URL;
const scopes: string[] = import.meta.env.VITE_CTP_SCOPES.split(',');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authHost,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiHost,
  fetch,
};

const client: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withAuthMiddleware(authMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot: ApiRoot = createApiBuilderFromCtpClient(client);

async function getToken(): Promise<string> {
  const response = await fetch(
    `${authHost}/oauth/token?grant_type=client_credentials`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  const data: TokenData = (await response.json()) as TokenData;

  if (!data.access_token) {
    throw new Error(`Access token not found in response`);
  }

  return data.access_token;
}

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
    const accessToken = await getToken();
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
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
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
    const accessToken = await getToken();
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
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .execute();
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function createCustomer(newCustomer: CustomerData) {
  let CUSTOMER_ID: string | undefined = '';
  let ADDRESS_ID: string | undefined = '';
  try {
    const accessToken = await getToken();
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
              ...newCustomer.billingAddress,
              country: getCountryCode(newCustomer.billingAddress.country),
            },
          ],
          defaultBillingAddress: defaultBilling ? 0 : undefined,
          defaultShippingAddress: defaultShipping ? 0 : undefined,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
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
