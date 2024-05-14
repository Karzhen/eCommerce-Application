import { Page } from '@/interface';
import { REGISTER } from '@/redux/actions/register';
import { LOGIN } from '@/redux/actions/login';
import store from '@/redux/store/configureStore';
import { createCustomer } from '@api/apiConnections';
import getRegistrationData, {
  CustomerData,
} from '@utils/getRegistrationData.ts';
import styles from './eventHandlers.module.css';
import validateRegistrForm from './validate-registr-form';

function showPopup(name: string, secondName: string, requestCode?: number) {
  const successMessage = `User ${name} ${secondName} has been successfully registered`;
  const errorMessage = `User ${name} ${secondName} registration is not complete\n${requestCode}`;

  const popup = document.createElement('div');
  popup.className = styles.popup;
  popup.textContent = requestCode === 201 ? successMessage : errorMessage;

  const okButton = document.createElement('button');
  okButton.className = styles.button;
  okButton.textContent = 'ОК';
  okButton.onclick = () => {
    popup.remove();
  };

  popup.appendChild(okButton);
  document.body.appendChild(popup);

  document.addEventListener('keydown', () => {
    popup.remove();
  });
}

export async function handlerSubmit(
  event: Event,
  goPage: (page: Page) => void,
) {
  event?.preventDefault();
  const newCustomer: CustomerData = getRegistrationData();

  await createCustomer(newCustomer)
    .then((response) => {
      if (response.statusCode === 201) {
        store.dispatch(REGISTER({ value: 'token', isRegister: true }));
        store.dispatch(LOGIN({ value: 'token', isLogin: true }));
        goPage(Page.MAIN);
        showPopup(
          newCustomer.firstName,
          newCustomer.lastName,
          response.statusCode,
        );
      }
    })
    .catch((error) =>
      showPopup(newCustomer.firstName, newCustomer.lastName, error),
    );
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

export function handlerCountry(event: Event) {
  if (event.target instanceof HTMLSelectElement) {
    const selectedCountry = event.target.value;
    const postalCodePattern = getPostalCodePattern(selectedCountry);

    const INPUT_POSTAL_CODE = document.getElementById(
      'postalCode',
    ) as HTMLInputElement;
    if (postalCodePattern instanceof RegExp) {
      INPUT_POSTAL_CODE?.setAttribute('pattern', postalCodePattern.source);
    } else {
      INPUT_POSTAL_CODE?.removeAttribute('pattern');
    }
    handlerForm();
  }
}
