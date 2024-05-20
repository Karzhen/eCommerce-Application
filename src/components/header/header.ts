import createElement from '@utils/create-element';
import createLinkWithIcon from '@baseComponents/linkWithIcon/linkWithIcon';
import createButtonWithIcon from '@baseComponents/buttonWithIcon/buttonWithIcon';
import createInputWithIcon from '@baseComponents/inputWithIcon/inputWithIcon';

import { Tag, Page, TypeButton, TypeInput } from '@/interface';

import iconLogo from '@assets/images/logo.png';

import iconCatalog from '@assets/images/align-justify.png';
import iconSearch from '@assets/images/search.png';

import createAuthField from './auth-block/auth-block';
import createNavField from './nav-block/nav-block';

import createBurger from './burger/burger';
import styles from './header.module.css';

function handleMainClick(goPage: (page: Page) => void) {
  goPage(Page.MAIN);
}

function handlerCatalogClick(goPage: (page: Page) => void) {
  goPage(Page.CATALOG);
}

function handlerSearchInput(event: Event) {
  event.preventDefault();
}

function handlerSearchClick() {}

export default function createHeader(goPage: (page: Page) => void) {
  const HEADER = createElement(Tag.HEADER, { className: styles.header });

  const LINK_LOGO = createLinkWithIcon({
    option: { className: styles.logo },
    iconUrl: iconLogo,
    handler: { handlerClick: () => handleMainClick(goPage) },
  });

  const BURGER = createBurger(goPage);
  BURGER.classList.add(styles.burger);

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

  const AUTH_BLOCK = createAuthField(goPage);
  AUTH_BLOCK.classList.add(styles.authBlock);

  const WRAPPER_AUTH_BURGER = createElement(Tag.DIV, {
    className: styles.wrapperAuthBurger,
  });
  WRAPPER_AUTH_BURGER.append(AUTH_BLOCK, BURGER);

  const NAV = createNavField(goPage);
  NAV.classList.add(styles.nav);

  HEADER.append(
    LINK_LOGO,
    BUTTON_CATALOG,
    INPUT_SEARCH,
    NAV,
    WRAPPER_AUTH_BURGER,
  );

  return HEADER;
}
