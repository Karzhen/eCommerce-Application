import createElement from '@utils/create-element';
import createButton from '@baseComponents/button/button';
import { Tag, ParametersBaseComponent } from '@/interface';

import stylesButtonWithIcon from './buttonWithIcon.module.css';

export default function createButtonWithIcon({
  option,
  handler: { handlerClick },
  iconUrl,
}: ParametersBaseComponent) {
  const OPTION = { ...option };
  OPTION.className = `${option.className} ${stylesButtonWithIcon.button}`;

  const BUTTON_WITH_ICON = createButton({
    option: OPTION,
    handler: { handlerClick },
  });

  const ICON = createElement(Tag.IMG, {
    className: stylesButtonWithIcon.icon,
  });
  if (iconUrl) ICON.setAttribute('src', iconUrl);

  BUTTON_WITH_ICON.append(ICON);

  return BUTTON_WITH_ICON;
}
