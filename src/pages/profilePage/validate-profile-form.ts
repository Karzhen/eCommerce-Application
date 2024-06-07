import validateDateOfBirth from '@/utils/validateDateOfBirth';
import {
  generateErrorMessagePassword,
  generateErrorMessageEmail as validateEmail,
} from '@/utils/validateEmailAndPassword';
import validateName from '@/utils/validateName';
import validatePostalCode from '@/utils/validatePostalCode';
import validateStreet from '@/utils/validateStreet';

function getPersonalInputs(): HTMLInputElement[] {
  const inputEmail = document.getElementById('email') as HTMLInputElement;
  const inputName = document.getElementById('name') as HTMLInputElement;
  const inputLastname = document.getElementById('lastname') as HTMLInputElement;
  const inputDateBirth = document.getElementById(
    'dateBirth',
  ) as HTMLInputElement;

  return [inputEmail, inputName, inputLastname, inputDateBirth];
}

function getAddressInputs(): HTMLInputElement[] {
  const inputBillingStreet = document.getElementById(
    'billingStreet',
  ) as HTMLInputElement;
  const inputBillingCity = document.getElementById(
    'billingCity',
  ) as HTMLInputElement;
  const inputBillingPostalCode = document.getElementById(
    'billingPostalCode',
  ) as HTMLInputElement;

  const sameAddressChecked = localStorage.getItem('sameAddress') === 'true';
  const inputs = [inputBillingStreet, inputBillingCity, inputBillingPostalCode];

  if (!sameAddressChecked) {
    const inputShippingStreet = document.getElementById(
      'shippingStreet',
    ) as HTMLInputElement;
    const inputShippingCity = document.getElementById(
      'shippingCity',
    ) as HTMLInputElement;
    const inputShippingPostalCode = document.getElementById(
      'shippingPostalCode',
    ) as HTMLInputElement;
    inputs.push(
      inputShippingStreet,
      inputShippingCity,
      inputShippingPostalCode,
    );
  }

  return inputs;
}

export function validatePersonalData(inputs: HTMLInputElement[]): string[] {
  const errors = [
    validateEmail(inputs[0]),
    validateName(inputs[1]),
    validateName(inputs[2]),
    validateDateOfBirth(inputs[3]),
  ];

  return errors;
}

export function validateAddress(inputs: HTMLInputElement[]): string[] {
  const errors = [
    validateStreet(inputs[0]),
    validateName(inputs[1]),
    validatePostalCode(inputs[2]),
  ];

  if (inputs.length > 3) {
    errors.push(
      validateStreet(inputs[3]),
      validateName(inputs[4]),
      validatePostalCode(inputs[5]),
    );
  }

  return errors;
}

export function validatePersonalDataForm(): boolean {
  const personalInputs = getPersonalInputs();
  const personalErrors = validatePersonalData(personalInputs);
  const personalLabels = [
    'emailError',
    'nameError',
    'lastnameError',
    'dateBirthError',
  ];
  personalLabels.forEach((label, index) => {
    const errorLabel = document.getElementById(label);
    if (errorLabel) {
      errorLabel.textContent = personalErrors[index];
    }
  });

  return personalInputs.every((input) => input.checkValidity());
}

export function validateAddressForm(): boolean {
  const addressInputs = getAddressInputs();
  const addressErrors = validateAddress(addressInputs);

  const addressLabels = [
    'billingStreetError',
    'billingCityError',
    'billingPostalCodeError',
    'shippingStreetError',
    'shippingCityError',
    'shippingPostalCodeError',
  ];
  addressLabels.forEach((label, index) => {
    const errorLabel = document.getElementById(label);
    if (errorLabel) {
      errorLabel.textContent = addressErrors[index];
    }
  });

  return addressInputs.every((input) => input.checkValidity());
}

export function validatePasswordForm(): boolean {
  const currentPasswordField = document.getElementById(
    'currentPassword',
  ) as HTMLInputElement;
  const newPasswordField = document.getElementById(
    'newPassword',
  ) as HTMLInputElement;

  const currentPasswordErrorLabel = document.getElementById(
    'currentPasswordError',
  );
  const newPasswordErrorLabel = document.getElementById('newPasswordError');

  const currentPasswordErrorMessage =
    generateErrorMessagePassword(currentPasswordField);
  const newPasswordErrorMessage =
    generateErrorMessagePassword(newPasswordField);

  if (currentPasswordErrorLabel) {
    currentPasswordErrorLabel.textContent = currentPasswordErrorMessage;
  }

  if (newPasswordErrorLabel) {
    newPasswordErrorLabel.textContent = newPasswordErrorMessage;
  }

  return (
    currentPasswordField.checkValidity() && newPasswordField.checkValidity()
  );
}
