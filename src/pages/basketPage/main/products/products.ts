import store from '@redux/store/configureStore';

import createElement from '@/utils/create-element';

import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';

import { Tag, ProductBasket, TypeInput, TypeButton } from '@/interface';

import styles from './products.module.css';

function addCountBlock(count: number) {
  const COUNT_BLOCK = createElement(Tag.DIV, { className: styles.promoBlock });

  const INPUT_COUNT = createInput({
    type: TypeInput.TEXT,
    option: {},
    handler: {},
  });
  INPUT_COUNT.setAttribute('value', String(count));

  const COUNT_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Submit' },
    handler: {},
  });

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
    textContent: String(product.price),
  });
  WRAPPER_PRICE.append(PRICE);

  if (product.discount) {
    const DISCOUNT = createElement(Tag.LABEL, {
      className: styles.discount,
      textContent: String(product.discount),
    });
    WRAPPER_PRICE.append(DISCOUNT);
  }

  const TOTAL_VALUE = createElement(Tag.LABEL, {
    className: styles.totalValue,
    textContent: String(product.totalPrice),
  });

  const DELETE_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Delete' },
    handler: {},
  });

  return [
    TITLE,
    WRAPPER_IMAGE,
    SIZE,
    COLOR,
    WRAPPER_PRICE,
    addCountBlock(product.quantity),
    TOTAL_VALUE,
    DELETE_BUTTON,
  ];
}

export default function createProducts() {
  const PRODUCTS_BLOCK = createElement(Tag.DIV, {
    className: styles.productsBlock,
  });

  store.getState().basket.products.forEach((product) => {
    PRODUCTS_BLOCK.append(...addProduct(product));
  });

  return PRODUCTS_BLOCK;
}
