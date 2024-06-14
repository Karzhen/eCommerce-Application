import createElement from '@/utils/create-element';

import { Tag } from '@/interface';

import styles from './contentBlock.module.css';

export default function createContentBlock() {
  const CONTENT_BLOCK = createElement(Tag.DIV, {
    className: styles.contentBlock,
  });

  return CONTENT_BLOCK;
}
