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
    size: element.variant.attributes?.find((el) => el.name === 'size')?.value
      .label,
    color: element.variant.attributes?.find((el) => el.name === 'color')?.value
      .label,
    price: element.price.value.centAmount,
    quantity: element.quantity,
    totalPrice: element.totalPrice.centAmount,
    discount: element.price.discounted?.value.centAmount || null,
    variantId: element.variant.id,
  };
}
