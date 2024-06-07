export default function validateName(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  } else if (
    input.value.trim().length > 0 &&
    !/^[a-zA-Z]+$/.test(input.value)
  ) {
    errorMessage +=
      'One or more characters from the English alphabet (no special characters or numbers)';
  }

  return errorMessage;
}
