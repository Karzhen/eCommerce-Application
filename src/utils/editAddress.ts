import { createAndShowPopup } from '@/pages/registrationPage/registration/eventHandlers';
import apiDeleteAddress from '@/api/apiDeleteAddress';
import toggleAllFields, { changeBox } from './editProfile';
import createModal from './createModal';
import removeContainer from './removeContainer';

export function handlerClickEditAddress(event: Event, addressBox: HTMLElement) {
  event.preventDefault();
  const button = event.target as HTMLButtonElement;
  const cancelButtonId = `cancelAddress_${addressBox.id.split('-').pop()}`;
  const cancelButton = document.getElementById(
    cancelButtonId,
  ) as HTMLButtonElement | null;

  if (button && cancelButton) {
    if (button.textContent === 'Edit') {
      button.textContent = 'Save';
      cancelButton.removeAttribute('disabled');
      changeBox(addressBox.id, addressBox);
      toggleAllFields(addressBox, false);
    } else if (button.textContent === 'Save') {
      button.textContent = 'Edit';
      toggleAllFields(addressBox, true);
      cancelButton.setAttribute('disabled', 'true');
    } else {
      createAndShowPopup(
        'Failure of the update operation',
        'The data is invalid. Address is not updated',
        false,
      );
    }
  }
}

export function handlerClickCancelAddress(
  event: Event,
  addressBox: HTMLElement,
) {
  event.preventDefault();
  const button = event.target as HTMLButtonElement;
  const editButtonId = `editAddress_${addressBox.id.split('-').pop()}`; // Generate edit button ID
  const editButton = document.getElementById(
    editButtonId,
  ) as HTMLButtonElement | null;

  if (button && editButton) {
    editButton.textContent = 'Edit';
    button.setAttribute('disabled', 'true');
    toggleAllFields(addressBox, true);
  }
}

export async function handlerClickDeleteAddress(
  event: Event,
  addressId: string,
) {
  event.preventDefault();
  await apiDeleteAddress(addressId);
  removeContainer(addressId);
}

export function handlerClickAddAddress(event: Event) {
  event.preventDefault();
  createModal();
}
