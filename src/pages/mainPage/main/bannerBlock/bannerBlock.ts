import store from '@redux/store/configureStore';

import apiGetPromoCodes from '@/api/apiGetPromoCode';

import createElement from '@/utils/create-element';

import { Tag } from '@/interface';

import createBannerPromoCode from './bannerPromoCode/bannerPromoCode';

import styles from './bannerBlock.module.css';

export default async function createBannerBlock() {
  const BANNER_BLOCK = createElement(Tag.DIV, {
    className: styles.bannerBlock,
  });

  await apiGetPromoCodes();

  store
    .getState()
    .promoCode.promoCodes.forEach((promoCode) =>
      BANNER_BLOCK.append(createBannerPromoCode(promoCode)),
    );

  return BANNER_BLOCK;
}
