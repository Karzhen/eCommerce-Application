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
  address: AddressData;
}

function getElementValueById(id: string): string {
  const element: HTMLInputElement = document.getElementById(
    id,
  ) as HTMLInputElement;
  return element.value;
}

export default function getRegistrationData() {
  const email: string = getElementValueById('email');
  const password: string = getElementValueById('password');
  const firstName: string = getElementValueById('name');
  const lastName: string = getElementValueById('lastname');
  const dateOfBirth: string = getElementValueById('dateBirth');
  const country: string = getElementValueById('country');
  const city: string = getElementValueById('city');
  const street: string = getElementValueById('street');
  const postalCode: string = getElementValueById('postalCode');

  const newCustomer: CustomerData = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    address: {
      streetName: street.split(' ').slice(0, -1).join(' ') as string,
      streetNumber: street.split(' ').pop() as string,
      postalCode,
      city,
      country,
    },
  };

  return newCustomer;
}
