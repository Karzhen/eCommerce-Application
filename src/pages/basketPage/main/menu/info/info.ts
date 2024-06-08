import store from '@redux/store/configureStore';

import createElement from '@/utils/create-element';

import formatPrice from '@utils/formatPrice';

import { Tag } from '@/interface';

import styles from './info.module.css';

function addInfo() {
  const WRAPPER_TOTAL_PRICE = createElement(Tag.DIV, {
    className: styles.wrapperTotalPrice,
  });
  const LABEL_TOTAL_PRICE = createElement(Tag.LABEL, {
    className: styles.labelTotalPrice,
    textContent: 'Total price:',
  });

  const TOTAL_PRICE = createElement(Tag.LABEL, {
    className: styles.totalPrice,
    textContent: formatPrice(
      store.getState().basket.totalPrice,
      store.getState().local.currencyCode,
    ),
  });
  WRAPPER_TOTAL_PRICE.append(LABEL_TOTAL_PRICE, TOTAL_PRICE);

  const WRAPPER_TOTAL_QUANTITY = createElement(Tag.DIV, {
    className: styles.wrapperTotalQuantity,
  });
  const LABEL_TOTAL_QUANTITY = createElement(Tag.LABEL, {
    className: styles.labelTotalQuantity,
    textContent: 'Total quantity:',
  });
  const TOTAL_QUANTITY = createElement(Tag.LABEL, {
    className: styles.totalQuantity,
    textContent: String(store.getState().basket.totalQuantity),
  });
  WRAPPER_TOTAL_QUANTITY.append(LABEL_TOTAL_QUANTITY, TOTAL_QUANTITY);

  const WRAPPER_LAST_MODIFIED_DATE = createElement(Tag.DIV, {
    className: styles.wrapperLastModifiedDate,
  });
  const LABEL_LAST_MODIFIED_DATE = createElement(Tag.LABEL, {
    className: styles.labelLastModifiedDate,
    textContent: 'Last modified:',
  });
  const LAST_MODIFIED_DATE = createElement(Tag.LABEL, {
    className: styles.lastModifiedDate,
    textContent: store.getState().basket.lastModified,
  });
  WRAPPER_LAST_MODIFIED_DATE.append(
    LABEL_LAST_MODIFIED_DATE,
    LAST_MODIFIED_DATE,
  );
  return [
    WRAPPER_TOTAL_PRICE,
    WRAPPER_TOTAL_QUANTITY,
    WRAPPER_LAST_MODIFIED_DATE,
  ];
}

function addHandlerForChangeBasket(wrapper: HTMLElement) {
  let previousProductsState = store.getState().basket.products;
  store.subscribe(() => {
    const currentProductsState = store.getState().basket.products;
    if (previousProductsState !== currentProductsState) {
      wrapper.replaceChildren();
      wrapper.append(...addInfo());
      previousProductsState = currentProductsState;
    }
  });
}

export default function createInfoBlock() {
  const INFO_BLOCK = createElement(Tag.DIV, {
    className: styles.infoBlock,
  });
  INFO_BLOCK.append(...addInfo());

  addHandlerForChangeBasket(INFO_BLOCK);

  return INFO_BLOCK;
}
