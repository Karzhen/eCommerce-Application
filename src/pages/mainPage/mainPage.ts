import { Tag, Page } from '@/interface';
import createElement from '@utils/create-element';

import createHeader from '@components/header/header';
import createFooter from '@components/footer/footer';
import createMain from './main/main';

import styles from './mainPage.module.css';

export default async function createMainPage(goPage: (page: Page) => void) {
  const MAIN_PAGE = createElement(Tag.DIV, {
    id: 'mainPage',
    className: styles.mainPage,
  });

  MAIN_PAGE.append(createHeader(goPage), await createMain(), createFooter());

  return MAIN_PAGE;
}
