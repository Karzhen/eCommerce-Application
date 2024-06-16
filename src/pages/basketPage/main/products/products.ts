import store from '@redux/store/configureStore';

import apiChangeQuantity from '@/api/apiChangeQuantity';
import apiDeleteProductFromBasket from '@api/apiDeleteProductFromBasket';

import createElement from '@/utils/create-element';

import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';
import createPopUp from '@components/popUp/popUp';

import formatPrice from '@utils/formatPrice';

import { Tag, ProductBasket, TypeInput, TypeButton } from '@/interface';

import styles from './products.module.css';

function addCountBlock(count: number, itemBasketId: string) {
  const COUNT_BLOCK = createElement(Tag.DIV, {
    className: styles.promoBlock,
  });

  let INPUT_COUNT: HTMLElement;
  const COUNT_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      textContent: 'Submit',
      id: `setQuantity:${itemBasketId}`,
    },
    handler: {
      handlerClick: async () => {
        if (
          INPUT_COUNT instanceof HTMLInputElement &&
          Number(INPUT_COUNT.value) > 0 &&
          Number(INPUT_COUNT.value) % 1 === 0
        ) {
          INPUT_COUNT.value = String(Number(INPUT_COUNT.value));
          COUNT_BUTTON.setAttribute('disabled', '');

          const elInputQuantity = document.getElementById(
            `inputQuantity:${itemBasketId}`,
          );
          if (elInputQuantity instanceof HTMLInputElement) {
            const SPINNER = document.getElementById('spinner');
            if (SPINNER) {
              SPINNER.style.display = 'block';
            }
            await apiChangeQuantity(
              itemBasketId,
              Number(elInputQuantity.value),
            );
            if (SPINNER) {
              SPINNER.style.display = 'none';
            }
          }
        } else {
          const previousQuantity = store
            .getState()
            .basket.products.find(
              (product) => product.itemBasketId === itemBasketId,
            )?.quantity;
          (INPUT_COUNT as HTMLInputElement).value = String(previousQuantity);
          COUNT_BUTTON.setAttribute('disabled', '');
          const POPUP = createPopUp(
            'Error',
            'Enter an integer greater than 0',
            false,
          );
          document.body.appendChild(POPUP);
          (POPUP as HTMLDialogElement).showModal();
        }
      },
    },
  });
  COUNT_BUTTON.setAttribute('disabled', '');

  INPUT_COUNT = createInput({
    type: TypeInput.NUMBER,
    option: {
      id: `inputQuantity:${itemBasketId}`,
    },
    handler: {
      handlerInput: () => {
        COUNT_BUTTON.removeAttribute('disabled');
      },
    },
  });
  INPUT_COUNT.setAttribute('min', '1');
  INPUT_COUNT.setAttribute('step', '1');
  INPUT_COUNT.setAttribute('value', String(count));

  COUNT_BLOCK.append(INPUT_COUNT, COUNT_BUTTON);

  return COUNT_BLOCK;
}

function addProduct(product: ProductBasket) {
  const WRAPPER_TITLE = createElement(Tag.DIV, {
    className: styles.wrapperTitle,
  });

  const TITLE = createElement(Tag.LABEL, {
    className: styles.title,
    textContent: product.name,
  });

  const WRAPPER_ATTRIBUTES = createElement(Tag.DIV, {
    className: styles.wrapperAttributes,
  });

  const SIZE = createElement(Tag.LABEL, {
    className: styles.size,
    textContent: product.size,
  });

  const COLOR = createElement(Tag.LABEL, {
    className: styles.color,
  });
  COLOR.style.setProperty('--color', product.color);

  WRAPPER_ATTRIBUTES.append(SIZE, COLOR);
  WRAPPER_TITLE.append(TITLE, WRAPPER_ATTRIBUTES);

  const WRAPPER_IMAGE = createElement(Tag.DIV, {
    className: styles.wrapperProductImg,
  });

  const IMAGE = createElement(Tag.IMG, {
    className: styles.productImg,
  });
  IMAGE.setAttribute('src', product.img[0]);

  WRAPPER_IMAGE.append(IMAGE);

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

  const WRAPPER_DELETE = createElement(Tag.DIV, {});
  const DELETE_BUTTON = createButton({
    type: TypeButton.SECONDARY,
    option: {
      className: styles.deleteButton,
      textContent: 'Remove from Cart',
      id: `buttonDelete:${product.id}:${product.variantId}`,
    },
    handler: {
      handlerClick: async () => {
        const SPINNER = document.getElementById('spinner');
        if (SPINNER) {
          SPINNER.style.display = 'block';
        }
        await apiDeleteProductFromBasket(product.itemBasketId);
        if (SPINNER) {
          SPINNER.style.display = 'none';
        }
      },
    },
  });
  WRAPPER_DELETE.append(DELETE_BUTTON);

  return [
    WRAPPER_TITLE,
    WRAPPER_IMAGE,
    WRAPPER_PRICE,
    addCountBlock(product.quantity, product.itemBasketId),
    TOTAL_VALUE,
    WRAPPER_DELETE,
  ];
}

function addHeader(titles: string[]) {
  return titles.map((title) =>
    createElement(Tag.LABEL, {
      className: styles.titleTable,
      textContent: title,
    }),
  );
}

function createTable(element: HTMLElement) {
  element.append(
    ...addHeader([
      'Name (size, color)',
      'Image',
      'Price',
      'Quantity',
      'Total Price',
      'Delete',
    ]),
  );
  store.getState().basket.products.forEach((product) => {
    element.append(...addProduct(product));
  });
}

function addHandlerForChangeBasket(wrapper: HTMLElement) {
  let previousProductsState = store.getState().basket.products;
  store.subscribe(() => {
    const currentProductsState = store.getState().basket.products;
    if (previousProductsState !== currentProductsState) {
      wrapper.replaceChildren();
      createTable(wrapper);
      previousProductsState = currentProductsState;
    }
  });
}

export default function createProducts() {
  const PRODUCTS_BLOCK = createElement(Tag.DIV, {
    className: styles.productsBlock,
  });

  // createTable(PRODUCTS_BLOCK);

  if  (store.getState().basket.products.length  > 0)  {
    store.getState().basket.products.forEach((product) => {
      PRODUCTS_BLOCK.append(...addProduct(product));
    });

    addHandlerForChangeBasket(PRODUCTS_BLOCK);
  } else {
    const emptyText = createElement(Tag.H1, {
      className: styles.emptyCart,
      textContent: 'The Cart is empty',
    });
    PRODUCTS_BLOCK.append(emptyText);
    PRODUCTS_BLOCK.classList.add(styles.productsEmpty);
  }

  return PRODUCTS_BLOCK;
}
