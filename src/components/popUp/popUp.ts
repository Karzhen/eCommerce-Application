import createElement from '@utils/create-element';
import { Tag, TypeButton } from '@/interface';

import styles from '@components/popUp/popUp.module.css';
import createButton from '../baseComponents/button/button';

export default function createPopUp(title: string, message: string) {
  const POPUP = createElement(Tag.DIALOG, {
    className: styles.modal,
    id: 'modal',
  });

  const TITLE = createElement(Tag.H2, {
    className: styles.title,
    textContent: title,
  });

  const MESSAGE = createElement(Tag.LABEL, {
    className: styles.message,
    textContent: message,
  });

  const BUTTON_CLOSE = createButton({
    type: TypeButton.SECONDARY,
    option: {
      className: styles.buttonClose,
      textContent: 'Close',
    },
    handler: { handlerClick: () => POPUP.remove() },
  });

  POPUP.append(TITLE, MESSAGE, BUTTON_CLOSE);

  POPUP.addEventListener('keydown', (event: Event) => {
    if (event instanceof KeyboardEvent && event.code === 'Escape') {
      event.stopPropagation();
      POPUP.remove();
    }
  });

  return POPUP;
}
