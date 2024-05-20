export default function validateDateOfBirth(input: HTMLInputElement): string {
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
