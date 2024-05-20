import store from '@redux/store/configureStore';

import { Page } from '@/interface';

import loginUser from '@/utils/login';

import createCustomer from '@api/apiRegister';
import createPopUp from '@/components/popUp/popUp';
import getRegistrationData, {
  CustomerData,
} from '@utils/getRegistrationData.ts';

import validateRegistrForm from './validate-registr-form';

export function createAndShowPopup(title: string, message: string, success?: boolean) {
  const popup = createPopUp(title, message, success);
  document.body.append(popup);
  (popup as HTMLDialogElement).showModal();
}

export async function handlerSubmit(
  event: Event,
  goPage: (page: Page) => void,
) {
  event?.preventDefault();
  if (!validateRegistrForm()) {
    createAndShowPopup(
        'Authorisation Error',
        'One or more fields do not match the input data format. Refresh the page and try again',
        false
    );
  } else {
    const newCustomer: CustomerData = getRegistrationData();

    await createCustomer(newCustomer);
    if (store.getState().register.isRegister) {
      await loginUser(newCustomer.email, newCustomer.password);
      if (store.getState().login.isLogin) {
        goPage(Page.MAIN);
        const message = `User ${newCustomer.firstName} ${newCustomer.lastName} has been successfully registered`;
        createAndShowPopup('Registration was successful', message, true);
      } else {
        createAndShowPopup(
            'Registration Error',
            store.getState().login.value || 'Something went wrong',
            false,
        );
      }
    } else {
      createAndShowPopup(
          'Registration Error',
          store.getState().register.value || 'Something went wrong',
          false,
      );
    }
  }
}

export function handlerForm() {
  const SUBMIT = document.getElementById('submit');
  if (!SUBMIT) return;

  const isValid = validateRegistrForm();

  if (isValid) {
    SUBMIT.removeAttribute('disabled');
  } else {
    SUBMIT.setAttribute('disabled', 'disabled');
  }
}

export function handlerClickLogin(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.LOGIN);
}

export function handlerClickEye(event: Event) {
  const EL = event.target;
  if (EL instanceof HTMLElement) {
    const INPUT_PASSWORD = document.getElementById('password');
    if (INPUT_PASSWORD && INPUT_PASSWORD.getAttribute('type') === 'password') {
      INPUT_PASSWORD.setAttribute('type', 'text');
      EL.setAttribute('type', 'on');
    } else if (
      INPUT_PASSWORD &&
      INPUT_PASSWORD.getAttribute('type') === 'text'
    ) {
      INPUT_PASSWORD.setAttribute('type', 'password');
      EL.removeAttribute('type');
    }
  }
}

export function getPostalCodePattern(country: string): RegExp | null {
  switch (country) {
    case 'United States':
      return /^\d{5}$/;
    case 'Germany':
      return /^\d{5}$|^\d{2}[A-Za-z]\d{3}$/;
    case 'Russia':
      return /^\d{6}$/;
    default:
      return null;
  }
}

export function handlerCountry(event: Event, prefix: string) {
  if (event.target instanceof HTMLSelectElement) {
    const selectedCountry = event.target.value;
    const postalCodePattern = getPostalCodePattern(selectedCountry);

    const INPUT_POSTAL_CODE = document.getElementById(
      `${prefix}PostalCode`,
    ) as HTMLInputElement;
    if (postalCodePattern instanceof RegExp) {
      INPUT_POSTAL_CODE?.setAttribute('pattern', postalCodePattern.source);
    } else {
      INPUT_POSTAL_CODE?.removeAttribute('pattern');
    }
    handlerForm();
  }
}
