import { AddressData } from '@/interface';

export default function getAddressDataById(addressId: string): AddressData {
  let idEndsWith = `Street-${addressId}`;
  const streetNameElement = document.querySelector(`[id$="${idEndsWith}"]`);
  idEndsWith = `City-${addressId}`;
  const cityElement = document.querySelector(`[id$="${idEndsWith}"]`);
  idEndsWith = `PostalCode-${addressId}`;
  const postalCodeElement = document.querySelector(`[id$="${idEndsWith}"]`);
  idEndsWith = `Country-${addressId}`;
  const countryElement = document.querySelector(`[id$="${idEndsWith}"]`);

  const streetName = streetNameElement
    ? (streetNameElement as HTMLInputElement).value
    : '';
  const postalCode = postalCodeElement
    ? (postalCodeElement as HTMLInputElement).value
    : '';
  const city = cityElement ? (cityElement as HTMLInputElement).value : '';
  const country = countryElement
    ? (countryElement as HTMLInputElement).value
    : '';

  return { streetName, postalCode, city, country };
}
