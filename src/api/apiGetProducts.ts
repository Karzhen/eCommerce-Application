import store from '@redux/store/configureStore';

import { Filter, ProductM } from '@/interface';

import { GET_PRODUCTS, ERROR_GET_PRODUCTS } from '@redux/actions/products';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';

import generateProduct from '@utils/generateProduct';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

function createQueryString(filter: Filter) {
  const where: string[] = [];
  if (filter.category && filter.category.length > 0) {
    where.push(
      `categories.id:"${filter.category[filter.category.length - 1]}"`,
    );
  }

  if (filter.priceStart || filter.priceEnd) {
    where.push(
      `variants.price.centAmount:range(${filter.priceStart ? filter.priceStart : '*'} to ${filter.priceEnd ? filter.priceEnd : '*'})`,
    );
  }

  if (filter.brand) {
    where.push(`variants.attributes.brand.key:"${filter.brand}"`);
  }

  if (filter.color) {
    where.push(`variants.attributes.color.key:"${filter.color}"`);
  }

  if (filter.size && Object.keys(filter.size).length > 0) {
    const sizes = filter.size;
    where.push(
      `variants.attributes.size.key:${Object.values(sizes)
        .map((value) => `"${value}"`)
        .join(',')}`,
    );
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
    const queryArgs: {
      localeProjection: string;
      priceCurrency: string;
      sort: string;
      markMatchingVariants: boolean;
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
