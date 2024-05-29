import store from '@redux/store/configureStore';

import { Filter, ProductM } from '@/interface';

import { GET_PRODUCTS, ERROR_GET_PRODUCTS } from '@redux/actions/products';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

import generateProduct from '@utils/generateProduct';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

function createQueryString(filter: Filter) {
  let where = '';
  if (filter.category) {
    where = `(categories(id="${filter.category}"))`;
  }

  if (filter.priceStart) {
    if (where) {
      where += ' AND ';
    }
    where += `(masterVariant(prices(discounted is defined)) 
    AND masterVariant(prices(discounted(value(centAmount >= ${filter.priceStart}))))) 
    OR (masterVariant(prices(discounted is not defined))  
    AND masterVariant(prices(value(centAmount >= ${filter.priceStart}))))`;
  }

  if (filter.priceEnd) {
    if (where) {
      where += ' AND ';
    }
    where += `(masterVariant(prices(discounted is defined)) 
    AND masterVariant(prices(discounted(value(centAmount <= ${filter.priceEnd}))))))) 
    OR (masterVariant(prices(discounted is not defined))  
    AND masterVariant(prices(value(centAmount <= ${filter.priceEnd}))))))`;
  }

  if (filter.size) {
    const filterSizes = filter.size.map((el) => `key="${el}"`).join(' OR ');

    if (where) {
      where += ' AND ';
    }
    where += `(masterVariant(attributes(name="size" AND value(${filterSizes}))) 
    OR variants(attributes(name="size" AND value(${filterSizes}))))`;
  }

  if (filter.brand) {
    if (where) {
      where += ' AND ';
    }
    where += `(masterVariant(attributes(name="brand" AND value(key="${filter.brand}"))))`;
  }

  if (filter.color) {
    if (where) {
      where += ' AND ';
    }
    where += `(masterVariant(attributes(name="color" AND value(key="${filter.color}"))))`;
  }

  return where;
}

export default async function apiGetProducts(filter: Filter = {}) {
  let ctpClient;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
  } else {
    ctpClient = createCtpClientAnonymous();
  }

  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  let where;
  if (Object.keys(filter).length > 0) {
    where = createQueryString(filter);
  }

  try {
    let result;
    if (!where) {
      result = await apiRoot
        .withProjectKey({ projectKey })
        .productProjections()
        .get({
          queryArgs: {
            localeProjection: `${store.getState().local.language}`,
            priceCurrency: `${store.getState().local.currencyCode}`,
          },
        })
        .execute();
    } else {
      result = await apiRoot
        .withProjectKey({ projectKey })
        .productProjections()
        .get({
          queryArgs: {
            where,
            localeProjection: `${store.getState().local.language}`,
            priceCurrency: `${store.getState().local.currencyCode}`,
          },
        })
        .execute();
    }

    const products: ProductM[] = [];
    result.body.results.forEach((element) => {
      products.push(generateProduct(element));
    });
    store.dispatch(GET_PRODUCTS(products));
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_GET_PRODUCTS(
          'Something went wrong. Please should try again later.',
        ),
      );
    }
  }
}
