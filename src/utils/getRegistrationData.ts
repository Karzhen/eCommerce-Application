interface AddressData {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: AddressData;
  billingAddress: AddressData;
}

function getElementValueById(id: string): string {
  const element: HTMLInputElement = document.getElementById(
    id,
  ) as HTMLInputElement;
  return element.value;
}

export function getAddressData(prefix: string): AddressData {
  const streetName = getElementValueById(`${prefix}Street`);
  const postalCode = getElementValueById(`${prefix}PostalCode`);
  const city = getElementValueById(`${prefix}City`);
  const country = getElementValueById(`${prefix}Country`);

  return {
    streetName,
    postalCode,
    city,
    country,
  };
}

function setAddressField(prefix: string, addressData: AddressData) {
  const streetInput = document.getElementById(
    `${prefix}Street`,
  ) as HTMLInputElement;
  if (streetInput) {
    streetInput.value = addressData.streetName.trim();
  }

  const postalCodeInput = document.getElementById(
    `${prefix}PostalCode`,
  ) as HTMLInputElement;
  if (postalCodeInput) {
    postalCodeInput.value = addressData.postalCode;
  }

  const cityInput = document.getElementById(
    `${prefix}City`,
  ) as HTMLInputElement;
  if (cityInput) {
    cityInput.value = addressData.city;
  }

  const countryInput = document.getElementById(
    `${prefix}Country`,
  ) as HTMLInputElement;
  if (countryInput) {
    countryInput.value = addressData.country;
  }
}

export default function getRegistrationData(): CustomerData {
  const email = getElementValueById('email');
  const password = getElementValueById('password');
  const firstName = getElementValueById('name');
  const lastName = getElementValueById('lastname');
  const dateOfBirth = getElementValueById('dateBirth');

  const shippingAddress = getAddressData('shipping');
  const billingAddress = getAddressData('billing');

  // Set values in corresponding fields
  setAddressField('shipping', shippingAddress);
  setAddressField('billing', billingAddress);

  const newCustomer: CustomerData = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    shippingAddress,
    billingAddress,
  };

  return newCustomer;
}
