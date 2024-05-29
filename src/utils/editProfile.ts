import { createAndShowPopup } from '@/pages/registrationPage/registration/eventHandlers';
import validateProfileForm from '@/pages/profilePage/validate-profile-form';
import copyBillingToShipping from './registrationSameInputs';
import toggleShippingInputs from './toggleInputs';
import updatePostalCodePattern from './updatePostalCodePattern';

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

export function changeBox(id: string) {
  const mainDataBox = document.getElementById(id) as HTMLElement;
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
      validateProfileForm();
    });
  });

  const selects = element.querySelectorAll<HTMLSelectElement>('select');
  selects.forEach((select) => {
    select.addEventListener('change', () => {
      validateProfileForm();
    });
  });
}

export function handlerClickEditMode(event: Event) {
  event.preventDefault();
  updatePostalCodePattern('shipping');
  const button = event.target as HTMLButtonElement;
  const ADDRESS_BOX = document.getElementById('profileAddress') as HTMLElement;
  const PROFILE_DATA = document.getElementById('profileData') as HTMLElement;
  const sameAddress = localStorage.getItem('sameAddress');
  const wrapper = document.getElementById(
    'shipping-address-box',
  ) as HTMLElement;
  if (button) {
    if (button.textContent === 'Edit') {
      button.textContent = 'Save';
      toggleAllFields(PROFILE_DATA, false);
      toggleAllFields(ADDRESS_BOX, false);
      changeBox('mainDataBox');
      if (sameAddress === 'true') {
        toggleShippingInputs(wrapper, true);
        copyBillingToShipping();
      } else {
        toggleShippingInputs(wrapper, false);
      }
    } else if (button.textContent === 'Save') {
      if (validateProfileForm()) {
        createAndShowPopup(
          'Success of the update operation',
          'The data is valid. The user has been updated',
          true,
        );
        button.textContent = 'Edit';
        toggleAllFields(PROFILE_DATA, true);
        toggleAllFields(ADDRESS_BOX, true);
        changeBox('mainDataBox');
      } else {
        createAndShowPopup(
          'Failure of the update operation',
          'The data is invalid. The user has not been updated',
          false,
        );
      }
    }
  }
}
