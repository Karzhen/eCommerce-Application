export default function validateRegistrForm(): boolean {
  const INPUT_EMAIL = document.getElementById('email') as HTMLInputElement;
  const INPUT_PASSWORD = document.getElementById(
    'password',
  ) as HTMLInputElement;
  const INPUT_NAME = document.getElementById('name') as HTMLInputElement;
  const INPUT_LASTNAME = document.getElementById(
    'lastname',
  ) as HTMLInputElement;
  const INPUT_DATE_BIRTH = document.getElementById(
    'dateBirth',
  ) as HTMLInputElement;
  const INPUT_STREET = document.getElementById('street') as HTMLInputElement;
  const INPUT_CITY = document.getElementById('city') as HTMLInputElement;
  const INPUT_POSTAL_CODE = document.getElementById(
    'postalCode',
  ) as HTMLInputElement;

  return (
    INPUT_EMAIL.checkValidity() &&
    INPUT_PASSWORD.checkValidity() &&
    INPUT_NAME.checkValidity() &&
    INPUT_LASTNAME.checkValidity() &&
    INPUT_DATE_BIRTH.checkValidity() &&
    INPUT_STREET.checkValidity() &&
    INPUT_CITY.checkValidity() &&
    INPUT_POSTAL_CODE.checkValidity()
  );
}
