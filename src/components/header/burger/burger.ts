import store from '@redux/store/configureStore';

import { Tag, Page } from '@/interface';
import createElement from '@utils/create-element';
import createLink from '@baseComponents/link/link';

import logout from '@utils/logout';

import styles from './burger.module.css';

function handlerBurgerClick(event: Event) {
  if (event.currentTarget instanceof HTMLElement) {
    const BURGER = event.currentTarget;
    const DROPDOWN_MENU = BURGER.nextElementSibling;
    if (DROPDOWN_MENU) {
      if (DROPDOWN_MENU.getAttribute('open')) {
        DROPDOWN_MENU.removeAttribute('open');
      } else {
        DROPDOWN_MENU.setAttribute('open', 'open');
      }
    }
  }
}

function handleWithoutBurgerClick(event: Event) {
  const BURGER = document.querySelector('#burger');
  if (
    event.target instanceof HTMLElement &&
    !event.target.closest('#burger') &&
    !event.target.closest('#burger-dropdown-menu') &&
    BURGER
  ) {
    const DROPDOWN_MENU = BURGER.nextElementSibling;

    if (DROPDOWN_MENU) {
      if (DROPDOWN_MENU.getAttribute('open')) {
        DROPDOWN_MENU.removeAttribute('open');
      }
    }
  }
}

function createBurgerIcon() {
  const BURGER = createElement(Tag.DIV, {
    className: styles.burger,
    id: 'burger',
  });

  const SPAN_BURGER_1 = createElement(Tag.SPAN, {
    className: styles.burgerLine,
  });

  const SPAN_BURGER_2 = createElement(Tag.SPAN, {
    className: styles.burgerLine,
  });

  BURGER.append(SPAN_BURGER_1, SPAN_BURGER_2);
  return BURGER;
}

function handleProfileClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.PROFILE);
}

function handleLogoutClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  logout();
  goPage(Page.MAIN);
}

function handleAboutClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.ABOUT);
}

function handleBasketClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.BASKET);
}

function handlerCatalogClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.CATALOG);
}

function handlerLoginClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.LOGIN);
}

function handlerRegistrClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.REGISTR);
}

function createMenuLink(goPage: (page: Page) => void) {
  const MENU_LINK_LOGIN = createLink({
    option: {
      textContent: 'Sing in',
      className: `${styles.dropdownLink} ${styles.linkLogin}`,
    },
    handler: {
      handlerClick: (event: Event) => handlerLoginClick(event, goPage),
    },
  });
  MENU_LINK_LOGIN.setAttribute('href', Page.LOGIN);

  const MENU_LINK_REGISTR = createLink({
    option: {
      textContent: 'Sing up',
      className: `${styles.dropdownLink} ${styles.linkRegistr}`,
    },
    handler: {
      handlerClick: (event: Event) => handlerRegistrClick(event, goPage),
    },
  });
  MENU_LINK_REGISTR.setAttribute('href', Page.REGISTR);

  const MENU_LINK_CATALOG = createLink({
    option: {
      textContent: 'Catalog',
      className: styles.dropdownLink,
    },
    handler: {
      handlerClick: (event: Event) => handlerCatalogClick(event, goPage),
    },
  });
  MENU_LINK_CATALOG.setAttribute('href', Page.CATALOG);

  const MENU_LINK_BASKET = createLink({
    option: {
      textContent: 'Basket',
      className: styles.dropdownLink,
    },
    handler: {
      handlerClick: (event: Event) => handleBasketClick(event, goPage),
    },
  });
  MENU_LINK_BASKET.setAttribute('href', Page.BASKET);

  const MENU_LINK_ABOUT = createLink({
    option: {
      textContent: 'About us',
      className: styles.dropdownLink,
    },
    handler: {
      handlerClick: (event: Event) => handleAboutClick(event, goPage),
    },
  });
  MENU_LINK_ABOUT.setAttribute('href', Page.ABOUT);

  const MENU_LINK_PROFILE = createLink({
    option: {
      textContent: 'Profile',
      className: `${styles.dropdownLink} ${styles.linkProfile}`,
    },
    handler: {
      handlerClick: (event: Event) => handleProfileClick(event, goPage),
    },
  });
  MENU_LINK_PROFILE.setAttribute('href', Page.PROFILE);

  const MENU_LINK_LOGOUT = createLink({
    option: {
      textContent: 'Log out',
      className: `${styles.dropdownLink} ${styles.linkLogout}`,
    },
    handler: {
      handlerClick: (event: Event) => handleLogoutClick(event, goPage),
    },
  });
  MENU_LINK_LOGOUT.setAttribute('href', Page.MAIN);

  if (store.getState().login.isLogin) {
    return [
      MENU_LINK_CATALOG,
      MENU_LINK_BASKET,
      MENU_LINK_ABOUT,
      MENU_LINK_PROFILE,
      MENU_LINK_LOGOUT,
    ];
  }
  return [
    MENU_LINK_LOGIN,
    MENU_LINK_REGISTR,
    MENU_LINK_CATALOG,
    MENU_LINK_BASKET,
    MENU_LINK_ABOUT,
  ];
}

function createBurgerMenu(goPage: (page: Page) => void) {
  const MENU = createElement(Tag.DIV, {
    className: styles.dropdownMenu,
    id: 'burger-dropdown-menu',
  });

  if (store.getState().login.isLogin) MENU.append(...createMenuLink(goPage));
  else MENU.append(...createMenuLink(goPage));

  store.subscribe(() => {
    MENU.replaceChildren();
    MENU.append(...createMenuLink(goPage));
  });

  return MENU;
}

export default function createBurger(goPage: (page: Page) => void) {
  const WRAPPER = createElement(Tag.DIV, {
    className: styles.wrapper,
    id: 'burger-menu',
  });

  const BURGER_ICON = createBurgerIcon();
  const BURGER_MENU = createBurgerMenu(goPage);

  WRAPPER.append(BURGER_ICON, BURGER_MENU);

  BURGER_ICON.addEventListener('click', (event) => handlerBurgerClick(event));

  document.body.addEventListener('click', (event: Event) =>
    handleWithoutBurgerClick(event),
  );

  return WRAPPER;
}
