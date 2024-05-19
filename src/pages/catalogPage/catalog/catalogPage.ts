import { Page, Tag } from '@/interface';
import createElement from '@/utils/create-element';
import createHeader from '@/components/header/header';
import styles from './catalogPage.module.css';
import createFooter from '../footer/footerCatalog';

export default function createCatalogPage(goPage: (page: Page) => void) {
  const CATALOG_PAGE = createElement(Tag.DIV, {
    id: 'catalogPage',
    className: styles.catalogPage,
  });

  CATALOG_PAGE.append(createHeader(goPage), createFooter());

  return CATALOG_PAGE;
}
