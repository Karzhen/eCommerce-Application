import { Page, Tag } from '@/interface';
import createElement from '@/utils/create-element';
import createHeader from '@/components/header/header';
import createFooter from '@/components/footer/footer';
import apiGetBasket from '@/api/apiGetBasket';
import styles from './aboutPage.module.css';
import createFields from './createFields';

export default async function createAboutPage(goPage: (page: Page) => void) {
  const ABOUT_PAGE = createElement(Tag.DIV, {
    id: 'aboutPage',
    className: styles.aboutPage,
  });

  await apiGetBasket();

  ABOUT_PAGE.append(await createHeader(goPage), createFields(), createFooter());

  return ABOUT_PAGE;
}
