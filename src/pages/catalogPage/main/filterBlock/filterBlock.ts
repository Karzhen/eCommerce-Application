import store from '@redux/store/configureStore';
import {
  SET_SORT,
  SET_BRAND,
  SET_COLOR,
  SET_START_PRICE,
  SET_END_PRICE,
  SET_SIZE1,
  SET_SIZE2,
  SET_SIZE3,
  CLEAR_FILTER,
} from '@/redux/actions/filter';

import apiGetProducts from '@api/apiGetProducts';

import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';
import createSelect from '@baseComponents/selectV2/select';

import { Tag, TypeInput, TypeButton } from '@/interface';

import styles from './filterBlock.module.css';
import { createPaginationButtons } from '../main';

export function clearFilter() {
  if (document.getElementById('menuCatalogPage')) {
    const sort = document.querySelector('#sort') as HTMLElement;
    sort.children[0].setAttribute('value', 'ASC.price');
    sort.children[0].textContent = 'price ASC';
    const priceStart = document.querySelector(
      '#priceStartInput',
    ) as HTMLInputElement;
    priceStart.value = '';
    const priceEnd = document.querySelector(
      '#priceEndInput',
    ) as HTMLInputElement;
    priceEnd.value = '';
    const brand = document.querySelector('#filterBrand') as HTMLElement;
    brand.children[0].setAttribute('value', '');
    brand.children[0].textContent = 'Choose';
    const color = document.querySelector('#filterColor') as HTMLElement;
    color.children[0].setAttribute('value', '');
    color.children[0].textContent = 'Choose';
    const size1 = document.querySelector('#checkboxSize1') as HTMLInputElement;
    size1.checked = false;
    const size2 = document.querySelector('#checkboxSize2') as HTMLInputElement;
    size2.checked = false;
    const size3 = document.querySelector('#checkboxSize3') as HTMLInputElement;
    size3.checked = false;
    const search = document.querySelector('#inputSearch') as HTMLInputElement;
    search.value = '';
  }
}

async function handlerClickSubmit() {
  const { filter } = store.getState();
  await apiGetProducts(filter);
  const PAGINATION = document.getElementById('pagination') as HTMLElement;
  createPaginationButtons(PAGINATION);

  const MENU = document.getElementById('menuCatalogPage');
  if (MENU && MENU.getAttribute('open') === 'true') {
    MENU.removeAttribute('open');
  }
}

function createFilterSize() {
  const WRAPPER = createElement(Tag.DIV, {
    className: styles.wrapperFilterSize,
  });

  const SECTION_FILTER_SIZE = createElement(Tag.FIELDSET, {});
  const LEGEND = createElement(Tag.LEGEND, { textContent: 'Size' });

  store
    .getState()
    .parameters.attributes.size.value.forEach((attribute, ind) => {
      const WRAPPER_CHECKBOX = createElement(Tag.DIV, {
        className: styles.wrapperSize1,
      });
      const LABEL_SIZE = createElement(Tag.LABEL, {
        textContent: attribute.label,
      });
      LABEL_SIZE.setAttribute('for', 'checkboxSize1');
      const CHECKBOX_SIZE = createInput({
        type: TypeInput.CHECKBOX,
        option: { id: `checkboxSize${ind + 1}`, className: styles.sizes },
        handler: {
          handlerInput: (event: Event) => {
            const el = event.target as HTMLInputElement;
            switch (ind) {
              case 0:
                store.dispatch(SET_SIZE1(el.checked));
                break;
              case 1:
                store.dispatch(SET_SIZE2(el.checked));
                break;
              case 2:
                store.dispatch(SET_SIZE3(el.checked));
                break;
              default:
                break;
            }
          },
        },
      });
      CHECKBOX_SIZE.setAttribute('value', attribute.key);
      WRAPPER_CHECKBOX.append(LABEL_SIZE, CHECKBOX_SIZE);

      SECTION_FILTER_SIZE.append(WRAPPER_CHECKBOX);
    });

  SECTION_FILTER_SIZE.append(LEGEND);

  WRAPPER.append(SECTION_FILTER_SIZE);

  return WRAPPER;
}

function createFilterPrice() {
  const WRAPPER = createElement(Tag.DIV, {
    className: styles.wrapperFilterPrice,
  });

  const SECTION_FILTER_SIZE = createElement(Tag.FIELDSET, {});
  const LEGEND = createElement(Tag.LEGEND, { textContent: 'Price' });

  const WRAPPER_PRICE_START = createElement(Tag.DIV, {
    className: styles.wrapperPriceStart,
  });
  const LABEL_PRICE_START = createElement(Tag.LABEL, {
    textContent: 'Start price',
  });
  const FILTER_START_PRICE = createInput({
    type: TypeInput.TEXT,
    option: {
      id: 'priceStartInput',
      className: styles.priceStartInput,
      placeholder: 'Start price',
    },
    handler: {
      handlerInput: (event: Event) => {
        const el = event.target as HTMLInputElement;
        store.dispatch(SET_START_PRICE(Number(el.value)));
      },
    },
  });

  WRAPPER_PRICE_START.append(LABEL_PRICE_START, FILTER_START_PRICE);

  const WRAPPER_PRICE_END = createElement(Tag.DIV, {
    className: styles.wrapperPriceEnd,
  });
  const LABEL_PRICE_END = createElement(Tag.LABEL, {
    textContent: 'End price',
  });
  const FILTER_END_PRICE = createInput({
    type: TypeInput.TEXT,
    option: {
      id: 'priceEndInput',
      className: styles.priceEndInput,
      placeholder: 'End price',
    },
    handler: {
      handlerInput: (event: Event) => {
        const el = event.target as HTMLInputElement;
        store.dispatch(SET_END_PRICE(Number(el.value)));
      },
    },
  });

  WRAPPER_PRICE_END.append(LABEL_PRICE_END, FILTER_END_PRICE);

  SECTION_FILTER_SIZE.append(LEGEND, WRAPPER_PRICE_START, WRAPPER_PRICE_END);
  WRAPPER.append(SECTION_FILTER_SIZE);
  return WRAPPER;
}

