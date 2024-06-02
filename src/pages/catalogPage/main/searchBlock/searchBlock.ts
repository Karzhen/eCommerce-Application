import apiGetProducts from '@api/apiGetProducts';

import createElement from '@utils/create-element';
import createInputWithIcon from '@baseComponents/inputWithIcon/inputWithIcon';

import { Tag, TypeInput } from '@/interface';

import iconSearch from '@assets/images/search.png';

import styles from './searchBlock.module.css';
import getFilterParam from '../getFilterParam';

async function handlerSearchClick(SEARCH_BLOCK: HTMLElement) {
  const filter = getFilterParam(document.body, []);
  const search = SEARCH_BLOCK.querySelector('#inputSearch');
  if (search instanceof HTMLInputElement) {
    await apiGetProducts(filter, search.value);
  }
}

function handlerKeySearchClick(event: Event, SEARCH_BLOCK: HTMLElement) {
  if (event instanceof KeyboardEvent) {
    if (event.key === 'Enter') {
      handlerSearchClick(SEARCH_BLOCK);
    }
  }
}

export default function createSearchBlock() {
  const SEARCH_BLOCK = createElement(Tag.DIV, {
    className: styles.searchBlock,
  });

  const TITLE = createElement(Tag.DIV, {
    className: styles.titleSearch,
    textContent: 'Search',
  });

  const INPUT_SEARCH = createInputWithIcon({
    type: TypeInput.TEXT,
    option: {
      id: 'inputSearch',
      className: styles.inputSearch,
    },
    iconUrl: iconSearch,
    handler: {
      handlerClickIcon: () => handlerSearchClick(SEARCH_BLOCK),
      handlerKeyClick: (event: Event) =>
        handlerKeySearchClick(event, SEARCH_BLOCK),
    },
  });
  INPUT_SEARCH.setAttribute('placeholder', 'Search');

  SEARCH_BLOCK.append(TITLE, INPUT_SEARCH);

  return SEARCH_BLOCK;
}
