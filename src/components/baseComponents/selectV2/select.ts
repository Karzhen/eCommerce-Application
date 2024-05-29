import { Tag, ParametersBaseComponent } from '@/interface';
import createElement from '@utils/create-element';

import urlDropdown from '@assets/images/dropdown.png';

import styles from './select.module.css';

function handleWithoutDropdownClick(event: Event, WRAPPER: HTMLElement) {
  const element = event.target;
  const DROPDOWN_MENU = WRAPPER.querySelector(
    `.${styles.dropdownMenu}`,
  ) as HTMLElement;
  const SELECT = WRAPPER.querySelector(`.${styles.select}`) as HTMLElement;

  if (
    element instanceof HTMLElement &&
    !WRAPPER.contains(element) &&
    !SELECT.contains(element) &&
    !DROPDOWN_MENU.contains(element)
  ) {
    if (DROPDOWN_MENU && DROPDOWN_MENU.getAttribute('open')) {
      DROPDOWN_MENU.removeAttribute('open');
    }
  }
}

export default function createSelect(
  { option }: ParametersBaseComponent,
  children: { label: string; key: string }[],
) {
  const WRAPPER = createElement(Tag.DIV, {
    id: option?.id,
    className: `${styles.wrapper} ${option.className}`,
  });

  const SELECT = createElement(Tag.DIV, {
    className: styles.select,
    textContent: 'Choose',
  });

  const IMG = createElement(Tag.IMG, {
    className: styles.img,
  });
  IMG.setAttribute('src', urlDropdown);
  SELECT.append(IMG);

  const DROPDOWN_MENU = createElement(Tag.DIV, {
    className: styles.dropdownMenu,
  });

  const FIRST_ITEM = createElement(Tag.DIV, {
    className: styles.item,
    textContent: 'Choose',
  });
  FIRST_ITEM.setAttribute('value', '');
  DROPDOWN_MENU.append(FIRST_ITEM);
  children.forEach((child) => {
    const ITEM = createElement(Tag.DIV, {
      className: styles.item,
      textContent: child.label,
    });
    ITEM.setAttribute('value', child.key);
    DROPDOWN_MENU.append(ITEM);
  });

  DROPDOWN_MENU.addEventListener('click', (event: Event) => {
    const element = event.target as HTMLElement;
    if (element) {
      SELECT.textContent = element.textContent;
      SELECT.setAttribute('value', String(element.getAttribute('value')));
      DROPDOWN_MENU.removeAttribute('open');
    }
  });

  SELECT.addEventListener('click', () => {
    if (DROPDOWN_MENU.getAttribute('open') === 'true') {
      DROPDOWN_MENU.removeAttribute('open');
    } else {
      DROPDOWN_MENU.setAttribute('open', 'true');
    }
  });

  WRAPPER.append(SELECT, DROPDOWN_MENU);

  document.body.addEventListener('click', (event: Event) =>
    handleWithoutDropdownClick(event, WRAPPER),
  );

  return WRAPPER;
}
