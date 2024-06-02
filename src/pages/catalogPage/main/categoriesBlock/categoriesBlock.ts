import store from '@redux/store/configureStore';

import createElement from '@utils/create-element';
import createLink from '@baseComponents/link/link';

import { Tag } from '@/interface';

import styles from './categoriesBlock.module.css';

function clearFilter() {
  const sort = document.querySelector('#sort') as HTMLElement;
  sort.children[0].setAttribute('value', 'ASC.price');
  sort.children[0].textContent = 'price ASC';
  const priceStart = document.querySelector(
    '#priceStartInput',
  ) as HTMLInputElement;
  priceStart.value = '';
  const priceEnd = document.querySelector('#priceEndInput') as HTMLInputElement;
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
