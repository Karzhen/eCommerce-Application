import {
  generateErrorMessageEmail,
  generateErrorMessagePassword,
} from '@/utils/validateEmailAndPassword';

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
