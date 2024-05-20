import { getPostalCodePattern } from '@/pages/registrationPage/registration/eventHandlers';

export default function updatePostalCodePattern(prefix: string) {
  const countrySelect = document.getElementById(
    `${prefix}Country`,
  ) as HTMLSelectElement;
  const selectedCountry = countrySelect.value;
  const postalCodePattern = getPostalCodePattern(selectedCountry);

  const INPUT_POSTAL_CODE = document.getElementById(
    `${prefix}PostalCode`,
  ) as HTMLInputElement;
  if (postalCodePattern instanceof RegExp) {
    INPUT_POSTAL_CODE?.setAttribute('pattern', postalCodePattern.source);
  } else {
    INPUT_POSTAL_CODE?.removeAttribute('pattern');
  }
}
