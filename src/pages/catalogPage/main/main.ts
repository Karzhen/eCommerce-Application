import store from '@redux/store/configureStore';

import createElement from '@utils/create-element';
import createButton from '@baseComponents/button/button';

import { Tag, Page, CategoryM, Filter } from '@/interface';

import apiGetProducts from '@api/apiGetProducts';

import apiGetAttributes from '@api/apiGetAttributes';
import apiGetCategories from '@api/apiGetCategories';

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

  const BUTTON_BACR_TO_CATALOG = createButton({
    option: {
      textContent: 'Back to catalog',
    },
    handler: { handlerClick: () => handlerClickButtonCatalog(goPage) },
  });

  WRAPPER.append(TITLE, BUTTON_BACR_TO_CATALOG);
  return WRAPPER;
}

function isExistChain(categoryIds: string[]) {
  const allCategories = store.getState().parameters.categories;

  const categoryMap = allCategories.reduce<Record<string, CategoryM>>(
    (map, category) => ({
      ...map,
      [category.id]: category,
    }),
    {},
  );

  const firstCategory = categoryMap[categoryIds[0]];
  if (!firstCategory) {
    return false;
  }

  return categoryIds.every((id, index, ids) => {
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

export async function createContentCatalogPage(
  goPage: (path: string) => void,
  categoriesId: string[],
) {
  const CONTENT = createElement(Tag.DIV, {
    className: styles.content,
    id: 'contentCatalogPage',
  });
  const BREADCRUMB_BLOCK = createBreadcrumbBlock(goPage, categoriesId);
  CONTENT.append(BREADCRUMB_BLOCK);

  if (categoriesId.length === 0) {
    await apiGetProducts();

    const GRID = createGridBlock(goPage);
    CONTENT.append(GRID);
  } else {
    const isCategoriesExist = isExistChain(categoriesId);

    if (isCategoriesExist) {
      const category = categoriesId[categoriesId.length - 1];

      const filter: Filter = {};
      filter.category = category;
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

async function createMenuCatalogPage(
  goPage: (path: string) => void,
  categoriesId: string[],
) {
  await apiGetCategories();
  await apiGetAttributes();

  const MENU = createElement(Tag.DIV, { className: styles.menu });

  const CATEGORIES_BLOCK = createCategoriesBlock(goPage);
  const SEARCH_BLOCK = createSearchBlock();
  const FILTER_BLOCK = createFilterBlock(categoriesId);
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

  const MENU = await createMenuCatalogPage(goPage, categoriesId);
  const CONTENT = await createContentCatalogPage(goPage, categoriesId);

  MAIN.append(MENU, CONTENT);

  return MAIN;
}
