import store from '@redux/store/configureStore';

import apiGetEachProduct from '@api/apiGetProduct';

import { Tag } from '@/interface';

import createElement from '@utils/create-element';

import createProductInfo from './productInfo/productInfo';
import styles from './main.module.css';

function createErrorProductPage(error: string) {
  const errorMessage = createElement(Tag.DIV, {
    className: styles.error,
    textContent: error,
  });

  return errorMessage;
}

export default async function createMainProductPage(
  goPage: (path: string) => void,
  productVariantId: string,
) {
  const MAIN = createElement(Tag.MAIN, {
    className: styles.main,
    id: 'mainProductPage',
  });

  const [productId] = productVariantId.split(':');

  await apiGetEachProduct(productId);

  const productData = store.getState().product;
  if (productData.error) {
    const ERROR_PAGE = createErrorProductPage(productData.error);
    MAIN.append(ERROR_PAGE);
  } else {
    const productInfo = createProductInfo(productData.value);
    MAIN.append(productInfo);
  }

  return MAIN;
}
