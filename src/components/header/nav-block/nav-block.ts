import store from '@redux/store/configureStore';

import apiGetBasket from '@/api/apiGetBasket';

import createElement from '@utils/create-element';
import createLinkWithIcon from '@baseComponents/linkWithIcon/linkWithIcon';

import { Tag, Page } from '@/interface';

import iconBasket from '@assets/images/shopping-cart.png';
import iconAbout from '@assets/images/users.png';

import styles from './nav-block.module.css';

function handleAboutClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.ABOUT);
}

function handleBasketClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.BASKET);
}

export default async function createNavField(goPage: (page: Page) => void) {
  const NAVIGATION = createElement(Tag.NAV, { className: styles.nav });

  const LINK_BASKET = createLinkWithIcon({
    option: { textContent: 'Basket' },
    iconUrl: iconBasket,
    handler: {
      handlerClick: (event: Event) => handleBasketClick(event, goPage),
    },
  });
  LINK_BASKET.setAttribute('href', Page.BASKET);

  await apiGetBasket();
  const COUNT_ITEMS_BASKET = createElement(Tag.DIV, {
    className: styles.countItemsBasket,
    textContent: String(store.getState().basket.totalQuantity || ''),
  });
  let previousProductsState = store.getState().basket.totalQuantity;
  store.subscribe(() => {
    const currentProductsState = store.getState().basket.totalQuantity;
    if (previousProductsState !== currentProductsState) {
      COUNT_ITEMS_BASKET.textContent = String(currentProductsState || '');
      previousProductsState = currentProductsState;
    }
  });

  const LINK_ABOUT = createLinkWithIcon({
    option: { textContent: 'About Us' },
    iconUrl: iconAbout,
    handler: {
      handlerClick: (event: Event) => handleAboutClick(event, goPage),
    },
  });
  LINK_ABOUT.setAttribute('href', Page.ABOUT);

  NAVIGATION.append(LINK_BASKET, COUNT_ITEMS_BASKET, LINK_ABOUT);

  return NAVIGATION;
}
