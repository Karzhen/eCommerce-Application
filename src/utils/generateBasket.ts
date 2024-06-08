import store from '@redux/store/configureStore';

import { LineItem } from '@commercetools/platform-sdk';

import urlNoImg from '@assets/images/noImg.jpg';

function grabImage(element: LineItem) {
  const arrImg: string[] = [];

  if (element.variant.images && element.variant.images.length > 0) {
    element.variant.images.forEach((img) => {
      arrImg.push(img.url);
    });
    return arrImg;
  }
  return [urlNoImg];
}

export default function generateProduct(element: LineItem) {
  const { language } = store.getState().local;

  return {
    id: element.productId,
    name: element.name[language],
    description: '',
    img: grabImage(element),
    price: element.price.value.centAmount,
    discount: element.price.value.centAmount,
    variantId: element.variant.id,
  };
}
