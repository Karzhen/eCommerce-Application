function validateEmail(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  }
  if (input.validity.patternMismatch) {
    if (!/[a-z]+\.([a-z]{2,4})$/.test(input.value)) {
      errorMessage +=
        'Email address must contain a domain name (e.g., example.com). ';
    }
    if (!/^[a-zA-Z0-9_\\-]+@[a-z]+\.([a-z]{2,4})/.test(input.value)) {
      errorMessage +=
        'Email address must be properly formatted (e.g., user@example.com). ';
    }
    if (!/^.*@.*$/.test(input.value)) {
      errorMessage +=
        'Email address must contain an @ symbol separating local part and domain name. ';
    }
    if (/^\s|\s$/.test(input.value)) {
      errorMessage +=
        'Email address must not contain leading or trailing whitespace. ';
    }
  }

  return errorMessage;
}

function validatePassword(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  }

  if (input.validity.tooShort) {
    const minLength = input.getAttribute('minlength');
    errorMessage += `Minimum input length: ${minLength} characters. `;
  }

  if (input.validity.patternMismatch) {
    if (!/(?=.*[A-Z])/.test(input.value)) {
      errorMessage +=
        'Password must contain at least one uppercase letter (A-Z). ';
    }
    if (!/(?=.*[a-z])/.test(input.value)) {
      errorMessage +=
        'Password must contain at least one lowercase letter (a-z). ';
    }
    if (!/(?=.*\d)/.test(input.value)) {
      errorMessage += 'Password must contain at least one digit (0-9). ';
    }
    if (/^\s|\s$/.test(input.value)) {
      errorMessage +=
        'Password must not contain leading or trailing whitespace. ';
    }
  }

  return errorMessage;
}

function validateName(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  } else if (
    input.value.trim().length > 0 &&
    !/^[A-Za-z]+$/.test(input.value)
  ) {
    errorMessage +=
      'Must contain at least one character(english) and no special characters or numbers.';
  }

  return errorMessage;
}

function validateDateOfBirth(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  } else {
    const currentDate = new Date();
    const minDate = new Date(
      currentDate.getFullYear() - 100,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const maxDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    const inputDate = new Date(input.value);

    if (
      Number.isNaN(inputDate.getTime()) ||
      inputDate < minDate ||
      inputDate > maxDate
    ) {
      errorMessage += 'Invalid date of birth or age below 18. ';
    }
  }

  return errorMessage;
}

function validateStreet(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  } else if (!/[A-Za-z]/.test(input.value)) {
    errorMessage += 'Must contain at least one English alphabet character. ';
  }

  return errorMessage;
}

function validatePostalCode(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  }

  if (input.validity.patternMismatch) {
    errorMessage += 'Must follow the format for the country';
  }

  return errorMessage;
}

function getAllInputs(): HTMLInputElement[] {
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

  return [
    inputEmail,
    inputPassword,
    inputName,
    inputLastname,
    inputDateBirth,
    inputBillingStreet,
    inputBillingCity,
    inputBillingPostalCode,
  ];
}

export default function validateRegistrForm(): boolean {
  const inputs = getAllInputs();
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

  const allInputsValid = inputs.every((input) => input.checkValidity());

  labels.forEach((label, index) => {
    const errorLabel = document.getElementById(label);
    if (errorLabel) {
      errorLabel.textContent = errors[index];
    }
  });

  return allInputsValid;
}
