import createElement from '@utils/create-element';
import { Tag, ParametersBaseComponent } from '@/interface';

import styles from './link.module.css';

export default function createLink({
  option,
  handler: { handlerClick },
}: ParametersBaseComponent) {
  const OPTION = option;
  OPTION.className = `${option.className} ${styles.link}`;

  const LINK = createElement(Tag.LINK, OPTION);

  if (handlerClick) LINK.addEventListener('click', handlerClick);

  return LINK;
}
