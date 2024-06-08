import createElement from '@/utils/create-element';

import { Tag } from '@/interface';

import createPromoBlock from './promo/promo';
import createInfoBlock from './info/info';

export default function createMenu() {
  const MENU = createElement(Tag.DIV, {
    className: 'menu',
  });

  const PROMO_BLOCK = createPromoBlock();
  const INFO_BLOCK = createInfoBlock();

  MENU.append(PROMO_BLOCK, INFO_BLOCK);
  return MENU;
}
