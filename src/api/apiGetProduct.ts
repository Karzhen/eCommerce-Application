import store from '@redux/store/configureStore';

import { GET_PRODUCT, ERROR_GET_PRODUCT } from '@redux/actions/product';

import createCtpClientRefresh from '@api/buildClient/buildClientRefreshTokenFlow';
import createCtpClientAnonymous from '@api/buildClient/buildAnonymousSessionFlow';
import {createApiBuilderFromCtpClient, ProductProjection, ProductVariant} from '@commercetools/platform-sdk';
import {ProductVariants} from "@/interface.ts";
import urlNoImg from "@assets/images/noImg.jpg";

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

function generateProductVariant(element: ProductProjection, variantID: string): ProductVariants {
  const { language } = store.getState().local;

  let elementVariant: ProductVariant;
  if (!element.masterVariant.isMatchingVariant) {
    const arrElementVariant = element.variants.filter(
        (el) => el.isMatchingVariant !== false,
    );
    [elementVariant] = arrElementVariant;
  } else {
    elementVariant = element.masterVariant;
  }

  return {
    id: element.id,
    name: element.name[language],
    description: grabDescription(element, language),
    img: grabImage(elementVariant),
    size: elementVariant.attributes?.find((el) => el.name === 'size')?.value.label,
    color: elementVariant.attributes?.find((el) => el.name === 'color')?.value.label,
    price: grabPrice(elementVariant),
    discount: grabDiscount(elementVariant),
    variantId: variantID,
    masterVariant: element.masterVariant,
    variants: element.variants,
  };
}


export default async function apiGetEachProduct(productID: string, variantID: string) {
  let ctpClient;
  if (store.getState().login.isLogin) {
    ctpClient = createCtpClientRefresh();
  } else {
    ctpClient = createCtpClientAnonymous();
  }

  const apiRoot = createApiBuilderFromCtpClient(ctpClient);

  try {
    const response = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .withId({ ID: productID })
      .get()
      .execute();

    console.log(response.body);
    console.log(generateProductVariant(response.body, variantID));
    // Использовать generateProduct(response.body)
    store.dispatch(GET_PRODUCT(generateProductVariant(response.body, variantID)));
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
