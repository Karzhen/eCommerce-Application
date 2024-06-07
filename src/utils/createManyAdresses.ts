import { AddressGet, Tag, TypeButton } from '@/interface';
import styles from '@/pages/profilePage/main/adresses/addresses.module.css';
import createButton from '@/components/baseComponents/button/button';
import apiDeleteAddress from '@/api/apiDeleteAddress';
import { createAndShowPopup } from '@/pages/registrationPage/registration/eventHandlers';
import apiUpdateAddress from '@/api/apiUpdateAddress';
import validateProfileForm, {
  attachInputHandlers,
  handleCountryChange,
  isProfileFormValid,
} from '@/pages/profilePage/validation';
import createElement from './create-element';
import toggleAllFields from './editProfile';
import removeContainer from './removeContainer';
import createModal, { updateAddressBox } from './createModal';
import checkDefaultShipping, {
  checkDefaultBilling,
} from './checkDefaultAddresses';
import clearDefaultAddresses from './clearDefaultLS';

export function disabledOtherBoxes(currentAddressId: string, disable: boolean) {
  const allEditButtons = document.querySelectorAll('[id^="editAddress_"]');

  allEditButtons.forEach((button) => {
    const editButton = button as HTMLButtonElement;
    const addressId = editButton.id.replace('editAddress_', '');

    if (addressId !== currentAddressId) {
      editButton.disabled = disable;
    }
  });
}

export async function handlerClickEditAddress(
  event: Event,
  addressBox: HTMLElement,
  addressId: string,
) {
  event.preventDefault();
  const button = event.target as HTMLButtonElement;

  const cancelButtonId = `cancelAddress_${addressBox.id.split('-').pop()}`;
  const cancelButton = document.getElementById(
    cancelButtonId,
  ) as HTMLButtonElement | null;

  if (button && cancelButton) {
    if (button.textContent === 'Edit') {
      disabledOtherBoxes(addressId, true);
      button.textContent = 'Save';
      const buttonId = button.id;
      const idSuffix = buttonId.split('_').pop();
      const checkboxes = document.querySelectorAll<HTMLInputElement>(
        `input[type="checkbox"][id$="${idSuffix}"]`,
      );
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked === true) {
          if (checkbox.id.includes('DefaultShipping')) {
            localStorage.setItem('defaultShipping', 'true');
          } else if (checkbox.id.includes('DefaultBilling')) {
            localStorage.setItem('defaultBilling', 'true');
          }
        }
      });
      cancelButton.removeAttribute('disabled');
      toggleAllFields(addressBox, false);
      attachInputHandlers(
        addressBox,
        () => validateProfileForm(addressId),
        () => handleCountryChange(addressId),
      );
    } else if (button.textContent === 'Save') {
      if (!isProfileFormValid(addressId)) {
        createAndShowPopup(
          'Error',
          'Data is invalid. Address not updated',
          false,
        );
        return;
      }
      try {
        await apiUpdateAddress(addressId);
        button.textContent = 'Edit';
        toggleAllFields(addressBox, true);
        cancelButton.setAttribute('disabled', 'true');
        createAndShowPopup('Success', 'Data successfully updated', true);
      } catch (error) {
        createAndShowPopup(
          'Failure of the update operation',
          'The data is invalid. Address is not updated',
          false,
        );
      } finally {
        updateAddressBox();
        clearDefaultAddresses();
      }
    }
  }
}

type PostalCodePatterns = {
  [key: string]: string;
};

const postalCodePatterns: PostalCodePatterns = {
  RU: '^\\d{6}$',
  US: '^\\d{5}$',
  DE: '^\\d{5}$|^\\d{2}[A-Za-z]\\d{3}$',
};

function createLabelError(id: string) {
  return createElement(Tag.LABEL, {
    id: `${id}_error`,
    className: styles.labelError,
    textContent: '',
  });
}

export function handlerClickCancelAddress(
  event: Event,
  addressBox: HTMLElement,
) {
  event.preventDefault();
  const button = event.target as HTMLButtonElement;
  const editButtonId = `editAddress_${addressBox.id.split('-').pop()}`;
  const editButton = document.getElementById(
    editButtonId,
  ) as HTMLButtonElement | null;

  if (button && editButton) {
    editButton.textContent = 'Edit';
    button.setAttribute('disabled', 'true');
    toggleAllFields(addressBox, true);
  }
  clearDefaultAddresses();
  updateAddressBox();
}

export async function handlerClickDeleteAddress(
  event: Event,
  addressId: string,
) {
  event.preventDefault();
  await apiDeleteAddress(addressId);
  removeContainer(addressId);
  clearDefaultAddresses();
}

