import store from '@redux/store/configureStore';

import { GET_PRODUCT, ERROR_GET_PRODUCT } from '@redux/actions/product';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import {
  createApiBuilderFromCtpClient,
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';
import { ProductVariants } from '@/interface';
import urlNoImg from '@assets/images/noImg.jpg';
import { getAnonymousApiClient } from './apiAnonymous';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

function grabImage(elementVariant: ProductVariant) {
  const arrImg: string[] = [];

  if (elementVariant.images && elementVariant.images.length > 0) {
    elementVariant.images.forEach((img) => {
      arrImg.push(img.url);
    });
    return arrImg;
  }
  return [urlNoImg];
}

function grabPrice(elementVariant: ProductVariant) {
  if (elementVariant.prices && elementVariant.prices[0]) {
    return elementVariant.prices[0].value.centAmount;
  }
  return 0;
}

function grabDiscount(elementVariant: ProductVariant) {
  if (
    elementVariant.prices &&
    elementVariant.prices[0] &&
    elementVariant.prices[0].discounted
  ) {
    return elementVariant.prices[0].discounted.value.centAmount;
  }
  return null;
}

function grabDescription(element: ProductProjection, language: string) {
  if (element.description) {
    return element.description[language];
  }
  return '';
}

function generateProductVariants(
  element: ProductProjection,
  variantID: string,
): ProductVariants {
  const { language } = store.getState().local;

  let elementVariant: ProductVariant;

  const matchingVariants = element.variants.filter(
    (el) => el.isMatchingVariant !== false,
  );

  if (matchingVariants.length > 0) {
    [elementVariant] = matchingVariants;
  } else {
    elementVariant = element.masterVariant;
  }

  return {
    id: element.id,
    name: element.name[language],
    price: grabPrice(elementVariant),
    discount: grabDiscount(elementVariant),
    img: grabImage(elementVariant),
    description: grabDescription(element, language),
    size: elementVariant.attributes?.find((el) => el.name === 'size')?.value
      .label,
    color: elementVariant.attributes?.find((el) => el.name === 'color')?.value
      .label,
    variantId: variantID,
    masterVariant: element.masterVariant,
    variants: element.variants,
  };
}

export default async function apiGetEachProduct(
  productID: string,
  variantID: string,
) {
  let ctpClient;
  let apiRoot;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
    apiRoot = createApiBuilderFromCtpClient(ctpClient);
  } else {
    apiRoot = getAnonymousApiClient();
  }

  try {
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .withId({ ID: productID })
      .get()
      .execute();

    store.dispatch(
      GET_PRODUCT(generateProductVariants(response.body, variantID)),
    );
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(
        ERROR_GET_PRODUCT(
          'Something went wrong. Please should try again later.',
        ),
      );
    }
  }
}
