function generateErrorMessageEmail(element: HTMLInputElement) {
  let errorMessage = '';

  if (element.validity.valueMissing) {
    errorMessage += 'Required field. ';
  }
  if (element.validity.patternMismatch) {
    if (!/[a-z]+\.([a-z]{2,4})$/.test(element.value)) {
      errorMessage +=
        'Email address must contain a domain name (e.g., example.com). ';
    }
    if (!/^[a-zA-Z0-9_\\-]+@[a-z]+\.([a-z]{2,4})/.test(element.value)) {
      errorMessage +=
        'Email address must be properly formatted (e.g., user@example.com). ';
    }
    if (!/^.*@.*$/.test(element.value)) {
      errorMessage +=
        'Email address must contain an @ symbol separating local part and domain name. ';
    }
    if (/^\s|\s$/.test(element.value)) {
      errorMessage +=
        'Email address must not contain leading or trailing whitespace. ';
    }
  }

  return errorMessage;
}

function generateErrorMessagePassword(element: HTMLInputElement) {
  let errorMessage = '';

  if (element.validity.valueMissing) {
    errorMessage += 'Required field. ';
  }

  if (element.validity.tooShort) {
    const MIN_CHAR_INPUT = element.getAttribute('minlength');
    errorMessage += `Minimum input length: ${MIN_CHAR_INPUT} characters. `;
  }

  if (element.validity.patternMismatch) {
    if (!/(?=.*[A-Z])/.test(element.value)) {
      errorMessage +=
        'Password must contain at least one uppercase letter (A-Z). ';
    }
    if (!/(?=.*[a-z])/.test(element.value)) {
      errorMessage +=
        'Password must contain at least one lowercase letter (a-z). ';
    }
    if (!/(?=.*\d)/.test(element.value)) {
      errorMessage += 'Password must contain at least one digit (0-9). ';
    }
    if (/^\s|\s$/.test(element.value)) {
      errorMessage +=
        'Password must not contain leading or trailing whitespace. ';
    }
  }

  return errorMessage;
}

export default function validateLoginForm(): boolean {
  const labelMessageErrorEmail = document.getElementById('emailError');

  const labelMessageErrorPassword = document.getElementById('passwordError');

  const INPUT_EMAIL = document.getElementById('email') as HTMLInputElement;
  const INPUT_PASSWORD = document.getElementById(
    'password',
  ) as HTMLInputElement;

  if (labelMessageErrorEmail && labelMessageErrorPassword) {
    labelMessageErrorEmail.textContent = generateErrorMessageEmail(INPUT_EMAIL);
    labelMessageErrorPassword.textContent =
      generateErrorMessagePassword(INPUT_PASSWORD);
  }

  return INPUT_EMAIL.checkValidity() && INPUT_PASSWORD.checkValidity();
}
