import { Tag } from '@/interface';
import createElement from '@/utils/create-element';
import styles from './aboutPage.module.css';

export default function createAboutPage() {
  const ABOUT_PAGE = createElement(Tag.DIV, {
    id: 'errorPage',
    className: styles.aboutPage,
  });

  return ABOUT_PAGE;
}