export function handlerClickAddAddress(event: Event) {
  event.preventDefault();
  createModal();
}

function getPostalCodePattern(country: string): string {
  return postalCodePatterns[country] || '^\\d{6}$';
}

export function createAddressField(
  label: string,
  prefix: string,
  addressId: string,
  value: string | undefined,
  pattern: string,
  required: boolean = true,
  inputHandler?: (event: Event) => void,
) {
  const FIELD_WRAPPER = createElement(Tag.DIV, {});

  const LABEL_ELEMENT = createElement(Tag.LABEL, {
    textContent: label,
    id: `${prefix}-label-${addressId}`,
  });

  LABEL_ELEMENT.setAttribute('for', `${prefix}-${addressId}`);

  const INPUT_ELEMENT: HTMLInputElement = createElement(Tag.INPUT, {
    id: `${prefix}-${addressId}`,
    className: styles.input,
  }) as HTMLInputElement;

  INPUT_ELEMENT.value = value || '';

  if (required) INPUT_ELEMENT.setAttribute('required', 'required');

  INPUT_ELEMENT.setAttribute('pattern', pattern);

  if (inputHandler) INPUT_ELEMENT.addEventListener('input', inputHandler);

  FIELD_WRAPPER.append(LABEL_ELEMENT, INPUT_ELEMENT);

  const errorLabel = createLabelError(`${prefix}-${addressId}`);

  FIELD_WRAPPER.append(errorLabel);

  return FIELD_WRAPPER;
}

function createDefaultCheckbox(
  label: string,
  prefix: string,
  addressId: string,
  checked: boolean,
) {
  const FIELD_WRAPPER = createElement(Tag.DIV, {
    className: styles.fieldWrapper,
  });

  const LABEL_ELEMENT = createElement(Tag.LABEL, {
    textContent: label,
    id: `${prefix}-label-${addressId}`,
  });

  LABEL_ELEMENT.setAttribute('for', `${prefix}-${addressId}`);

  const CHECKBOX_ELEMENT: HTMLInputElement = createElement(Tag.INPUT, {
    id: `${prefix}-${addressId}`,
    className: styles.checkbox,
  }) as HTMLInputElement;

  if (label === 'Default Shipping') {
    CHECKBOX_ELEMENT.addEventListener('click', (event: Event) =>
      checkDefaultShipping(event),
    );
  }
  if (label === 'Default Billing') {
    CHECKBOX_ELEMENT.addEventListener('click', (event: Event) =>
      checkDefaultBilling(event),
    );
  }

  CHECKBOX_ELEMENT.setAttribute('type', 'checkbox');
  CHECKBOX_ELEMENT.checked = checked;

  FIELD_WRAPPER.append(LABEL_ELEMENT, CHECKBOX_ELEMENT);
  return FIELD_WRAPPER;
}

export function createCountrySelect(
  label: string,
  prefix: string,
  addressId: string,
  country: string,
  required: boolean = true,
  changeHandler?: (event: Event) => void,
) {
  const FIELD_WRAPPER = createElement(Tag.DIV, {
    className: styles.fieldWrapper,
  });

  const LABEL_ELEMENT = createElement(Tag.LABEL, {
    textContent: label,
    id: `${prefix}-label-${addressId}`,
  });

  LABEL_ELEMENT.setAttribute('for', `${prefix}-${addressId}`);

  const SELECT_ELEMENT: HTMLSelectElement = createElement(Tag.SELECT, {
    id: `${prefix}-${addressId}`,
    className: styles.select,
  }) as HTMLSelectElement;

  if (required) SELECT_ELEMENT.setAttribute('required', 'required');
  if (changeHandler) SELECT_ELEMENT.addEventListener('change', changeHandler);

  ['RU', 'US', 'DE'].forEach((item) => {
    const OPTION_ELEMENT = createElement(Tag.OPTION, {});
    OPTION_ELEMENT.setAttribute('value', item);
    OPTION_ELEMENT.textContent = item;

    if (item === country) {
      OPTION_ELEMENT.setAttribute('selected', 'selected');
    }
    SELECT_ELEMENT.append(OPTION_ELEMENT);
  });

  FIELD_WRAPPER.append(LABEL_ELEMENT, SELECT_ELEMENT);
  return FIELD_WRAPPER;
}

