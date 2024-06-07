import validateName from '@/utils/validateName';
import validatePostalCode from '@/utils/validatePostalCode';
import validateStreet from '@/utils/validateStreet';
import { addressFormValidationHandler } from '@/utils/editProfile';

function getPostalCodePattern(country: string): string | null {
  switch (country) {
    case 'US':
      return '^\\d{5}$';
    case 'DE':
      return '^\\d{5}$|^\\d{2}[A-Za-z]\\d{3}$';
    case 'RU':
      return '^\\d{6}$';
    default:
      return '^\\d{6}$';
  }
}

export default function validateProfileForm(addressId: string): void {
  const inputStreetName = document.querySelector(
    `input[id$="Street-${addressId}"]`,
  ) as HTMLInputElement;
  const inputStreetCity = document.querySelector(
    `input[id$="City-${addressId}"]`,
  ) as HTMLInputElement;
  const inputPostalCode = document.querySelector(
    `input[id$="PostalCode-${addressId}"]`,
  ) as HTMLInputElement;

  const errorLabelStreet = document.querySelector(
    `label[id$="Street-${addressId}_error"]`,
  );
  const errorLabelCity = document.querySelector(
    `label[id$="City-${addressId}_error"]`,
  );
  const errorLabelPostalCode = document.querySelector(
    `label[id$="PostalCode-${addressId}_error"]`,
  );

  const errors = [
    validateStreet(inputStreetName),
    validateName(inputStreetCity),
    validatePostalCode(inputPostalCode),
  ];

  if (errorLabelStreet && errorLabelCity && errorLabelPostalCode) {
    [
      errorLabelStreet.textContent,
      errorLabelCity.textContent,
      errorLabelPostalCode.textContent,
    ] = errors;
  }
}

export function handleCountryChange(addressId: string) {
  const selectElement = document.querySelector(
    `select[id*="Country-${addressId}"]`,
  ) as HTMLSelectElement | null;
  if (selectElement) {
    const country = selectElement.value;

    const postalCodeInput = document.querySelector(
      `input[id$="PostalCode-${addressId}"]`,
    ) as HTMLInputElement | null;
    const pattern = getPostalCodePattern(country);

    if (postalCodeInput && pattern) {
      postalCodeInput.setAttribute('pattern', pattern);
    }
    validateProfileForm(addressId);
  }
}

export function attachInputHandlers(
  parentElement: HTMLElement,
  inputHandler: (event: Event) => void,
  changeHandler: (event: Event) => void,
) {
  const inputElements =
    parentElement.querySelectorAll<HTMLInputElement>('input');
  inputElements.forEach((input) => {
    input.addEventListener('input', inputHandler);
  });
  const selectElement =
    parentElement.querySelector<HTMLSelectElement>('select');
  if (selectElement) {
    selectElement.removeEventListener('change', addressFormValidationHandler); // Удаляем существующий обработчик
    selectElement.addEventListener('change', changeHandler); // Добавляем новый обработчик
  }
}

export function isProfileFormValid(addressId: string): boolean {
  validateProfileForm(addressId);

  const errorLabelStreet = document.querySelector(
    `label[id$="Street-${addressId}_error"]`,
  ) as HTMLLabelElement;
  const errorLabelCity = document.querySelector(
    `label[id$="City-${addressId}_error"]`,
  ) as HTMLLabelElement;
  const errorLabelPostalCode = document.querySelector(
    `label[id$="PostalCode-${addressId}_error"]`,
  ) as HTMLLabelElement;

  const hasErrors =
    errorLabelStreet.textContent ||
    errorLabelCity.textContent ||
    errorLabelPostalCode.textContent;

  return !hasErrors;
}
