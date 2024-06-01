import createElement from '@utils/create-element';
import createLink from '@baseComponents/link/link';

import { Tag, ProductM } from '@/interface';
import formatPrice from '@utils/formatPrice';

import styles from './productCard.module.css';

function handlerTitleClick(event: Event, goPage: (path: string) => void) {
  const element = event.target as HTMLAnchorElement;
  const path = element.getAttribute('href') || '';
  goPage(path);
}

export default function createProductCard(
  product: ProductM,
  goPage: (path: string) => void,
) {
  const CARD = createElement(Tag.DIV, {
    className: styles.productCard,
  });

  const WRAPPER_IMAGE = createElement(Tag.DIV, {
    className: styles.wrapperProductImg,
  });

  const IMAGE = createElement(Tag.IMG, {
    className: styles.productImg,
  });
  IMAGE.setAttribute('src', product.img[0]);

  WRAPPER_IMAGE.append(IMAGE);

  const INFO = createElement(Tag.DIV, {
    className: styles.productInfo,
  });

  const TITLE = createLink({
    option: {
      className: styles.productTitle,
      textContent: product.name,
    },
    handler: {
      handlerClick: (event: Event) => handlerTitleClick(event, goPage),
    },
  });
  TITLE.setAttribute('href', `/product/${product.id}:${product.variantId}`);

  const DESCRIPTION = createElement(Tag.DIV, {
    className: styles.productDescription,
    textContent: product.description,
  });

  const PRICE = createElement(Tag.LABEL, {
    className: styles.productPrice,
    textContent: formatPrice(product.price),
  });

  INFO.append(TITLE, DESCRIPTION, PRICE);

  if (product.discount) {
    const DISCOUNT = createElement(Tag.LABEL, {
      className: styles.productDiscount,
      textContent: formatPrice(product.discount),
    });

    INFO.append(DISCOUNT);
  }

  CARD.append(WRAPPER_IMAGE, INFO);

  return CARD;
}
