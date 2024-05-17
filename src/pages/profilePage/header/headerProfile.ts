import { Tag, Page, TypeButton } from '@/interface';
import createElement from '@utils/create-element';
import iconMain from '@assets/images/home.png';
import createButtonWithIcon from '@/components/baseComponents/buttonWithIcon/buttonWithIcon';

import styles from './headerProfile.module.css';

function handlerMainClick(goPage: (page: Page) => void) {
  goPage(Page.MAIN);
}

export default function createHeader(goPage: (page: Page) => void) {
  const HEADER = createElement(Tag.HEADER, { className: styles.header });

  const BUTTON_MAIN = createButtonWithIcon({
    type: TypeButton.SECONDARY,
    option: { textContent: 'Main Page', className: styles.buttonMain },
    iconUrl: iconMain,
    handler: { handlerClick: () => handlerMainClick(goPage) },
  });

  HEADER.append(BUTTON_MAIN);

  return HEADER;
}
