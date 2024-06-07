import store from '@redux/store/configureStore';

import createElement from '@utils/create-element';
import createLink from '@baseComponents/link/link';

import { Tag } from '@/interface';

import { clearFilter } from '../filterBlock/filterBlock';

import styles from './categoriesBlock.module.css';

function handlerLinkClick(event: Event, goPage: (path: string) => void) {
  event.preventDefault();

  const element = event.target as HTMLAnchorElement;
  const path = element.getAttribute('href');

  const MENU = document.getElementById('menuCatalogPage');
  if (MENU && MENU.getAttribute('open') === 'true') {
    MENU.removeAttribute('open');
  }

  if (path) {
    clearFilter();
    goPage(path);
  }
}

function createCategories(goPage: (path: string) => void) {
  const WRAPPER = createElement(Tag.DIV, { className: styles.wrapper });

  const { categories } = store.getState().parameters;

  categories
    .slice()
    .sort((a, b) => {
      if (a.parent === null && b.parent !== null) {
        return -1;
      }
      if (a.parent !== null && b.parent === null) {
        return 1;
      }
      return 0;
    })
    .forEach((category) => {
      const WRAPPER_CATEGORY = createElement(Tag.DIV, {
        className: styles.category,
      });
      const LINK_CATEGORY = createLink({
        option: {
          id: `cat_${category.id}`,
          className: styles.tag,
          textContent: `- ${category.name}`,
        },
        handler: {
          handlerClick: (event: Event) => handlerLinkClick(event, goPage),
        },
      });
      LINK_CATEGORY.setAttribute('href', `/catalog/${category.id}`);
      WRAPPER_CATEGORY.appendChild(LINK_CATEGORY);

      if (category.parent !== null) {
        const parentCategoryURL = WRAPPER.querySelector(
          `#cat_${category.parent}`,
        )?.getAttribute('href');
        LINK_CATEGORY.setAttribute(
          'href',
          `${parentCategoryURL}/${category.id}`,
        );
        WRAPPER.querySelector(`#cat_${category.parent}`)?.parentElement?.append(
          WRAPPER_CATEGORY,
        );
      } else {
        WRAPPER.appendChild(WRAPPER_CATEGORY);
      }
    });

  return WRAPPER;
}

function addHandlerForChangeCategories(
  wrapper: HTMLElement,
  goPage: (path: string) => void,
) {
  let previousCategoriesState = store.getState().parameters.categories;
  store.subscribe(() => {
    const currentCategoriesState = store.getState().parameters.categories;
    if (previousCategoriesState !== currentCategoriesState) {
      wrapper.replaceChildren();
      wrapper.append(createCategories(goPage));
      previousCategoriesState = currentCategoriesState;
    }
  });
}

export default function createCategoriesBlock(goPage: (path: string) => void) {
  const CATEGORIES_BLOCK = createElement(Tag.DIV, {
    className: styles.categoriesBlock,
  });

  const TITLE = createElement(Tag.DIV, {
    textContent: 'Categories',
    className: styles.titleCategories,
  });

  CATEGORIES_BLOCK.append(TITLE, createCategories(goPage));

  addHandlerForChangeCategories(CATEGORIES_BLOCK, goPage);

  return CATEGORIES_BLOCK;
}
