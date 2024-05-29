import validateDateOfBirth from '@/utils/validateDateOfBirth';
import { generateErrorMessageEmail as validateEmail } from '@/utils/validateEmailAndPassword';
import validateName from '@/utils/validateName';
import validatePostalCode from '@/utils/validatePostalCode';
import validateStreet from '@/utils/validateStreet';

function getAllInputsProfile(sameAddressChecked: boolean): HTMLInputElement[] {
  const inputEmail = document.getElementById('email') as HTMLInputElement;
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

export default function validateProfileForm(): boolean {
  const sameAddressChecked = localStorage.getItem('sameAddress') === 'true';
  const inputs = getAllInputsProfile(sameAddressChecked);

  const labels = [
    'emailError',
    'nameError',
    'lastnameError',
    'dateBirthError',
    'billingStreetError',
    'billingCityError',
    'billingPostalCodeError',
  ];

  const errors = [
    validateEmail(inputs[0]),
    validateName(inputs[1]),
    validateName(inputs[2]),
    validateDateOfBirth(inputs[3]),
    validateStreet(inputs[4]),
    validateName(inputs[5]),
    validatePostalCode(inputs[6]),
  ];

  if (!sameAddressChecked) {
    labels.push(
      'shippingStreetError',
      'shippingCityError',
      'shippingPostalCodeError',
    );
    errors.push(
      validateStreet(inputs[7]),
      validateName(inputs[8]),
      validatePostalCode(inputs[9]),
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
