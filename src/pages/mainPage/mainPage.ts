import { Tag, Page } from '@/interface';
import createElement from '@utils/create-element';

import createHeader from '@components/header/header';
import createMain from './main/main';
import createFooter from './footer/footer';

import styles from './mainPage.module.css';

export default function createMainPage(goPage: (page: Page) => void) {
  const MAIN_PAGE = createElement(Tag.DIV, {
    id: 'mainPage',
    className: styles.mainPage,
  });

  MAIN_PAGE.append(createHeader(goPage), createMain(), createFooter());

  return MAIN_PAGE;
}
