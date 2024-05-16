import { Tag } from '@/interface';
import createElement from '@/utils/create-element';
import styles from './basketPage.module.css';

export default function createBasketPage() {
  const BASKET_PAGE = createElement(Tag.DIV, {
    id: 'errorPage',
    className: styles.basketPage,
  });

  return BASKET_PAGE;
}
