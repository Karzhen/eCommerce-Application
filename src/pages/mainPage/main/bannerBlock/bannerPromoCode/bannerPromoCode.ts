import createElement from '@/utils/create-element';
import { Tag } from '@/interface';
import styles from './bannerPromoCode.module.css';

const createBannerPromoCode = (() => {
  let promoCodeCounter = 0;

  return function (promoCode: {
    promoCodeId: string;
    title: string;
    description: string;
  }) {
    const BANNER_PROMO_CODE = createElement(Tag.DIV, {
      className: styles.bannerPromoCode,
    });

    const BANNER_IMG = createElement(Tag.IMG, {});

    if (promoCodeCounter % 2 === 0) {
      BANNER_IMG.className = styles.banners20;
      BANNER_IMG.setAttribute('width', '300');
      BANNER_IMG.setAttribute('height', '400');

      const DESCRIPTION = createElement(Tag.LABEL, {
        className: styles.description,
        textContent: promoCode.description,
      });

      BANNER_PROMO_CODE.append(BANNER_IMG, DESCRIPTION);
    } else {
      BANNER_IMG.className = styles.banners50;
      BANNER_IMG.setAttribute('width', '300');
      BANNER_IMG.setAttribute('height', '400');

      const DESCRIPTION = createElement(Tag.LABEL, {
        className: styles.description,
        textContent: promoCode.description,
      });

      BANNER_PROMO_CODE.append(DESCRIPTION, BANNER_IMG);
    }

    promoCodeCounter += 1;

    return BANNER_PROMO_CODE;
  };
})();

export default createBannerPromoCode;
