import store from '@redux/store/configureStore';

import { SET_CATEGORIES } from '@actions/filter';

import createElement from '@utils/create-element';
import createButton from '@baseComponents/button/button';

import { Tag, Page, CategoryM } from '@/interface';

import apiGetProducts from '@api/apiGetProducts';

import apiGetAttributes from '@api/apiGetAttributes';
import apiGetCategories from '@api/apiGetCategories';

import urlFilter from '@assets/images/filter.png';

import createFilterBlock from './filterBlock/filterBlock';
import createGridBlock from './gridBlock/gridBlock';
import createSearchBlock from './searchBlock/searchBlock';
import createBreadcrumbBlock from './breadcrumbBlock/breadcrumbBlock';
import createCategoriesBlock from './categoriesBlock/categoriesBlock';

import styles from './main.module.css';

function handlerClickButtonCatalog(goPage: (path: string) => void) {
  goPage(Page.CATALOG);
}

function createErrorCategoryPage(goPage: (path: string) => void) {
  const WRAPPER = createElement(Tag.DIV, {
    className: styles.wrapper,
  });

  const TITLE = createElement(Tag.LABEL, {
    textContent: 'Error: Category not found',
  });

  const BUTTON_BACK_TO_CATALOG = createButton({
    option: {
      textContent: 'Back to catalog',
    },
    handler: { handlerClick: () => handlerClickButtonCatalog(goPage) },
  });

  WRAPPER.append(TITLE, BUTTON_BACK_TO_CATALOG);
  return WRAPPER;
}

function isExistChain(categoriesId: string[]) {
  const allCategories = store.getState().parameters.categories;

  const categoryMap = allCategories.reduce<Record<string, CategoryM>>(
    (map, category) => ({
      ...map,
      [category.id]: category,
    }),
    {},
  );

  const firstCategory = categoryMap[categoriesId[0]];
  if (!firstCategory) {
    return false;
  }

  return categoriesId.every((id, index, ids) => {
    if (index === 0) return true;
    const currentCategory = categoryMap[id];
    const previousCategory = categoryMap[ids[index - 1]];
    return (
      !!currentCategory &&
      !!previousCategory &&
      currentCategory.parent === previousCategory.id
    );
  });
}

function handlerIconFilterClick() {
  const MENU = document.getElementById('menuCatalogPage');
  const CONTENT = document.getElementById('contentCatalogPage');
  if (MENU && CONTENT && !MENU.getAttribute('open')) {
    MENU.setAttribute('open', 'true');
  } else if (MENU && CONTENT && MENU.getAttribute('open')) {
    MENU?.removeAttribute('open');
  }
}

export async function createContentCatalogPage(
  goPage: (path: string) => void,
  categoriesId: string[],
) {
  store.dispatch(SET_CATEGORIES(categoriesId));

  const CONTENT = createElement(Tag.DIV, {
    className: styles.content,
    id: 'contentCatalogPage',
  });
  const BREADCRUMB_BLOCK = createBreadcrumbBlock(goPage);

  CONTENT.append(BREADCRUMB_BLOCK);

  if (categoriesId && categoriesId.length === 0) {
    await apiGetProducts();

    const GRID = createGridBlock(goPage);
    CONTENT.append(GRID);
  } else if (categoriesId) {
    const isCategoriesExist = isExistChain(categoriesId);

    if (isCategoriesExist) {
      const { filter } = store.getState();
      await apiGetProducts(filter);

      const GRID = createGridBlock(goPage);
      CONTENT.append(GRID);
    } else {
      const ERROR_PAGE = createErrorCategoryPage(goPage);
      CONTENT.append(ERROR_PAGE);
    }
  }

  return CONTENT;
}

async function createMenuCatalogPage(goPage: (path: string) => void) {
  await apiGetCategories();
  await apiGetAttributes();

  const MENU = createElement(Tag.DIV, {
    className: styles.menu,
    id: 'menuCatalogPage',
  });

  const CATEGORIES_BLOCK = createCategoriesBlock(goPage);
  const SEARCH_BLOCK = createSearchBlock();
  const FILTER_BLOCK = createFilterBlock();
  MENU.append(CATEGORIES_BLOCK, SEARCH_BLOCK, FILTER_BLOCK);

  return MENU;
}

export default async function createMainCatalogPage(
  goPage: (path: string) => void,
  categoriesId: string[],
) {
  const MAIN = createElement(Tag.MAIN, {
    className: styles.main,
    id: 'mainCatalogPage',
  });
  const IMG_FILTER = createElement(Tag.IMG, {
    className: styles.imgFilter,
  });
  IMG_FILTER.setAttribute('src', urlFilter);
  IMG_FILTER.addEventListener('click', handlerIconFilterClick);

  const WRAPPER = createElement(Tag.DIV, {
    className: styles.wrapper,
  });

  const MENU = await createMenuCatalogPage(goPage);
  const CONTENT = await createContentCatalogPage(goPage, categoriesId);

  WRAPPER.append(MENU, CONTENT);
  MAIN.append(IMG_FILTER, WRAPPER);

  return MAIN;
}
