import store from '@redux/store/configureStore';

import createElement from '@utils/create-element';
import createButton from '@baseComponents/button/button';

import { Tag, Page, CategoryM } from '@/interface';

import apiGetProducts from '@api/apiGetProducts';

import createGridBlock from './gridBlock/gridBlock';

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

function createContent(goPage: (path: string) => void) {
  const CONTENT = createElement(Tag.DIV, {
    className: styles.content,
  });

  const MENU = createElement(Tag.DIV, { className: styles.menu });

  const FIELD = createElement(Tag.DIV, {
    className: styles.field,
  });

  const GRID = createGridBlock(goPage);
  FIELD.append(GRID);

  CONTENT.append(MENU, FIELD);

  return CONTENT;
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

export default async function createCatalogPage(
  goPage: (path: string) => void,
  categoriesId: string[],
) {
  const MAIN = createElement(Tag.MAIN, {
    className: styles.main,
  });

  let CONTENT_PAGE;
  if (categoriesId.length === 0) {
    await apiGetProducts();
    CONTENT_PAGE = createContent(goPage);
  } else {
    const isCategoriesExist = isExistChain(categoriesId);

    if (isCategoriesExist) {
      const category = categoriesId[categoriesId.length - 1];

      const filter: {
        category?: string;
        priceStart?: number;
        priceEnd?: number;
        brand?: string;
        size?: string[];
      } = {};

      filter.category = category;
      await apiGetProducts(filter);
      CONTENT_PAGE = createContent(goPage);
    } else {
      CONTENT_PAGE = createErrorCategoryPage(goPage);
    }
  }

  MAIN.append(CONTENT_PAGE);

  return MAIN;
}
