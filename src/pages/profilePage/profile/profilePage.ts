import createElement from '@/utils/create-element';
import { Page, Tag } from '@/interface';
import createHeader from '../header/headerProfile';
import createFooter from '../footer/footerProfile';
import styles from './profilePage.module.css';

export default function createProfilePage(goPage: (page: Page) => void) {
  const PROFILE_PAGE = createElement(Tag.DIV, {
    id: 'profilePage',
    className: styles.profilePage,
  });

  PROFILE_PAGE.append(createHeader(goPage), createFooter());

  return PROFILE_PAGE;
}
