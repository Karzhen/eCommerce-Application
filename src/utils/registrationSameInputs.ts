export default function copyBillingToShipping() {
  const SHIPPING_INPUT_STREET: HTMLInputElement = document.getElementById(
    'shippingStreet',
  ) as HTMLInputElement;
  const BILLING_INPUT_STREET: HTMLInputElement = document.getElementById(
    'billingStreet',
  ) as HTMLInputElement;
  if (SHIPPING_INPUT_STREET && BILLING_INPUT_STREET) {
    SHIPPING_INPUT_STREET.value = BILLING_INPUT_STREET.value;
  }
  const SHIPPING_INPUT_CITY: HTMLInputElement = document.getElementById(
    'shippingCity',
  ) as HTMLInputElement;
  const BILLING_INPUT_CITY: HTMLInputElement = document.getElementById(
    'billingCity',
  ) as HTMLInputElement;
  if (SHIPPING_INPUT_CITY && BILLING_INPUT_CITY) {
    SHIPPING_INPUT_CITY.value = BILLING_INPUT_CITY.value;
  }
  const SHIPPING_INPUT_POSTAL_CODE: HTMLInputElement = document.getElementById(
    'shippingPostalCode',
  ) as HTMLInputElement;
  const BILLING_INPUT_POSTAL_CODE: HTMLInputElement = document.getElementById(
    'billingPostalCode',
  ) as HTMLInputElement;
  if (SHIPPING_INPUT_POSTAL_CODE && BILLING_INPUT_POSTAL_CODE) {
    SHIPPING_INPUT_POSTAL_CODE.value = BILLING_INPUT_POSTAL_CODE.value;
  }
  const SHIPPING_INPUT_COUNTRY: HTMLInputElement = document.getElementById(
    'shippingCountry',
  ) as HTMLInputElement;
  const BILLING_INPUT_COUNTRY: HTMLInputElement = document.getElementById(
    'billingCountry',
  ) as HTMLInputElement;
  if (SHIPPING_INPUT_COUNTRY && BILLING_INPUT_COUNTRY) {
    SHIPPING_INPUT_COUNTRY.value = BILLING_INPUT_COUNTRY.value;
  }
}
