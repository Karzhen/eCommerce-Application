export default function validatePostalCode(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  }

  if (input.validity.patternMismatch) {
    errorMessage += 'Must follow the format for the country';
  }

  return errorMessage;
}
