import { Tag } from '@/interface';
import createElement from '@utils/create-element';

import createBannerBlock from './bannerBlock/bannerBlock';
import createContentBlock from './contentBlock/contentBlock';

import styles from './main.module.css';

export default async function createMain() {
  const MAIN = createElement(Tag.MAIN, { className: styles.main });

  const BANNER_BLOCK = createBannerBlock();
  const CONTENT_BLOCK = createContentBlock();

  MAIN.append(await BANNER_BLOCK, CONTENT_BLOCK);

  return MAIN;
}
