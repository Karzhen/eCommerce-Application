import createElement from '@/utils/create-element';
import { Page, Tag } from '@/interface';
import createHeader from '@/components/header/header';
import styles from '@/pages/profilePage/profilePage.module.css';
import clearDefaultAddresses from '@/utils/clearDefaultLS';
import { addInputEventListeners, changeBox } from '@/utils/editProfile';
import createFooter from './footer/footerProfile';
import createProfileFields from './createProfileFields';
import fillProfileFields from './fillProfile';
import createTabs from './main/tabs';

export default function createProfilePage(goPage: (page: Page) => void) {
  const PROFILE_PAGE = createElement(Tag.DIV, {
    id: 'profilePage',
    className: styles.profilePage,
  });

  const tabsContainer = createElement(Tag.DIV, {
    id: 'tabs',
    className: styles.tabs,
  });
  tabsContainer.append(createTabs());

  const PROFILE_MAIN = createElement(Tag.DIV, {
    id: 'profileMain',
    className: styles.profileMain,
  });

  PROFILE_MAIN.append(tabsContainer, createProfileFields());

  PROFILE_PAGE.append(createHeader(goPage), PROFILE_MAIN, createFooter());

  clearDefaultAddresses();
  fillProfileFields(PROFILE_PAGE);
  addInputEventListeners(PROFILE_PAGE);
  changeBox('mainDataBox', PROFILE_PAGE);

  return PROFILE_PAGE;
}
