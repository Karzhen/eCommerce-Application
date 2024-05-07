export default function validateForm(): boolean {
  const INPUT_EMAIL = document.getElementById('email') as HTMLInputElement;
  const INPUT_PASSWORD = document.getElementById(
    'password',
  ) as HTMLInputElement;

  return INPUT_EMAIL.checkValidity() && INPUT_PASSWORD.checkValidity();
}
