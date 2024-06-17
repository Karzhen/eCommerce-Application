import createElement from '@utils/create-element';

import createLink from '@baseComponents/link/link';
import createLintWithIcon from '@baseComponents/linkWithIcon/linkWithIcon';

import { Tag } from '@/interface';

import urlLogo from '@assets/images/logoRS.png';
import styles from './footer.module.css';

export default function createFooter() {
  const FOOTER = createElement(Tag.FOOTER, { className: styles.footer });

  const WRAPPER_AUTHOR = createElement(Tag.DIV, {
    className: styles.wrapperAuthor,
  });
  const LINK_AUTHOR2 = createLink({
    option: { className: styles.linkFooter, textContent: 'evvrod' },
    handler: {},
  });
  LINK_AUTHOR2.setAttribute('href', 'https://github.com/evvrod');

  const LINK_AUTHOR1 = createLink({
    option: { className: styles.linkFooter, textContent: 'tabrisel' },
    handler: {},
  });
  LINK_AUTHOR1.setAttribute('href', 'https://github.com/Tabrisel');

  const LINK_AUTHOR3 = createLink({
    option: { className: styles.linkFooter, textContent: 'Karzhen' },
    handler: {},
  });
  LINK_AUTHOR3.setAttribute('href', 'https://github.com/Karzhen');
  WRAPPER_AUTHOR.append(LINK_AUTHOR1, LINK_AUTHOR2, LINK_AUTHOR3);

  const DIV_YEAR = createElement(Tag.DIV, {
    className: styles.year,
    textContent: '2024',
  });

  const LINK_RS = createLintWithIcon({
    option: {
      className: styles.linkRs,
    },
    handler: {
      handlerClick: () => {
        window.open('https://rs.school/courses/javascript-ru', '_blank');
      },
    },
    iconUrl: urlLogo,
  });
  FOOTER.append(WRAPPER_AUTHOR, DIV_YEAR, LINK_RS);
  return FOOTER;
}
