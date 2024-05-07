import createElement from '@utils/create-element';
import { Tag, TypeButton, ParametersBaseComponent } from '@/interface';

import styles from './button.module.css';
import stylesPrimary from './buttonPrimary.module.css';
import stylesSecondary from './buttonSecondary.module.css';
import stylesTransparent from './buttonTransparent.module.css';

export default function createButton({
  type,
  option,
  handler: { handlerClick },
}: ParametersBaseComponent) {
  const OPTION = option;
  switch (type) {
    case TypeButton.PRIMARY:
      OPTION.className = `${option.className} ${styles.button} ${stylesPrimary.button}`;
      break;
    case TypeButton.SECONDARY:
      OPTION.className = `${option.className} ${styles.button} ${stylesSecondary.button}`;
      break;
    case TypeButton.TRANSPARENT:
      OPTION.className = `${option.className} ${styles.button} ${stylesTransparent.button}`;
      break;
    default:
      OPTION.className = `${option.className} ${styles.button} ${stylesPrimary.button}`;
  }

  const BUTTON = createElement(Tag.BUTTON, OPTION);

  if (handlerClick) BUTTON.addEventListener('click', handlerClick);

  return BUTTON;
}
