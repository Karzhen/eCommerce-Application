import apiClearBasket from '@/api/apiClearBasket';

import createElement from '@/utils/create-element';
import createButton from '@baseComponents/button/button';

import { Tag, TypeButton } from '@/interface';

import createEmptyPlug from '@pages/basketPage/main/utils/createEmptyPlug';
import createPromoBlock from './promo/promo';
import createInfoBlock from './info/info';

import StyleSheet from './menu.module.css';
import styles from '../products/products.module.css';

export default function createMenu() {
  const MENU = createElement(Tag.DIV, {
    className: StyleSheet.menu,
  });

  const WRAPPER = createElement(Tag.DIV, {
    className: StyleSheet.wrapper,
  });
  const INFO_BLOCK = createInfoBlock();
  const CLEAR_BUTTON = createButton({
    type: TypeButton.TRANSPARENT,
    option: {
      textContent: 'Clear shopping cart',
    },
    handler: {
      handlerClick: async () => {
        await apiClearBasket();
        const PRODUCTS_BLOCK: HTMLElement = document.querySelector(`.${styles.productsBlock}`)!;
        PRODUCTS_BLOCK.innerHTML = '';
        createEmptyPlug(PRODUCTS_BLOCK);
      },
    },
  });
  WRAPPER.append(INFO_BLOCK, CLEAR_BUTTON);

  const PROMO_BLOCK = createPromoBlock();

  MENU.append(WRAPPER, PROMO_BLOCK);
  return MENU;
}
