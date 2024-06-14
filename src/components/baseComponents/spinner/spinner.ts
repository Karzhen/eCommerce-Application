import createElement from '@utils/create-element';
import { Tag, ParametersBaseComponent } from '@/interface';

import styles from './spinner.module.css';

export default function createSpinner({ option }: ParametersBaseComponent) {
  const SPINNER = createElement(Tag.DIV, {
    className: `${option.className} ${styles.spinner}`,
    id: 'spinner',
  });

  return SPINNER;
}
