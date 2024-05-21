import { Tag, Page } from '@/interface';
import createElement from '@utils/create-element';
import createLinkWithIcon from '@/components/baseComponents/linkWithIcon/linkWithIcon';
import iconLogo from '@assets/images/logo.png';
import styles from './headerLogin.module.css';

function handlerMainClick(goPage: (page: Page) => void) {
  goPage(Page.MAIN);
}

export default function createHeader(goPage: (page: Page) => void) {
  const HEADER = createElement(Tag.HEADER, { className: styles.header });

  const LINK_LOGO = createLinkWithIcon({
    option: { className: styles.logo },
    iconUrl: iconLogo,
    handler: { handlerClick: () => handlerMainClick(goPage) },
  });

  HEADER.append(LINK_LOGO);

  return HEADER;
}
