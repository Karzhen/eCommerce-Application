import { Page, Tag } from '@/interface';
import createElement from '@/utils/create-element';
import styles from './aboutPage.module.css';
import createHeader from '../header/headerAbout';
import createFooter from '../footer/footerAbout';

export default function createAboutPage(goPage: (page: Page) => void) {
  const ABOUT_PAGE = createElement(Tag.DIV, {
    id: 'errorPage',
    className: styles.aboutPage,
  });

  ABOUT_PAGE.append(createHeader(goPage), createFooter());

  return ABOUT_PAGE;
}
