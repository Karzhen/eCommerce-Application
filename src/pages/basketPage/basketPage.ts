import { Page, Tag } from '@/interface';
import createElement from '@/utils/create-element';
import createHeader from '@components/header/header';
import createFooter from '@components/footer/footer';

import apiGetBasket from '@api/apiGetBasket';

import createMain from './main/main';

import styles from './basketPage.module.css';

export default async function createBasketPage(goPage: (page: Page) => void) {
  const BASKET_PAGE = createElement(Tag.DIV, {
    id: 'basketPage',
    className: styles.basketPage,
  });

  await apiGetBasket();

  BASKET_PAGE.append(createHeader(goPage), await createMain(), createFooter());

  return BASKET_PAGE;
}
