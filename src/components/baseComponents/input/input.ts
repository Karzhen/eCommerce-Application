import { Tag, TypeInput, ParametersBaseComponent } from '@/interface';
import createElement from '@utils/create-element';

import styles from './input.module.css';

export default function createInput({
  type,
  option,
  handler: { handlerClick, handlerInput },
}: ParametersBaseComponent) {
  const OPTION = option;
  switch (type) {
    case TypeInput.PASS:
    case TypeInput.TEXT:
      OPTION.className = `${option.className} ${styles.input}`;
      break;
    case TypeInput.SUBMIT:
      OPTION.className = `${option.className} ${styles.button}`;
      break;
    case TypeInput.CHECKBOX:
      OPTION.className = `${option.className} ${styles.checkbox}`;
      break;
    default:
  }

  const INPUT = createElement(Tag.INPUT, OPTION);
  if (type) INPUT.setAttribute('type', type);

  if (handlerClick) INPUT.addEventListener('click', handlerClick);
  if (handlerInput) INPUT.addEventListener('input', handlerInput);

  return INPUT;
}
