import createElement from '@/utils/create-element';

import { Tag } from '@/interface';

import createPromoBlock from './promo/promo';
import createInfoBlock from './info/info';

import StyleSheet from './menu.module.css';

export default function createMenu() {
  const MENU = createElement(Tag.DIV, {
    className: StyleSheet.menu,
  });

  const PROMO_BLOCK = createPromoBlock();
  const INFO_BLOCK = createInfoBlock();

  MENU.append(INFO_BLOCK, PROMO_BLOCK);
  return MENU;
}
