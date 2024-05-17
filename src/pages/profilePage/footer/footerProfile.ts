import { Tag } from '@/interface';
import createElement from '@utils/create-element';

import styles from './footerProfile.module.css';

export default function createFooter() {
  const FOOTER = createElement(Tag.FOOTER, { className: styles.footer });
  return FOOTER;
}
