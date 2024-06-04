import createElement from '@utils/create-element';
import createHeader from '@components/header/header';

import { Tag } from '@/interface';

import createMain from './main/main';

import styles from './productPage.module.css';

export default async function createProductPage(
  goPage: (path: string) => void,
  productVariantId: string,
) {
  const PRODUCT_PAGE = createElement(Tag.DIV, {
    id: 'productPage',
    className: styles.productPage,
  });

  PRODUCT_PAGE.append(createHeader(goPage), await createMain(productVariantId));

  return PRODUCT_PAGE;
}
