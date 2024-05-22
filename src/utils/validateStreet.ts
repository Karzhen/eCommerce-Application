export default function validateStreet(input: HTMLInputElement): string {
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage += 'Required field. ';
  } else if (!/^[a-zA-Z0-9 ,\\.]*$/.test(input.value)) {
    errorMessage +=
      'One or more characters from the English alphabet, special characters(comma, dot, spase) or numbers';
  }

  return errorMessage;
}
