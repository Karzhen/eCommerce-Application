import { Page, Tag } from '@/interface';
import createElement from '@/utils/create-element';
import styles from './basketPage.module.css';
import createHeader from '../header/headerBasket';
import createFooter from '../footer/footerBasket';

export default function createBasketPage(goPage: (page: Page) => void) {
  const BASKET_PAGE = createElement(Tag.DIV, {
    id: 'errorPage',
    className: styles.basketPage,
  });

  BASKET_PAGE.append(createHeader(goPage), createFooter());

  return BASKET_PAGE;
}
