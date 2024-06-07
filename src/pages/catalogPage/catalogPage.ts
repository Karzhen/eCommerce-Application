import { Tag } from '@/interface';
import createElement from '@utils/create-element';
import createHeader from '@components/header/header';
import createFooter from '@components/footer/footer';

import createMainCatalogPage from './main/main';

import styles from './catalogPage.module.css';

export default async function createCatalogPage(
  goPage: (path: string) => void,
  categoriesId: string[],
) {
  const CATALOG_PAGE = createElement(Tag.DIV, {
    id: 'catalogPage',
    className: styles.catalogPage,
  });

  CATALOG_PAGE.append(
    createHeader(goPage),
    await createMainCatalogPage(goPage, categoriesId),
    createFooter(),
  );

  return CATALOG_PAGE;
}
