import store from '@redux/store/configureStore';

import apiAddProductToBasket from '@api/apiAddProductToBasket';

import createElement from '@utils/create-element';
import createLink from '@baseComponents/link/link';
import createPopUp from '@components/popUp/popUp';
import createButton from '@baseComponents/button/button';

import { Tag, ProductM, TypeButton } from '@/interface';
import formatPrice from '@utils/formatPrice';

import styles from './productCard.module.css';

function handlerTitleClick(event: Event, goPage: (path: string) => void) {
  const element = event.target as HTMLAnchorElement;
  const path = element.getAttribute('href') || '';
  goPage(path);
}

async function handlerBuyClick(event: Event) {
  const el = event.target;
  if (el instanceof HTMLButtonElement) {
    el.setAttribute('disabled', '');
    const [productId, variantId] = el.value.split(':');
    await apiAddProductToBasket(productId, Number(variantId));
    if (store.getState().basket.error) {
      el.removeAttribute('disabled');
      const POPUP = createPopUp(
        'Error',
        'Product cannot be added to cart',
        false,
      );
      document.body.append(POPUP);
      (POPUP as HTMLDialogElement).showModal();
    }
  }
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

  const WRAPPER = createElement(Tag.DIV, { className: styles.wrapper });

  const WRAPPER_PRICE = createElement(Tag.DIV, {
    className: styles.wrapperPrice,
  });

  const PRICE = createElement(Tag.LABEL, {
    className: styles.productPrice,
    textContent: formatPrice(product.price),
  });

  WRAPPER_PRICE.append(PRICE);

  if (product.discount) {
    const DISCOUNT = createElement(Tag.LABEL, {
      className: styles.productDiscount,
      textContent: formatPrice(product.discount),
    });

    WRAPPER_PRICE.append(DISCOUNT);
  }

  const BUTTON_BASKET = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Buy', className: styles.buttonBuy },
    handler: { handlerClick: (event: Event) => handlerBuyClick(event) },
  });
  BUTTON_BASKET.setAttribute('value', `${product.id}:${product.variantId}`);

  if (
    store.getState().basket.products &&
    store.getState().basket.products.some((pr) => pr.id === product.id)
  ) {
    BUTTON_BASKET.setAttribute('disabled', '');
  }
  WRAPPER.append(WRAPPER_PRICE, BUTTON_BASKET);

  INFO.append(TITLE, DESCRIPTION, WRAPPER);

  CARD.append(WRAPPER_IMAGE, INFO);

  return CARD;
}
