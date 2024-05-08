import { Tag } from '@/interface';
import createElement from '@utils/create-element';

import styles from './main.module.css';

export default function createMain() {
  const MAIN = createElement(Tag.MAIN, { className: styles.main });
  return MAIN;
}
