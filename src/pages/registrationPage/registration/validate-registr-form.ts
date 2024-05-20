import validateDateOfBirth from '@/utils/validateDateOfBirth';
import {
  generateErrorMessageEmail as validateEmail,
  generateErrorMessagePassword as validatePassword,
} from '@/utils/validateEmailAndPassword';
import validateName from '@/utils/validateName';
import validatePostalCode from '@/utils/validatePostalCode';
import validateStreet from '@/utils/validateStreet';

function getAllInputs(sameAddressChecked: boolean): HTMLInputElement[] {
  const inputEmail = document.getElementById('email') as HTMLInputElement;
  const inputPassword = document.getElementById('password') as HTMLInputElement;
  const inputName = document.getElementById('name') as HTMLInputElement;
  const inputLastname = document.getElementById('lastname') as HTMLInputElement;
  const inputDateBirth = document.getElementById(
    'dateBirth',
  ) as HTMLInputElement;
  const inputBillingStreet = document.getElementById(
    'billingStreet',
  ) as HTMLInputElement;
  const inputBillingCity = document.getElementById(
    'billingCity',
  ) as HTMLInputElement;
  const inputBillingPostalCode = document.getElementById(
    'billingPostalCode',
  ) as HTMLInputElement;

  const inputs = [
    inputEmail,
    inputPassword,
    inputName,
    inputLastname,
    inputDateBirth,
    inputBillingStreet,
    inputBillingCity,
    inputBillingPostalCode,
  ];

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

export default function validateRegistrForm(): boolean {
  const sameAddressChecked = localStorage.getItem('sameAddress') === 'true';
  const inputs = getAllInputs(sameAddressChecked);
  const labels = [
    'emailError',
    'passwordError',
    'nameError',
    'lastnameError',
    'dateBirthError',
    'billingStreetError',
    'billingCityError',
    'billingPostalCodeError',
  ];

  if (!sameAddressChecked) {
    labels.push(
      'shippingStreetError',
      'shippingCityError',
      'shippingPostalCodeError',
    );
  }

  const errors = [
    validateEmail(inputs[0]),
    validatePassword(inputs[1]),
    validateName(inputs[2]),
    validateName(inputs[3]),
    validateDateOfBirth(inputs[4]),
    validateStreet(inputs[5]),
    validateName(inputs[6]),
    validatePostalCode(inputs[7]),
  ];

  if (!sameAddressChecked) {
    errors.push(
      validateStreet(inputs[8]),
      validateName(inputs[9]),
      validatePostalCode(inputs[10]),
    );
  }

  const allInputsValid = inputs.every((input) => input.checkValidity());

  labels.forEach((label, index) => {
    const errorLabel = document.getElementById(label);
    if (errorLabel) {
      errorLabel.textContent = errors[index];
    }
  });

  return allInputsValid;
}
