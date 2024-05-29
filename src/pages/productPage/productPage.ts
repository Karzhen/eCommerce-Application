import createElement from '@utils/create-element';
import createHeader from '@components/header/header';

import { Tag, Page } from '@/interface';

import styles from './productPage.module.css';

export default function createProductPage(
  goPage: (page: Page, id?: string) => void,
  productId: string,
) {
  const PRODUCT_PAGE = createElement(Tag.DIV, {
    id: 'productPage',
    className: styles.productPage,
    textContent: productId,
  });

  PRODUCT_PAGE.append(createHeader(goPage));

  return PRODUCT_PAGE;
}