function createFilterBrand() {
  const WRAPPER = createElement(Tag.DIV, {
    className: styles.wrapperFilterBrand,
  });

  const SECTION_FILTER_BRAND = createElement(Tag.FIELDSET, {});
  const LEGEND = createElement(Tag.LEGEND, { textContent: 'Brand' });

  const BRAND = createSelect(
    {
      option: { id: 'filterBrand' },
      handler: {
        handlerChange: (event: Event) => {
          const el = event.target as HTMLElement;
          const brand = el.getAttribute('value');
          if (brand) store.dispatch(SET_BRAND(brand));
        },
      },
    },
    store.getState().parameters.attributes.brand.value,
  );

  SECTION_FILTER_BRAND.append(LEGEND, BRAND);
  WRAPPER.append(SECTION_FILTER_BRAND);
  return WRAPPER;
}

function createSortBlock() {
  const WRAPPER = createElement(Tag.DIV, {});

  const SECTION_SORT = createElement(Tag.FIELDSET, {});
  const LEGEND = createElement(Tag.LEGEND, { textContent: 'Sort' });

  const SORT = createSelect(
    {
      option: { id: 'sort' },
      handler: {
        handlerChange: (event: Event) => {
          const el = event.target as HTMLInputElement;
          const sort = el.getAttribute('value');
          if (sort) {
            const [order, name] = sort.split('.');
            store.dispatch(SET_SORT({ name, order }));
          }
        },
      },
    },
    [
      { label: 'price ASC', key: 'ASC.price' },
      { label: 'price DESC', key: 'DESC.price' },
      { label: 'name ASC', key: 'ASC.name' },
      { label: 'name DESC', key: 'DESC.name' },
    ],
    { label: 'price ASC', key: 'ASC.price' },
  );

  SECTION_SORT.append(LEGEND, SORT);
  WRAPPER.append(SECTION_SORT);
  return WRAPPER;
}

function createFilterColor() {
  const WRAPPER = createElement(Tag.DIV, {
    className: styles.wrapperFilterColor,
  });

  const SECTION_FILTER_COLOR = createElement(Tag.FIELDSET, {});
  const LEGEND = createElement(Tag.LEGEND, { textContent: 'Color' });

  const COLOR = createSelect(
    {
      option: { id: 'filterColor' },
      handler: {
        handlerChange: (event: Event) => {
          const el = event.target as HTMLInputElement;
          const color = el.getAttribute('value');
          if (color) store.dispatch(SET_COLOR(color));
        },
      },
    },
    store.getState().parameters.attributes.color.value,
  );

  SECTION_FILTER_COLOR.append(LEGEND, COLOR);
  WRAPPER.append(SECTION_FILTER_COLOR);
  return WRAPPER;
}

async function handlerClickClear() {
  clearFilter();
  store.dispatch(CLEAR_FILTER());

  const { filter } = store.getState();
  await apiGetProducts(filter);
  const PAGINATION = document.getElementById('pagination') as HTMLElement;
  createPaginationButtons(PAGINATION);

  const MENU = document.getElementById('menuCatalogPage');
  if (MENU && MENU.getAttribute('open') === 'true') {
    MENU.removeAttribute('open');
  }
}

export default function createFilterBlock() {
  const FILTER_BLOCK = createElement(Tag.DIV, {
    className: styles.filterBlock,
  });

  const TITLE = createElement(Tag.DIV, {
    className: styles.titleFilter,
    textContent: 'Filter',
  });

  const FORM = createElement(Tag.DIV, {
    className: styles.form,
  });

  const SORT = createSortBlock();

  const FILTER_SIZE = createFilterSize();

  const FILTER_PRICE = createFilterPrice();

  const FILTER_BRAND = createFilterBrand();

  const FILTER_COLOR = createFilterColor();

  FORM.append(SORT, FILTER_SIZE, FILTER_PRICE, FILTER_BRAND, FILTER_COLOR);

  const BUTTON_SUBMIT = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Submit', className: styles.submit },
    handler: {
      handlerClick: () => handlerClickSubmit(),
    },
  });

  const BUTTON_CLEAR = createButton({
    type: TypeButton.TRANSPARENT,
    option: {
      textContent: 'Clear',
      className: styles.buttonClear,
    },
    handler: { handlerClick: () => handlerClickClear() },
  });

  const WRAPPER_BUTTONS = createElement(Tag.DIV, {
    className: styles.wrapperButtons,
  });

  WRAPPER_BUTTONS.append(BUTTON_SUBMIT, BUTTON_CLEAR);

  FORM.append(WRAPPER_BUTTONS);

  FILTER_BLOCK.append(TITLE, FORM);

  return FILTER_BLOCK;
}
