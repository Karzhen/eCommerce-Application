import { AddressData, Customer } from '@/interface';
import { removeStylesToContainer } from '@/utils/checkSameAddress';
import getCountryName from '@/utils/getCountryName';
import copyBillingToShipping from '@/utils/registrationSameInputs';
import store from '@redux/store/configureStore';

export function setUserFields(data: Customer, element: HTMLElement) {
  const inputName = element.querySelector('#name') as HTMLInputElement;
  const inputLastName = element.querySelector('#lastname') as HTMLInputElement;
  const inputDateBirth = element.querySelector(
    '#dateBirth',
  ) as HTMLInputElement;
  const inputEmail = element.querySelector('#email') as HTMLInputElement;

  inputName.value = data?.firstName || '';
  inputLastName.value = data?.lastName || '';
  inputDateBirth.value = data?.dateOfBirth || '';
  inputEmail.value = data?.email || '';
}

function setAddressFields(address: AddressData, element: HTMLElement) {
  const billingStreetInput = element.querySelector(
    '#billingStreet',
  ) as HTMLInputElement;
  const billingCityInput = element.querySelector(
    '#billingCity',
  ) as HTMLInputElement;
  const billingPostalCodeInput = element.querySelector(
    '#billingPostalCode',
  ) as HTMLInputElement;
  const billingCountrySelect = element.querySelector(
    '#billingCountry',
  ) as HTMLSelectElement;

  const shippingStreetInput = element.querySelector(
    '#shippingStreet',
  ) as HTMLInputElement;
  const shippingCityInput = element.querySelector(
    '#shippingCity',
  ) as HTMLInputElement;
  const shippingPostalCodeInput = element.querySelector(
    '#shippingPostalCode',
  ) as HTMLInputElement;
  const shippingCountrySelect = element.querySelector(
    '#shippingCountry',
  ) as HTMLSelectElement;

  billingStreetInput.value =
    `${address?.streetName} ${address?.streetNumber}` ?? '';
  billingCityInput.value = address?.city ?? '';
  billingPostalCodeInput.value = address?.postalCode ?? '';
  billingCountrySelect.value = getCountryName(address?.country) ?? '';

  shippingStreetInput.value =
    `${address?.streetName} ${address?.streetNumber}` ?? '';
  shippingCityInput.value = address?.city ?? '';
  shippingPostalCodeInput.value = address?.postalCode ?? '';
  shippingCountrySelect.value = getCountryName(address?.country) ?? '';
}

export default function fillProfileFields(element: HTMLElement) {
  try {
    const data = store.getState().login.user;

    if (data !== null) {
      setUserFields(data, element);

      const { addresses, defaultShippingAddressId, defaultBillingAddressId } =
        data;

      const shippingCheck = element.querySelector(
        '#shippingCheck',
      ) as HTMLInputElement;
      const billingCheck = element.querySelector(
        '#billingCheck',
      ) as HTMLInputElement;

      billingCheck.checked = !!defaultBillingAddressId;
      shippingCheck.checked = !!defaultShippingAddressId;

      const addressCount = addresses.length;

      if (addressCount === 0) {
        const sameAddressCheckbox = element.querySelector(
          '#sameAddressCheck',
        ) as HTMLInputElement;
        sameAddressCheckbox.checked = true;
        localStorage.setItem('sameAddress', 'true');
      }

      if (addressCount > 0) {
        const address = addresses[0];
        setAddressFields(address, element);

        const wrapper = element.querySelector(
          '#shipping-address-box',
        ) as HTMLElement;
        const sameAddressCheckbox = element.querySelector(
          '#sameAddressCheck',
        ) as HTMLInputElement;

        if (addressCount === 1) {
          sameAddressCheckbox.checked = true;
          localStorage.setItem('sameAddress', 'true');
        } else {
          sameAddressCheckbox.checked = false;
          removeStylesToContainer(wrapper);
        }

        if (addressCount > 1) {
          const secondAddress = addresses[1];
          const inputStreetShipping = element.querySelector(
            '#shippingStreet',
          ) as HTMLInputElement;
          const inputCityShipping = element.querySelector(
            '#shippingCity',
          ) as HTMLInputElement;
          const inputPostalCodeShipping = element.querySelector(
            '#shippingPostalCode',
          ) as HTMLInputElement;
          const selectedCountryShipping = element.querySelector(
            '#shippingCountry',
          ) as HTMLSelectElement;

          inputStreetShipping.value =
            `${secondAddress?.streetName} ${secondAddress?.streetNumber}` ?? '';
          inputCityShipping.value = secondAddress?.city ?? '';
          inputPostalCodeShipping.value = secondAddress?.postalCode ?? '';
          selectedCountryShipping.value =
            getCountryName(secondAddress?.country) ?? '';
        }
      }

      copyBillingToShipping();
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
