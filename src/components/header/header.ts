import createElement from '@utils/create-element';
import createLinkWithIcon from '@baseComponents/linkWithIcon/linkWithIcon';

import { Tag, Page } from '@/interface';

import iconLogo from '@assets/images/logo.png';

import createAuthField from './auth-block/auth-block';
import createNavField from './nav-block/nav-block';

import createBurger from './burger/burger';
import styles from './header.module.css';

function handleMainClick(goPage: (page: Page) => void) {
  goPage(Page.MAIN);
}

export default async function createHeader(goPage: (page: Page) => void) {
  const HEADER = createElement(Tag.HEADER, { className: styles.header });

  const LINK_LOGO = createLinkWithIcon({
    option: { className: styles.logo },
    iconUrl: iconLogo,
    handler: { handlerClick: () => handleMainClick(goPage) },
  });

  const BURGER = createBurger(goPage);
  BURGER.classList.add(styles.burger);

  const AUTH_BLOCK = createAuthField(goPage);
  AUTH_BLOCK.classList.add(styles.authBlock);

  const WRAPPER_AUTH_BURGER = createElement(Tag.DIV, {
    className: styles.wrapperAuthBurger,
  });
  WRAPPER_AUTH_BURGER.append(AUTH_BLOCK, BURGER);

  const NAV = await createNavField(goPage);
  NAV.classList.add(styles.nav);

  HEADER.append(LINK_LOGO, NAV, WRAPPER_AUTH_BURGER);

  return HEADER;
}
