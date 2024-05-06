import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import fetch from 'node-fetch';

const projectKey = 'carshop';

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.eu-central-1.aws.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'aEJxAqe3bTw1Ts9fyYbhaulx',
    clientSecret: 'ot9WpQj_sCO09Wb2w2asHD7QmXa1p--x',
  },
  scopes: [
    'manage_my_profile:carshop manage_my_shopping_lists:carshop manage_customers:carshop:carStore manage_my_orders:carshop manage_my_business_units:carshop manage_my_payments:carshop manage_my_shopping_lists:carshop:carStore view_products:carshop view_published_products:carshop create_anonymous_token:carshop manage_my_profile:carshop:carStore view_categories:carshop manage_my_quotes:carshop manage_my_quote_requests:carshop manage_orders:carshop:carStore manage_my_orders:carshop:carStore manage_shopping_lists:carshop:carStore manage_cart_discounts:carshop:carStore',
  ],
  fetch,
});
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.eu-central-1.aws.commercetools.com',
  fetch,
});
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});
