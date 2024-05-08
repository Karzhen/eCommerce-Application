import { Tag, ParametersBaseComponent } from '@/interface';
import createElement from '@utils/create-element';

import styles from './select.module.css';

export default function createSelect({
  option,
  handler: { handlerChange },
}: ParametersBaseComponent) {
  const OPTION = option;
  OPTION.className = `${option.className} ${styles.input}`;

  const SELECT = createElement(Tag.SELECT, OPTION);

  if (handlerChange) SELECT.addEventListener('change', handlerChange);

  return SELECT;
}
