import { createAndShowPopup } from '@/pages/registrationPage/registration/eventHandlers';
import {
  validateAddressForm,
  validatePersonalDataForm,
} from '@/pages/profilePage/validate-profile-form';
import { setUserFields } from '@/pages/profilePage/fillProfile';
import store from '@/redux/store/configureStore';
import apiUpdatePersonalData from '@/api/apiUpdatePersonalData';
import samePersonalData from './samePersonalData';

export default function toggleAllFields(
  container: HTMLElement,
  disable: boolean,
) {
  const inputs = container.querySelectorAll<HTMLInputElement>('input');
  inputs.forEach((input) => {
    const item = input;
    item.disabled = disable;
    item.readOnly = disable;
  });

  const selects = container.querySelectorAll<HTMLSelectElement>('select');
  selects.forEach((select) => {
    const item = select;
    item.disabled = disable;
  });
}

export function changeBox(id: string, container: HTMLElement) {
  const mainDataBox = container.querySelector(`#${id}`) as HTMLElement;
  if (!mainDataBox) {
    return;
  }

  const disabledInputs = mainDataBox.querySelectorAll('input:disabled');
  if (disabledInputs.length > 0) {
    mainDataBox.style.background = 'var(--color-lightest)';
  } else {
    mainDataBox.style.background = 'var(--color-primary-muted)';
  }
}

export function addInputEventListeners(element: HTMLElement) {
  const inputs = element.querySelectorAll('input');
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validatePersonalDataForm();
    });
  });

  const selects = element.querySelectorAll<HTMLSelectElement>('select');
  selects.forEach((select) => {
    select.addEventListener('change', () => {
      validateAddressForm();
    });
  });
}

export async function handlerClickPersonalEditMode(event: Event) {
  event.preventDefault();
  const button = event.target as HTMLButtonElement;
  const PROFILE_DATA = document.getElementById('profileData') as HTMLElement;
  const cancelButton = document.getElementById(
    'cancelProfile',
  ) as HTMLButtonElement;

  if (button) {
    if (button.textContent === 'Edit') {
      button.textContent = 'Save';
      cancelButton.removeAttribute('disabled');
      toggleAllFields(PROFILE_DATA, false);
      changeBox('mainDataBox', PROFILE_DATA);
    } else if (button.textContent === 'Save') {
      if (samePersonalData(PROFILE_DATA) === true) {
        toggleAllFields(PROFILE_DATA, true);
        button.textContent = 'Edit';
        changeBox('mainDataBox', PROFILE_DATA);
        cancelButton.setAttribute('disabled', 'true');
      } else if (validatePersonalDataForm()) {
        const firstName = (
          PROFILE_DATA.querySelector('#name') as HTMLInputElement
        )?.value;
        const lastName = (
          PROFILE_DATA.querySelector('#lastname') as HTMLInputElement
        )?.value;
        const email = (PROFILE_DATA.querySelector('#email') as HTMLInputElement)
          ?.value;
        const dateOfBirth = (
          PROFILE_DATA.querySelector('#dateBirth') as HTMLInputElement
        )?.value;

        await apiUpdatePersonalData(firstName, lastName, email, dateOfBirth);

        const { errorUpdate } = store.getState().login;
        if (errorUpdate) {
          createAndShowPopup(
            'Failure of the update operation',
            `Error: ${errorUpdate}`,
            false,
          );
        } else {
          createAndShowPopup(
            'Success of the update operation',
            'The data is valid. The user has been updated',
            true,
          );
        }

        button.textContent = 'Edit';
        toggleAllFields(PROFILE_DATA, true);
        changeBox('mainDataBox', PROFILE_DATA);
        cancelButton.setAttribute('disabled', 'true');
      } else {
        createAndShowPopup(
          'Failure of the update operation',
          'The data is invalid. User is not updated',
          false,
        );
      }
    }
  }
}

export function handlerClickCancelEditMode(event: Event) {
  event.preventDefault();
  const button = document.getElementById('editProfile') as HTMLButtonElement;
  button.textContent = 'Edit';
  const CANCEL = document.getElementById('cancelProfile') as HTMLButtonElement;
  const PROFILE_DATA = document.getElementById('profileData') as HTMLElement;
  const data = store.getState().login.user;
  CANCEL.setAttribute('disabled', 'true');
  toggleAllFields(PROFILE_DATA, true);
  changeBox('mainDataBox', PROFILE_DATA);
  if (data) {
    setUserFields(data, PROFILE_DATA);
    validatePersonalDataForm();
  }
}
