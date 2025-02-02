import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';
import { Tag, ParametersBaseComponent } from '@/interface';

import stylesInputWithIcon from './inputWithIcon.module.css';

export default function createInputWithIcon({
  type,
  option,
  handler: { handlerInput, handlerClickIcon, handlerKeyClick },
  iconUrl,
}: ParametersBaseComponent) {
  const OPTION = { ...option };
  OPTION.className = `${option.className} ${stylesInputWithIcon.option}`;

  const WRAPPER = createElement(Tag.DIV, {
    className: `${option.className} ${stylesInputWithIcon.wrapper}`,
  });

  const ICON = createElement(Tag.IMG, {
    className: `${option.className} ${stylesInputWithIcon.icon}`,
  });

  if (iconUrl) ICON.setAttribute('src', iconUrl);
  if (handlerClickIcon) ICON.addEventListener('click', handlerClickIcon);

  const INPUT_WITH_ICON = createInput({
    type,
    option: OPTION,
    handler: { handlerInput, handlerKeyClick },
  });

  WRAPPER.append(INPUT_WITH_ICON, ICON);

  return WRAPPER;
}