export function createAddresses(
  title: string,
  prefix: string,
  address: AddressGet,
  isShipping: boolean,
  isDefaultShipping: boolean,
  isDefaultBilling: boolean,
) {
  const TITLE_BOX = createElement(Tag.DIV, {});
  const TITLE = createElement(Tag.H2, {
    className: isShipping ? styles.shippingTitle : styles.billingTitle,
    id: `${prefix}Title-${address.id}`,
    textContent: title,
  });

  TITLE_BOX.append(TITLE);

  const ADDRESS_WRAPPER = createElement(Tag.DIV, {
    id: `${prefix}-address-box-${address.id}`,
    className: `${styles.address}`,
  });

  const EDIT_BUTTON_ADDRESS = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: `editAddress_${address.id}`,
      className: `${styles.edit}`,
      textContent: 'Edit',
    },
    handler: {
      handlerClick: (event: Event) => {
        handlerClickEditAddress(event, ADDRESS_WRAPPER, address.id);
      },
    },
  });

  const DELETE_BUTTON_ADDRESS = createButton({
    type: TypeButton.SECONDARY,
    option: {
      id: `deleteAddress_${address.id}`,
      className: `${styles.delete}`,
      textContent: 'Delete',
    },
    handler: {
      handlerClick: (event: Event) =>
        handlerClickDeleteAddress(event, address.id),
    },
  });

  const CANCEL_BUTTON_ADDRESS = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: `cancelAddress_${address.id}`,
      className: `${styles.cancel}`,
      textContent: 'Cancel',
    },
    handler: {
      handlerClick: (event: Event) =>
        handlerClickCancelAddress(event, ADDRESS_WRAPPER),
    },
  });

  CANCEL_BUTTON_ADDRESS.setAttribute('disabled', 'true');

  const BUTTONS_ADDRESS = createElement(Tag.DIV, {
    className: `${styles.profileButtons}`,
    id: `${prefix}Buttons-${address.id}`,
  });

  BUTTONS_ADDRESS.append(
    EDIT_BUTTON_ADDRESS,
    CANCEL_BUTTON_ADDRESS,
    DELETE_BUTTON_ADDRESS,
  );
  ADDRESS_WRAPPER.append(BUTTONS_ADDRESS);

  ADDRESS_WRAPPER.append(
    TITLE_BOX,
    createAddressField(
      'Street',
      `${prefix}Street`,
      address.id,
      address.streetName,
      '^[a-zA-Z0-9 ,\\.]*$',
    ),
    createLabelError(`${prefix}Street-${address.id}`),
    createAddressField(
      'City',
      `${prefix}City`,
      address.id,
      address.city,
      `^[a-zA-Z]+$`,
    ),
    createLabelError(`${prefix}City-${address.id}`),
    createAddressField(
      'Postal Code',
      `${prefix}PostalCode`,
      address.id,
      address.postalCode,
      getPostalCodePattern(address.country as string),
    ),
    createLabelError(`${prefix}PostalCode-${address.id}`),
    createCountrySelect(
      'Country',
      `${prefix}Country`,
      address.id,
      address.country || '',
      true,
    ),
    createLabelError(`${prefix}Country-${address.id}`),
    createDefaultCheckbox(
      'Default Shipping',
      `${prefix}DefaultShipping`,
      address.id,
      isDefaultShipping,
    ),
    createDefaultCheckbox(
      'Default Billing',
      `${prefix}DefaultBilling`,
      address.id,
      isDefaultBilling,
    ),
  );

  return ADDRESS_WRAPPER;
}

export default function createManyAddressBox(
  arrayAddresses: AddressGet[],
  billingAddressIds: string[],
  shippingAddressIds: string[],
  defaultShippingAddressId: string,
  defaultBillingAddressId: string,
) {
  const ADDRESS_DATA = createElement(Tag.DIV, {
    className: `${styles.addressData}`,
    id: 'profileAddresses',
  });

  arrayAddresses.forEach((address: AddressGet) => {
    let addressTitle = 'Address';
    let prefix = 'address';

    const isBilling = billingAddressIds.includes(address.id);
    const isShipping = shippingAddressIds.includes(address.id);
    const isDefaultShipping = address.id === defaultShippingAddressId;
    const isDefaultBilling = address.id === defaultBillingAddressId;

    if (isBilling && isShipping) {
      addressTitle = 'Billing and Shipping Address';
      prefix = 'billingAndShipping';
    } else if (isBilling) {
      addressTitle = 'Billing Address';
      prefix = 'billing';
    } else if (isShipping) {
      addressTitle = 'Shipping Address';
      prefix = 'shipping';
    }

    const ADDRESS_BOX = createAddresses(
      addressTitle,
      prefix,
      address,
      isShipping,
      isDefaultShipping,
      isDefaultBilling,
    );

    ADDRESS_DATA.append(ADDRESS_BOX);
  });

  return ADDRESS_DATA;
}
