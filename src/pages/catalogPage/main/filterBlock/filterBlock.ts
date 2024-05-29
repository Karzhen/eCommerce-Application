import store from '@redux/store/configureStore';

import apiGetProducts from '@api/apiGetProducts';

import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';
import createSelect from '@baseComponents/selectV2/select';

import { Tag, TypeInput, TypeButton, Filter } from '@/interface';

import styles from './filterBlock.module.css';

function getFilterParam(FILTER_BLOCK: HTMLElement, categoriesId: string[]) {
  const filter: Filter = {};

  const category = categoriesId[categoriesId.length - 1];
  const priceStart = (
    FILTER_BLOCK.querySelector('#priceStartInput') as HTMLInputElement
  ).value;
  const priceEnd = (
    FILTER_BLOCK.querySelector('#priceEndInput') as HTMLInputElement
  ).value;
  const brand = (
    FILTER_BLOCK.querySelector('#filterBrand') as HTMLElement
  ).children[0].getAttribute('value');
  const color = (
    FILTER_BLOCK.querySelector('#filterColor') as HTMLElement
  ).children[0].getAttribute('value');
  const size1 = FILTER_BLOCK.querySelector(
    '#checkboxSize1',
  ) as HTMLInputElement;
  const size2 = FILTER_BLOCK.querySelector(
    '#checkboxSize2',
  ) as HTMLInputElement;
  const size3 = FILTER_BLOCK.querySelector(
    '#checkboxSize3',
  ) as HTMLInputElement;

  if (category) {
    filter.category = category;
  }
  if (priceStart) {
    filter.priceStart = Number(priceStart) * 100;
  }
  if (priceEnd) {
    filter.priceEnd = Number(priceEnd) * 100;
  }
  if (brand) {
    filter.brand = brand;
  }
  if (color) {
    filter.color = color;
  }
  if (size1.checked) {
    if (!filter.size) {
      filter.size = [];
    }
    filter.size.push(size1.value);
  }
  if (size2.checked) {
    if (!filter.size) {
      filter.size = [];
    }
    filter.size.push(size2.value);
  }
  if (size3.checked) {
    if (!filter.size) {
      filter.size = [];
    }
    filter.size.push(size3.value);
  }

  return filter;
}

async function handlerClickSubmit(
  FILTER_BLOCK: HTMLElement,
  categoriesId: string[],
) {
  const filter = getFilterParam(FILTER_BLOCK, categoriesId);

  await apiGetProducts(filter);
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
        option: { id: `checkboxSize${ind + 1}` },
        handler: {},
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
    handler: {},
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
    handler: {},
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
      handler: {},
    },
    store.getState().parameters.attributes.brand.value,
  );

  SECTION_FILTER_BRAND.append(LEGEND, BRAND);
  WRAPPER.append(SECTION_FILTER_BRAND);
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
      handler: {},
    },
    store.getState().parameters.attributes.color.value,
  );

  SECTION_FILTER_COLOR.append(LEGEND, COLOR);
  WRAPPER.append(SECTION_FILTER_COLOR);
  return WRAPPER;
}

export default function createFilterBlock(categoriesId: string[]) {
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

  const FILTER_SIZE = createFilterSize();

  const FILTER_PRICE = createFilterPrice();

  const FILTER_BRAND = createFilterBrand();

  const FILTER_COLOR = createFilterColor();

  FORM.append(FILTER_SIZE, FILTER_PRICE, FILTER_BRAND, FILTER_COLOR);

  const BUTTON_SUBMIT = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Submit', className: styles.submit },
    handler: {
      handlerClick: () => handlerClickSubmit(FILTER_BLOCK, categoriesId),
    },
  });

  FORM.append(BUTTON_SUBMIT);

  FILTER_BLOCK.append(TITLE, FORM);

  return FILTER_BLOCK;
}
