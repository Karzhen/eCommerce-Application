import createElement from '@utils/create-element';
import createLink from '@baseComponents/link/link';
import { Tag, ParametersBaseComponent } from '@/interface';

import stylesLinkWithIcon from './linkWithIcon.module.css';

export default function createLinkWithIcon({
  option,
  handler: { handlerClick },
  iconUrl,
}: ParametersBaseComponent) {
  const OPTION = option;
  OPTION.className = `${option.className} ${stylesLinkWithIcon.link}`;

  const WRAPPER = createElement(Tag.DIV, {
    className: stylesLinkWithIcon.wrapper,
  });

  const ICON = createElement(Tag.IMG, {
    className: stylesLinkWithIcon.icon,
  });
  if (iconUrl) ICON.setAttribute('src', iconUrl);
  const LINK_WITH_ICON = createLink({ option: OPTION, handler: {} });

  WRAPPER.append(ICON, LINK_WITH_ICON);

  if (handlerClick) WRAPPER.addEventListener('click', handlerClick);

  return WRAPPER;
}
