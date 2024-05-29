import store from '@redux/store/configureStore';

import { type ProductProjection } from '@commercetools/platform-sdk';

import urlNoImg from '@assets/images/noImg.jpg';

function grabImage(element: ProductProjection) {
  const arrImg: string[] = [];

  if (element.masterVariant.images && element.masterVariant.images.length > 0) {
    element.masterVariant.images.forEach((img) => {
      arrImg.push(img.url);
    });
    return arrImg;
  }
  return [urlNoImg];
}

function grabPrice(element: ProductProjection) {
  if (element.masterVariant.prices && element.masterVariant.prices[0]) {
    return element.masterVariant.prices[0].value.centAmount;
  }
  return 0;
}

function grabDiscount(element: ProductProjection) {
  if (
    element.masterVariant.prices &&
    element.masterVariant.prices[0] &&
    element.masterVariant.prices[0].discounted
  ) {
    return element.masterVariant.prices[0].discounted.value.centAmount;
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

  return {
    id: element.id,
    name: element.name[language],
    description: grabDescription(element, language),
    img: grabImage(element),
    price: grabPrice(element),
    discount: grabDiscount(element),
  };
}
