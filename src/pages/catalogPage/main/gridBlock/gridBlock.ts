import store from '@redux/store/configureStore';

import createElement from '@utils/create-element';

import { Tag } from '@/interface';

import createProductCard from './productCard/productCard';

import styles from './gridBlock.module.css';

function createProducts(goPage: (path: string) => void) {
  const WRAPPER = createElement(Tag.DIV, { className: styles.wrapper });

  const products = store.getState().products.value;
  products.forEach((product) => {
    WRAPPER.append(createProductCard(product, goPage));
  });

  return WRAPPER;
}

function addHandlerForChangeProducts(
  wrapper: HTMLElement,
  goPage: (path: string) => void,
) {
  let previousProductsState = store.getState().products.value;
  store.subscribe(() => {
    const currentProductsState = store.getState().products.value;
    if (previousProductsState !== currentProductsState) {
      wrapper.replaceChildren();
      wrapper.append(createProducts(goPage));
      previousProductsState = currentProductsState;
    }
  });
}
export default function createGridBlock(goPage: (path: string) => void) {
  const GRID = createElement(Tag.DIV, {
    className: styles.grid,
  });

  GRID.append(createProducts(goPage));

  addHandlerForChangeProducts(GRID, goPage);
  return GRID;
}
