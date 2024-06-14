import store from '@redux/store/configureStore';
import { SET_SEARCH } from '@/redux/actions/filter';

import apiGetProducts from '@api/apiGetProducts';

import createElement from '@utils/create-element';
import createInputWithIcon from '@baseComponents/inputWithIcon/inputWithIcon';

import { Tag, TypeInput } from '@/interface';

import iconSearch from '@assets/images/search.png';

import styles from './searchBlock.module.css';
import { createPaginationButtons } from '../main';

async function handlerSearchClick() {
  const { filter } = store.getState();
  await apiGetProducts(filter);
  const PAGINATION = document.getElementById('pagination') as HTMLElement;
  createPaginationButtons(PAGINATION);
}

function handlerKeySearchClick(event: Event) {
  if (event instanceof KeyboardEvent) {
    if (event.key === 'Enter') {
      handlerSearchClick();
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
      handlerInput: (event: Event) => {
        const el = event.target as HTMLInputElement;
        store.dispatch(SET_SEARCH(el.value));
      },
      handlerClickIcon: () => handlerSearchClick(),
      handlerKeyClick: (event: Event) => handlerKeySearchClick(event),
    },
  });
  INPUT_SEARCH.setAttribute('placeholder', 'Search');

  SEARCH_BLOCK.append(TITLE, INPUT_SEARCH);

  return SEARCH_BLOCK;
}
