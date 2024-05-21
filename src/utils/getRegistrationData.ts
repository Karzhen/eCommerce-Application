interface AddressData {
  streetName: string;
  streetNumber: string;
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

function parseStreet(street: string): {
  streetName: string;
  streetNumber: string;
} {
  const parts = street.split(' ');
  return {
    streetName: parts.slice(0, -1).join(' '),
    streetNumber: parts.pop() as string,
  };
}

function getAddressData(prefix: string): AddressData {
  const street = getElementValueById(`${prefix}Street`);
  const { streetName, streetNumber } = parseStreet(street);
  const postalCode = getElementValueById(`${prefix}PostalCode`);
  const city = getElementValueById(`${prefix}City`);
  const country = getElementValueById(`${prefix}Country`);

  return {
    streetName,
    streetNumber,
    postalCode,
    city,
    country,
  };
}

export default function getRegistrationData(): CustomerData {
  const email = getElementValueById('email');
  const password = getElementValueById('password');
  const firstName = getElementValueById('name');
  const lastName = getElementValueById('lastname');
  const dateOfBirth = getElementValueById('dateBirth');

  const shippingAddress = getAddressData('shipping');
  const billingAddress = getAddressData('billing');

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
