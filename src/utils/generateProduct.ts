import store from '@redux/store/configureStore';

import {
  ProductVariant,
  type ProductProjection,
} from '@commercetools/platform-sdk';

import urlNoImg from '@assets/images/noImg.jpg';

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

export default function generateProduct(element: ProductProjection) {
  const { language } = store.getState().local;

  let elementVariant;
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
    price: grabPrice(elementVariant),
    discount: grabDiscount(elementVariant),
  };
}
