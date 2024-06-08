import store from '@redux/store/configureStore';

import apiChangeQuantity from '@/api/apiChangeQuantity';

import createElement from '@/utils/create-element';

import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';

import formatPrice from '@utils/formatPrice';

import { Tag, ProductBasket, TypeInput, TypeButton } from '@/interface';

import styles from './products.module.css';

function addCountBlock(count: number, itemBasketId: string) {
  const COUNT_BLOCK = createElement(Tag.DIV, { className: styles.promoBlock });

  const COUNT_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      textContent: 'Submit',
      id: `setQuantity:${itemBasketId}`,
    },
    handler: {
      handlerClick: async () => {
        COUNT_BUTTON.setAttribute('disabled', '');

        const elInputQuantity = document.getElementById(
          `inputQuantity:${itemBasketId}`,
        );
        if (elInputQuantity instanceof HTMLInputElement) {
          await apiChangeQuantity(itemBasketId, Number(elInputQuantity.value));
        }
      },
    },
  });
  COUNT_BUTTON.setAttribute('disabled', '');

  const INPUT_COUNT = createInput({
    type: TypeInput.TEXT,
    option: {
      id: `inputQuantity:${itemBasketId}`,
    },
    handler: {
      handlerInput: () => {
        COUNT_BUTTON.removeAttribute('disabled');
      },
    },
  });
  INPUT_COUNT.setAttribute('value', String(count));

  COUNT_BLOCK.append(INPUT_COUNT, COUNT_BUTTON);

  return COUNT_BLOCK;
}

function addProduct(product: ProductBasket) {
  const TITLE = createElement(Tag.LABEL, {
    className: styles.title,
    textContent: product.name,
  });

  const WRAPPER_IMAGE = createElement(Tag.DIV, {
    className: styles.wrapperProductImg,
  });

  const IMAGE = createElement(Tag.IMG, {
    className: styles.productImg,
  });
  IMAGE.setAttribute('src', product.img[0]);

  WRAPPER_IMAGE.append(IMAGE);

  const SIZE = createElement(Tag.LABEL, {
    textContent: product.size,
  });

  const COLOR = createElement(Tag.LABEL, {
    textContent: product.color,
  });

  const WRAPPER_PRICE = createElement(Tag.DIV, {
    className: styles.wrapperPrice,
  });
  const PRICE = createElement(Tag.LABEL, {
    className: styles.price,
    textContent: String(
      formatPrice(product.price, store.getState().local.currencyCode),
    ),
  });
  WRAPPER_PRICE.append(PRICE);

  if (product.discount) {
    const DISCOUNT = createElement(Tag.LABEL, {
      className: styles.discount,
      textContent: String(
        formatPrice(product.discount, store.getState().local.currencyCode),
      ),
    });
    WRAPPER_PRICE.append(DISCOUNT);
  }

  const TOTAL_VALUE = createElement(Tag.LABEL, {
    className: styles.totalValue,
    textContent: String(
      formatPrice(product.totalPrice, store.getState().local.currencyCode),
    ),
  });

  const DELETE_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      textContent: 'Delete',
      id: `buttonDelete:${product.id}:${product.variantId}`,
    },
    handler: {},
  });

  return [
    TITLE,
    WRAPPER_IMAGE,
    SIZE,
    COLOR,
    WRAPPER_PRICE,
    addCountBlock(product.quantity, product.itemBasketId),
    TOTAL_VALUE,
    DELETE_BUTTON,
  ];
}

function addHandlerForChangeBasket(wrapper: HTMLElement) {
  let previousProductsState = store.getState().basket.products;
  store.subscribe(() => {
    const currentProductsState = store.getState().basket.products;
    if (previousProductsState !== currentProductsState) {
      wrapper.replaceChildren();
      store.getState().basket.products.forEach((product) => {
        wrapper.append(...addProduct(product));
      });
      previousProductsState = currentProductsState;
    }
  });
}

export default function createProducts() {
  const PRODUCTS_BLOCK = createElement(Tag.DIV, {
    className: styles.productsBlock,
  });

  store.getState().basket.products.forEach((product) => {
    PRODUCTS_BLOCK.append(...addProduct(product));
  });

  addHandlerForChangeBasket(PRODUCTS_BLOCK);

  return PRODUCTS_BLOCK;
}
