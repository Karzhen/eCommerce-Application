import { Tag } from '@/interface';
import createElement from '@/utils/create-element';
import styles from './catalogPage.module.css';

export default function createCatalogPage() {
  const CATALOG_PAGE = createElement(Tag.DIV, {
    id: 'errorPage',
    className: styles.catalogPage,
  });

  return CATALOG_PAGE;
}
