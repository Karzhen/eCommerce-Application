import store from '@redux/store/configureStore';

import { Filter, ProductM } from '@/interface';

import {
  GET_PRODUCTS,
  ERROR_GET_PRODUCTS,
  GET_COUNT_OF_PRODUCTS,
} from '@redux/actions/products';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';

import generateProduct from '@utils/generateProduct';
import { getAnonymousApiClient } from './apiAnonymous';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

function createQueryString(filter: Filter) {
  const where: string[] = [];
  if (filter.category && filter.category.length > 0) {
    where.push(
      `categories.id:"${filter.category[filter.category.length - 1]}"`,
    );
    const { total, limit } = store.getState().products.countProducts;
    store.dispatch(GET_COUNT_OF_PRODUCTS({ total, limit, offset: 0 }));
  }

  if (filter.priceStart || filter.priceEnd) {
    where.push(
      `variants.price.centAmount:range(${filter.priceStart ? filter.priceStart : '*'} to ${filter.priceEnd ? filter.priceEnd : '*'})`,
    );
    const { total, limit } = store.getState().products.countProducts;
    store.dispatch(GET_COUNT_OF_PRODUCTS({ total, limit, offset: 0 }));
  }

  if (filter.brand) {
    where.push(`variants.attributes.brand.key:"${filter.brand}"`);
    const { total, limit } = store.getState().products.countProducts;
    store.dispatch(GET_COUNT_OF_PRODUCTS({ total, limit, offset: 0 }));
  }

  if (filter.color) {
    where.push(`variants.attributes.color.key:"${filter.color}"`);
    const { total, limit } = store.getState().products.countProducts;
    store.dispatch(GET_COUNT_OF_PRODUCTS({ total, limit, offset: 0 }));
  }

  if (filter.size && Object.keys(filter.size).length > 0) {
    const sizes = filter.size;
    where.push(
      `variants.attributes.size.key:${Object.values(sizes)
        .map((value) => `"${value}"`)
        .join(',')}`,
    );
    const { total, limit } = store.getState().products.countProducts;
    store.dispatch(GET_COUNT_OF_PRODUCTS({ total, limit, offset: 0 }));
  }

  return where;
}

function createSortString(filter: Filter) {
  let sort = '';
  if (filter.sort) {
    const { name, order } = filter.sort;
    if (name === 'price') {
      sort = `price ${order}`;
    } else {
      sort = `${name}.${store.getState().local.language} ${order}`;
    }
  } else {
    sort = 'price asc';
  }

  return sort;
}

export default async function apiGetProducts(
  filter: Filter = {},
  newOffset?: number,
) {
  let ctpClient;
  let apiRoot;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
    apiRoot = createApiBuilderFromCtpClient(ctpClient);
  } else {
    apiRoot = getAnonymousApiClient();
  }

  let where;
  if (Object.keys(filter).length > 0) {
    where = createQueryString(filter);
  }

  const offsetParameter =
    newOffset !== undefined
      ? newOffset
      : store.getState().products.countProducts.offset;
  try {
    const queryArgs: {
      localeProjection: string;
      priceCurrency: string;
      sort: string;
      markMatchingVariants: boolean;
      limit: number;
      offset: number;
      filter?: string[];
      ['text.en']?: string;
      ['text.ru']?: string;
      ['text.de']?: string;
      fuzzy?: boolean;
    } = {
      localeProjection: `${store.getState().local.language}`,
      priceCurrency: `${store.getState().local.currencyCode}`,
      sort: createSortString(filter),
      markMatchingVariants: true,
      limit: 6,
      offset: offsetParameter,
    };

    if (where) {
      queryArgs.filter = where;
    }

    if (filter.search) {
      queryArgs['text.en'] = `${filter.search}`;
      queryArgs.fuzzy = true;
    }

    const result = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get({ queryArgs })
      .execute();

    const products: ProductM[] = [];
    result.body.results.forEach((element) => {
      products.push(generateProduct(element));
    });
    const { total, limit, offset } = result.body;

    store.dispatch(
      GET_COUNT_OF_PRODUCTS({
        total: total as number,
        limit: limit as number,
        offset: offset as number,
      }),
    );
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
