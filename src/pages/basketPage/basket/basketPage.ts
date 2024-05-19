import { Page, Tag } from '@/interface';
import createElement from '@/utils/create-element';
import createHeader from '@/components/header/header';
import styles from './basketPage.module.css';
import createFooter from '../footer/footerBasket';

export default function createBasketPage(goPage: (page: Page) => void) {
  const BASKET_PAGE = createElement(Tag.DIV, {
    id: 'basketPage',
    className: styles.basketPage,
  });

  BASKET_PAGE.append(createHeader(goPage), createFooter());

  return BASKET_PAGE;
}
