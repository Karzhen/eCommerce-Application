import store from '@redux/store/configureStore';

import apiGetEachProduct from '@api/apiGetProduct';

import { Tag } from '@/interface';

import createElement from '@utils/create-element';

import apiGetBasket from '@api/apiGetBasket';
import createProductInfo from './productInfo/productInfo';
import styles from './main.module.css';

function createErrorProductPage(error: string) {
  const errorMessage = createElement(Tag.DIV, {
    className: styles.error,
    textContent: error,
  });

  return errorMessage;
}

export default async function createMainProductPage(productVariantId: string) {
  const MAIN = createElement(Tag.MAIN, {
    className: styles.main,
    id: 'mainProductPage',
  });

  const [productId, productVariant] = productVariantId.split(':');

  await apiGetEachProduct(productId, productVariant);
  await apiGetBasket();

  // const productData = store.getState().product;
  if (store.getState().product.error) {
    const ERROR_PAGE = createErrorProductPage(store.getState().product.error);
    MAIN.append(ERROR_PAGE);
  } else {
    const productInfo = createProductInfo(productId, productVariant);
    MAIN.append(productInfo);
  }

  return MAIN;
}
