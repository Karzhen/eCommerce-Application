import store from '@/redux/store/configureStore';

import { Tag, Page, TypeInput, TypeButton } from '@/interface';
import createElement from '@utils/create-element';
import createButton from '@baseComponents/button/button';
import createButtonWithIcon from '@baseComponents/buttonWithIcon/buttonWithIcon';
import createLink from '@baseComponents/link/link';
import createLinkWithIcon from '@baseComponents/linkWithIcon/linkWithIcon';
import createInputWithIcon from '@/components/baseComponents/inputWithIcon/inputWithIcon';
import createProfile from '@components/profile/profile';

import iconBasket from '@assets/images/shopping-cart.png';
import iconAbout from '@assets/images/users.png';
import iconCatalog from '@assets/images/align-justify.png';
import iconSearch from '@assets/images/search.png';

import styles from './header.module.css';

function handleAboutClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.ABOUT);
}

function handleBasketClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.BASKET);
}

function handleLoginClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.LOGIN);
}

function handleRegistrationClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.REGISTR);
}

function handlerCatalogClick(goPage: (page: Page) => void) {
  goPage(Page.CATALOG);
}

function handlerSearchInput(event: Event) {
  event.preventDefault();
}

function handlerSearchClick() {}

function createAuthFieldWithoutLogin(goPage: (page: Page) => void) {
  const LINK_LOGIN = createLink({
    option: { textContent: 'Sign in' },
    handler: {
      handlerClick: (event: Event) => handleLoginClick(event, goPage),
    },
  });
  LINK_LOGIN.setAttribute('href', Page.LOGIN);

  const DIVIDER = createElement(Tag.DIV, {
    className: styles.divider,
    textContent: '/',
  });

  const BUTTON_REGIST = createButton({
    type: TypeButton.TRANSPARENT,
    option: { textContent: 'Sign up', className: styles.buttonRegist },
    handler: {
      handlerClick: (event: Event) => handleRegistrationClick(event, goPage),
    },
  });

  return [LINK_LOGIN, DIVIDER, BUTTON_REGIST];
}

function createAuthField(goPage: (page: Page) => void) {
  const WRAPPER_AUTH = createElement(Tag.DIV, {
    className: styles.wrapperAuth,
  });

  if (store.getState().login.isLogin)
    WRAPPER_AUTH.append(createProfile(goPage));
  else WRAPPER_AUTH.append(...createAuthFieldWithoutLogin(goPage));

  store.subscribe(() => {
    WRAPPER_AUTH.replaceChildren();
    if (store.getState().login.isLogin)
      WRAPPER_AUTH.append(createProfile(goPage));
    else WRAPPER_AUTH.append(...createAuthFieldWithoutLogin(goPage));
  });

  return WRAPPER_AUTH;
}

function createNavField(goPage: (page: Page) => void) {
  const NAVIGATION = createElement(Tag.NAV, { className: styles.nav });

  const LINK_BASKET = createLinkWithIcon({
    option: { textContent: 'Basket' },
    iconUrl: iconBasket,
    handler: {
      handlerClick: (event: Event) => handleBasketClick(event, goPage),
    },
  });
  LINK_BASKET.setAttribute('href', Page.BASKET);

  const LINK_ABOUT = createLinkWithIcon({
    option: { textContent: 'About Us' },
    iconUrl: iconAbout,
    handler: {
      handlerClick: (event: Event) => handleAboutClick(event, goPage),
    },
  });
  LINK_ABOUT.setAttribute('href', Page.ABOUT);

  NAVIGATION.append(LINK_BASKET, LINK_ABOUT);

  return NAVIGATION;
}

export default function createHeader(goPage: (page: Page) => void) {
  const HEADER = createElement(Tag.HEADER, { className: styles.header });

  const BUTTON_CATALOG = createButtonWithIcon({
    type: TypeButton.SECONDARY,
    option: { textContent: 'Catalog', className: styles.buttonCatalog },
    iconUrl: iconCatalog,
    handler: { handlerClick: () => handlerCatalogClick(goPage) },
  });

  const INPUT_SEARCH = createInputWithIcon({
    type: TypeInput.TEXT,
    option: { className: styles.inputSearch },
    iconUrl: iconSearch,
    handler: {
      handlerInput: (event: Event) => handlerSearchInput(event),
      handlerClickIcon: handlerSearchClick,
    },
  });
  INPUT_SEARCH.setAttribute('placeholder', 'Search');

  HEADER.append(
    BUTTON_CATALOG,
    INPUT_SEARCH,
    createNavField(goPage),
    createAuthField(goPage),
  );

  return HEADER;
}
