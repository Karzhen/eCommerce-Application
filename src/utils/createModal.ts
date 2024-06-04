import createElement from '@utils/create-element';
import { Tag, TypeButton } from '@/interface';

import styles from '@components/popUp/popUp.module.css';
import createButton from '@/components/baseComponents/button/button';
import { createAddressBox } from '@/pages/registrationPage/registration/registrationPage';
import sendAddress from '@/api/apiAddAddress';

export function closeModal(modalElement: HTMLElement) {
  modalElement.remove();
  localStorage.removeItem('sameAddress');
  localStorage.removeItem('defaultBilling');
  localStorage.removeItem('defaultShipping');
}

function handleClick(modalElement: HTMLElement) {
  sendAddress();
  closeModal(modalElement);
}

export default function createModal() {
  const MODAL = createElement(Tag.DIV, {
    className: styles.modalBackdrop,
  });

  const MODAL_CONTENT = createElement(Tag.DIV, {
    className: styles.modalContent,
  });

  const ADD_ADDRESS_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: 'submit',
      className: styles.addAddressButton,
      textContent: 'Add address',
    },
    handler: { handlerClick: () => handleClick(MODAL) },
  });

  ADD_ADDRESS_BUTTON.setAttribute('disabled', 'true');

  MODAL_CONTENT.append(createAddressBox('profilePage'), ADD_ADDRESS_BUTTON);
  MODAL.append(MODAL_CONTENT);

  MODAL.addEventListener('click', (event) => {
    if (event.target === MODAL) {
      closeModal(MODAL);
    }
  });

  document.body.append(MODAL);
}
