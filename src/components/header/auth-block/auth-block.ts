import store from '@redux/store/configureStore';

import createElement from '@utils/create-element';

import createButton from '@baseComponents/button/button';
import createLink from '@baseComponents/link/link';

import { Tag, Page, TypeButton } from '@/interface';

import createProfile from './profile-block/profile';

import styles from './auth-block.module.css';

function handleLoginClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.LOGIN);
}

function handleRegistrationClick(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.REGISTR);
}

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

export default function createAuthField(goPage: (page: Page) => void) {
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
