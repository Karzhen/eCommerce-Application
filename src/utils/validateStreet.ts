export default function validateStreet(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  } else if (!/[A-Za-z]/.test(input.value)) {
    errorMessage += 'Must contain at least one English alphabet character. ';
  }

  return errorMessage;
}
