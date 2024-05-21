import createElement from '@utils/create-element';
import createLink from '@baseComponents/link/link';
import { Tag, ParametersBaseComponent } from '@/interface';

import stylesLinkWithIcon from './linkWithIcon.module.css';

export default function createLinkWithIcon({
  option,
  handler: { handlerClick },
  iconUrl,
}: ParametersBaseComponent) {
  const WRAPPER = createElement(Tag.DIV, {
    className: stylesLinkWithIcon.wrapper,
  });

  const ICON = createElement(Tag.IMG, {
    className: `${option.className} ${stylesLinkWithIcon.icon}`,
  });
  if (iconUrl) ICON.setAttribute('src', iconUrl);
  const LINK_WITH_ICON = createLink({
    option: { textContent: option.textContent },
    handler: {},
  });

  WRAPPER.append(ICON, LINK_WITH_ICON);

  if (handlerClick) WRAPPER.addEventListener('click', handlerClick);

  return WRAPPER;
}
