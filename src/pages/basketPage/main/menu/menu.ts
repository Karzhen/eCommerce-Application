import createElement from '@/utils/create-element';

import { Tag } from '@/interface';

import createPromoBlock from './promo/promo';

export default function createMenu() {
  const MENU = createElement(Tag.DIV, {
    className: 'menu',
  });

  const PROMO_BLOCK = createPromoBlock();

  MENU.appendChild(PROMO_BLOCK);
  return MENU;
}
