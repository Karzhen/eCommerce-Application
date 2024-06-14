import createElement from '@/utils/create-element';

import { Tag } from '@/interface';

import styles from './bannerPromoCode.module.css';

export default function createBannerPromoCode(promoCode: {
  promoCodeId: string;
  title: string;
  description: string;
}) {
  const BANNER_PROMO_CODE = createElement(Tag.DIV, {
    className: styles.bannerPromoCode,
  });

  const TITLE = createElement(Tag.LABEL, {
    className: styles.title,
    textContent: promoCode.title,
  });

  const DESCRIPTION = createElement(Tag.LABEL, {
    className: styles.description,
    textContent: promoCode.description,
  });

  BANNER_PROMO_CODE.append(TITLE, DESCRIPTION);

  return BANNER_PROMO_CODE;
}
