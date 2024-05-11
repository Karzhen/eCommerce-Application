import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
// import dotenv from 'dotenv';
// dotenv.config();

export const projectKey: string = 'carshop';
const clientId: string = '36POpxvWT7izt09GMAeH6aey';
const clientSecret: string = 'tqEbcb2O4YFL_caMarIQ0sMnUlKf8Nra';
const authHost: string = 'https://auth.eu-central-1.aws.commercetools.com';
const apiHost: string = 'https://api.eu-central-1.aws.commercetools.com';
const scopes: string[] =
  'manage_customers:carshop:carStore manage_my_profile:carshop:carStore manage_my_shopping_lists:carshop:carStore manage_orders:carshop:carStore manage_my_orders:carshop:carStore manage_project:carshop manage_shopping_lists:carshop:carStore manage_cart_discounts:carshop:carStore'.split(
    ' ',
  );

// Данный тип будет позже вынесен в файл interface.ts
type TokenData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

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
  try {
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
  } catch (error) {
    throw new Error(`Failed to fetch access token: ${error.message}`);
  }
}

export async function createCustomer(newCustomer: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  try {
    const accessToken = await getToken(); // Получаем токен
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .post({
        body: newCustomer,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .execute();

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function loginUser(
  username: string,
  password: string,
): Promise<string> {
  try {
    const response = await fetch(
      `${authHost}/oauth/${projectKey}/customers/token`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'password',
          username,
          password,
          scope: scopes.join(' '),
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.statusText}`);
    }

    const data: TokenData = await response.json();

    if (!data.access_token) {
      throw new Error(`Access token not found in response`);
    }

    return data.access_token;
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
}
