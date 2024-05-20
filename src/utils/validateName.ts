export default function validateName(input: HTMLInputElement): string {
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
