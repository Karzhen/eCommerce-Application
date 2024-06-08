import createElement from '@utils/create-element';

import { Tag } from '@/interface';

import createMenu from './menu/menu';
import createProducts from './products/products';

import styles from './main.module.css';

export default async function createMain() {
  const MAIN = createElement(Tag.MAIN, {
    className: styles.main,
    id: 'main',
  });

  const MENU = createMenu();

  const PRODUCTS = createProducts();

  MAIN.append(MENU, PRODUCTS);

  return MAIN;
}
