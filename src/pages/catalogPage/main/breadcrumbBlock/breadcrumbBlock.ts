import store from '@/redux/store/configureStore';

import createElement from '@utils/create-element';

import createLink from '@baseComponents/link/link';

import { Tag } from '@/interface';

import styles from './breadcrumbBlock.module.css';

function handlerLinkClick(event: Event, goPage: (path: string) => void) {
  event.preventDefault();
  const element = event.target as HTMLAnchorElement;
  const path = element.getAttribute('href') || '';
  goPage(path);
}

export default function createBreadcrumbBlock(goPage: (path: string) => void) {
  const BREADCRUMB_BLOCK = createElement(Tag.DIV, {
    className: styles.breadcrumbBlock,
  });

  const LINK_ROOT = createLink({
    option: {
      textContent: 'Catalog',
      className: styles.breadcrumb,
    },
    handler: {
      handlerClick: (event: Event) => handlerLinkClick(event, goPage),
    },
  });
  LINK_ROOT.setAttribute('href', '/catalog');
  BREADCRUMB_BLOCK.append(LINK_ROOT);

  const categoriesId = store.getState().filter.category;
  if (categoriesId && categoriesId.length > 0) {
    let url = '';
    categoriesId.forEach((category) => {
      url += `/${category}`;

      const SEPARATOR = createElement(Tag.DIV, {
        className: styles.separator,
        textContent: ' > ',
      });

      const LINK_CATEGORY = createLink({
        option: {
          textContent: store
            .getState()
            .parameters.categories.find((el) => el.id === category)?.name,
          className: styles.breadcrumb,
        },
        handler: {
          handlerClick: (event: Event) => handlerLinkClick(event, goPage),
        },
      });
      LINK_CATEGORY.setAttribute('href', `/catalog${url}`);
      BREADCRUMB_BLOCK.append(SEPARATOR, LINK_CATEGORY);
    });
  }

  return BREADCRUMB_BLOCK;
}
