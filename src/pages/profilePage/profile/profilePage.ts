import createElement from '@/utils/create-element';
import { Page, Tag } from '@/interface';
import createHeader from '@/components/header/header';
import styles from '@/pages/profilePage/profile/profilePage.module.css';
import createFooter from '../footer/footerProfile';

export default function createProfilePage(goPage: (page: Page) => void) {
  const PROFILE_PAGE = createElement(Tag.DIV, {
    id: 'profilePage',
    className: styles.profilePage,
  });

  PROFILE_PAGE.append(createHeader(goPage), createFooter());

  return PROFILE_PAGE;
}
