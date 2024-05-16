import createElement from '@utils/create-element';
import createLink from '@baseComponents/link/link';

import logout from '@utils/logout';

import { Tag, Page } from '@/interface';

import iconProfile from '@assets/images/profile.png';

import styles from './profile.module.css';

function handleProfileClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.PROFILE);
}

function handleLogoutClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  logout();
  goPage(Page.MAIN);
}

export default function createProfile(goPage: (page: Page) => void) {
  const WRAPPER = createElement(Tag.DIV, {
    className: styles.wrapper,
  });

  const USER_IMAGE = createElement(Tag.IMG, {
    id: 'userImage',
    className: styles.userImage,
  });
  USER_IMAGE.setAttribute('src', iconProfile);

  const DROPDOWN_MENU = createElement(Tag.DIV, {
    id: 'dropdownMenu',
    className: styles.dropdownMenu,
  });

  const LINK_PROFILE = createLink({
    option: { textContent: 'Profile' },
    handler: {
      handlerClick: (event: Event) => handleProfileClick(event, goPage),
    },
  });
  LINK_PROFILE.setAttribute('href', Page.PROFILE);

  const LINK_LOGOUT = createLink({
    option: { textContent: 'Logout' },
    handler: {
      handlerClick: (event: Event) => handleLogoutClick(event, goPage),
    },
  });
  LINK_LOGOUT.setAttribute('href', Page.MAIN);

  DROPDOWN_MENU.append(LINK_PROFILE, LINK_LOGOUT);

  WRAPPER.append(USER_IMAGE, DROPDOWN_MENU);

  return WRAPPER;
}
