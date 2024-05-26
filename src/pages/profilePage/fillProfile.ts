import { removeStylesToContainer } from '@/utils/checkSameAddress';
import getCountryName from '@/utils/getCountryName';
import copyBillingToShipping from '@/utils/registrationSameInputs';
import store from '@redux/store/configureStore';

export default function fillProfileFields() {
  try {
    const data = store.getState().login.user;

    if (data !== null) {
      const inputName = document.getElementById(
        'profileName',
      ) as HTMLInputElement;
      const inputLastName = document.getElementById(
        'profileLastName',
      ) as HTMLInputElement;
      const inputDateBirth = document.getElementById(
        'dateBirth',
      ) as HTMLInputElement;
      const shippingCheck = document.getElementById(
        'shippingCheck',
      ) as HTMLInputElement;
      const billingCheck = document.getElementById(
        'billingCheck',
      ) as HTMLInputElement;
      const sameAddressCheckbox = document.getElementById(
        'sameAddressCheck',
      ) as HTMLInputElement;

      inputName.value = data?.firstName || '';
      inputLastName.value = data?.lastName || '';
      inputDateBirth.value = data?.dateOfBirth || '';

      const { addresses, defaultShippingAddressId, defaultBillingAddressId } =
        data;

      const setBillingCheckbox = () => {
        if (defaultBillingAddressId) {
          billingCheck.checked = true;
        } else {
          billingCheck.checked = false;
        }
      };

      const setShippingCheckbox = () => {
        if (defaultShippingAddressId) {
          shippingCheck.checked = true;
        } else {
          shippingCheck.checked = false;
        }
      };

      setBillingCheckbox();
      setShippingCheckbox();

      const addressCount = addresses.length;

      if (addressCount > 0) {
        const address = addresses[0];
        const inputStreet = document.getElementById(
          'billingStreet',
        ) as HTMLInputElement;
        const inputCity = document.getElementById(
          'billingCity',
        ) as HTMLInputElement;
        const inputPostalCode = document.getElementById(
          'billingPostalCode',
        ) as HTMLInputElement;
        const selectedCountry = document.getElementById(
          'billingCountry',
        ) as HTMLSelectElement;
        const wrapper = document.getElementById(
          'shipping-address-box',
        ) as HTMLElement;

        inputStreet.value =
          `${address?.streetName} ${address?.streetNumber}` ?? '';
        inputCity.value = address?.city ?? '';
        inputPostalCode.value = address?.postalCode ?? '';
        selectedCountry.value = getCountryName(address?.country) ?? '';

        if (addressCount === 1) {
          sameAddressCheckbox.checked = true;
          copyBillingToShipping();
        } else {
          sameAddressCheckbox.checked = false;
          removeStylesToContainer(wrapper);
        }

        if (addressCount > 1) {
          const secondAddress = addresses[1];
          const inputStreetShipping = document.getElementById(
            'shippingStreet',
          ) as HTMLInputElement;
          const inputCityShipping = document.getElementById(
            'shippingCity',
          ) as HTMLInputElement;
          const inputPostalCodeShipping = document.getElementById(
            'shippingPostalCode',
          ) as HTMLInputElement;
          const selectedCountryShipping = document.getElementById(
            'shippingCountry',
          ) as HTMLSelectElement;

          inputStreetShipping.value =
            `${secondAddress?.streetName} ${secondAddress?.streetNumber}` ?? '';
          inputCityShipping.value = secondAddress?.city ?? '';
          inputPostalCodeShipping.value = secondAddress?.postalCode ?? '';
          selectedCountryShipping.value =
            getCountryName(secondAddress?.country) ?? '';
        }
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
