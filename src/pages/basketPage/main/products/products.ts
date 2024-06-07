import store from '@redux/store/configureStore';

import createElement from '@/utils/create-element';

import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';

import { Tag, ProductM, TypeInput, TypeButton } from '@/interface';

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

function addProduct(product: ProductM) {
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

  const PRICE = createElement(Tag.LABEL, {
    className: styles.price,
    textContent: String(product.price),
  });

  const DISCOUNT = createElement(Tag.LABEL, {
    className: styles.discount,
    textContent: String(product.discount),
  });

  const DELETE_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Delete' },
    handler: {},
  });

  return [
    TITLE,
    WRAPPER_IMAGE,
    PRICE,
    DISCOUNT,
    addCountBlock(1),
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
