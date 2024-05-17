import { Tag, TypeInput } from '@/interface';
import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';
import createSelect from '@baseComponents/select/select';
import checkDefaultShipping, {
  checkDefaultBilling,
} from '@/utils/checkDefaultAddresses';
import styles from './registrationPage.module.css';
import { handlerClickEye, handlerCountry, handlerForm } from './eventHandlers';

export function createEmailField() {
  const EMAIL_FIELD = createElement(Tag.DIV, {
    className: styles.emailField,
  });

  const LABEL_EMAIL = createElement(Tag.LABEL, {
    className: styles.emailLabel,
    textContent: 'Email',
  });

  const INPUT_EMAIL = createInput({
    type: TypeInput.TEXT,
    option: { id: 'email', className: styles.email },
    handler: { handlerInput: handlerForm },
  });
  INPUT_EMAIL.setAttribute('required', 'required');
  INPUT_EMAIL.setAttribute('autocomplete', 'username');
  INPUT_EMAIL.setAttribute('pattern', '^[a-zA-Z0-9_\\-]+@[a-z]+\\.[a-z]{2,4}$');

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'emailError',
    className: styles.emailError,
  });

  EMAIL_FIELD.append(LABEL_EMAIL, INPUT_EMAIL, LABEL_ERROR);

  return EMAIL_FIELD;
}

export function createNameField() {
  const NAME_FIELD = createElement(Tag.DIV, {
    className: styles.nameField,
  });

  const LABEL_NAME = createElement(Tag.LABEL, {
    className: styles.nameLabel,
    textContent: 'Name',
  });

  const INPUT_NAME = createInput({
    type: TypeInput.TEXT,
    option: { id: 'name', className: styles.name },
    handler: { handlerInput: handlerForm },
  });
  INPUT_NAME.setAttribute('required', 'required');
  INPUT_NAME.setAttribute('pattern', '^[a-zA-Z]+$');

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'nameError',
    className: styles.nameError,
  });

  NAME_FIELD.append(LABEL_NAME, INPUT_NAME, LABEL_ERROR);

  return NAME_FIELD;
}

export function createLastNameField() {
  const LASTNAME_FIELD = createElement(Tag.DIV, {
    className: styles.lastnameField,
  });

  const LABEL_LASTNAME = createElement(Tag.LABEL, {
    className: styles.lastnameLabel,
    textContent: 'Last name',
  });

  const INPUT_LASTNAME = createInput({
    type: TypeInput.TEXT,
    option: { id: 'lastname', className: styles.lastname },
    handler: { handlerInput: handlerForm },
  });
  INPUT_LASTNAME.setAttribute('required', 'required');
  INPUT_LASTNAME.setAttribute('pattern', '^[a-zA-Z]+$');

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'lastnameError',
    className: styles.lastnameError,
  });

  LASTNAME_FIELD.append(LABEL_LASTNAME, INPUT_LASTNAME, LABEL_ERROR);

  return LASTNAME_FIELD;
}

export function createDateBirthField() {
  const DATE_BIRTH_FIELD = createElement(Tag.DIV, {
    className: styles.dateBirthField,
  });

  const LABEL_DATE_BIRTH = createElement(Tag.LABEL, {
    className: styles.dateBirthLabel,
    textContent: 'Date of birth',
  });

  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  const minDate = today.toISOString().split('T')[0];

  const currentTime = new Date();
  currentTime.setFullYear(currentTime.getFullYear() - 100);
  const maxDate = currentTime.toISOString().split('T')[0];

  const INPUT_DATE_BIRTH = createInput({
    type: TypeInput.DATE,
    option: { id: 'dateBirth', className: styles.dateBirth },
    handler: { handlerInput: handlerForm },
  });

  INPUT_DATE_BIRTH.setAttribute('required', 'required');
  INPUT_DATE_BIRTH.setAttribute('max', minDate);
  INPUT_DATE_BIRTH.setAttribute('min', maxDate);

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'dateBirthError',
    className: styles.lastnameError,
  });

  DATE_BIRTH_FIELD.append(LABEL_DATE_BIRTH, INPUT_DATE_BIRTH, LABEL_ERROR);

  return DATE_BIRTH_FIELD;
}

export function createPasswordField() {
  const PASSWORD_FIELD = createElement(Tag.DIV, {
    className: styles.passwordField,
  });

  const LABEL_PASSWORD = createElement(Tag.LABEL, {
    className: styles.passwordLabel,
    textContent: 'Password',
  });

  const WRAPPER_PASSWORD = createElement(Tag.DIV, {
    className: styles.wrapperPassword,
  });

  const INPUT_PASSWORD = createInput({
    type: TypeInput.PASS,
    option: { id: 'password', className: styles.password },
    handler: { handlerInput: handlerForm },
  });
  INPUT_PASSWORD.setAttribute('required', 'required');
  INPUT_PASSWORD.setAttribute('minlength', '8');
  INPUT_PASSWORD.setAttribute('autocomplete', 'current-password');
  INPUT_PASSWORD.setAttribute(
    'pattern',
    '^(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}(?<!\\s)$',
  );

  const IMG_EYE = createElement(Tag.DIV, {
    id: 'eye',
    className: styles.eye,
  });
  IMG_EYE.addEventListener('click', handlerClickEye);

  WRAPPER_PASSWORD.append(INPUT_PASSWORD, IMG_EYE);

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'passwordError',
    className: styles.passwordError,
  });
  PASSWORD_FIELD.append(LABEL_PASSWORD, WRAPPER_PASSWORD, LABEL_ERROR);

  return PASSWORD_FIELD;
}

export function createStreetField() {
  const STREET_FIELD = createElement(Tag.DIV, {
    className: styles.streetField,
  });

  const LABEL_STREET = createElement(Tag.LABEL, {
    className: styles.streetLabel,
    textContent: 'Street',
  });

  const INPUT_STREET = createInput({
    type: TypeInput.TEXT,
    option: { id: 'street', className: styles.street },
    handler: { handlerInput: handlerForm },
  });
  INPUT_STREET.setAttribute('required', 'required');
  INPUT_STREET.setAttribute('pattern', '^[a-zA-Z0-9 ,]+$');

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'streetError',
    className: styles.streetError,
  });

  STREET_FIELD.append(LABEL_STREET, INPUT_STREET, LABEL_ERROR);

  return STREET_FIELD;
}

export function createCityField() {
  const CITY_FIELD = createElement(Tag.DIV, {
    className: styles.cityField,
  });

  const LABEL_CITY = createElement(Tag.LABEL, {
    className: styles.cityLabel,
    textContent: 'City',
  });

  const INPUT_CITY = createInput({
    type: TypeInput.TEXT,
    option: { id: 'city', className: styles.city },
    handler: { handlerInput: handlerForm },
  });
  INPUT_CITY.setAttribute('required', 'required');
  INPUT_CITY.setAttribute('pattern', '^[a-zA-Z]+$');

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'cityError',
    className: styles.cityError,
  });

  CITY_FIELD.append(LABEL_CITY, INPUT_CITY, LABEL_ERROR);

  return CITY_FIELD;
}

export function createPostalCodeField() {
  const POSTAL_CODE_FIELD = createElement(Tag.DIV, {
    className: styles.postalCodeField,
  });

  const LABEL_POSTAL_CODE = createElement(Tag.LABEL, {
    className: styles.postalCodeLabel,
    textContent: 'Postal Code',
  });

  const INPUT_POSTAL_CODE = createInput({
    type: TypeInput.TEXT,
    option: { id: 'postalCode', className: styles.postalCode },
    handler: { handlerInput: handlerForm },
  });
  INPUT_POSTAL_CODE.setAttribute('required', 'required');
  INPUT_POSTAL_CODE.setAttribute('pattern', '\\d{6}');

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'postalCodeError',
    className: styles.postalCodeError,
  });

  POSTAL_CODE_FIELD.append(LABEL_POSTAL_CODE, INPUT_POSTAL_CODE, LABEL_ERROR);
  return POSTAL_CODE_FIELD;
}

export function createCountryField() {
  const COUNTRY_FIELD = createElement(Tag.DIV, {
    className: styles.countryField,
  });

  const LABEL_COUNTRY = createElement(Tag.LABEL, {
    className: styles.countryLabel,
    textContent: 'Select country',
  });

  const SELECT_COUNTRY = createSelect({
    option: { id: 'country', className: styles.country },
    handler: {
      handlerChange: (event) => {
        handlerCountry(event);
        handlerForm();
      },
    },
  });

  const countries = ['Russia', 'United States', 'Germany'];

  countries.forEach((country) => {
    const OPTION = document.createElement('option');
    OPTION.value = country;
    OPTION.textContent = country;
    SELECT_COUNTRY.appendChild(OPTION);
  });

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'countryError',
    className: styles.countryError,
  });

  COUNTRY_FIELD.append(LABEL_COUNTRY, SELECT_COUNTRY, LABEL_ERROR);

  return COUNTRY_FIELD;
}

export function createShippingCheckbox() {
  const CHECKBOX_WRAPPER = createElement(Tag.DIV, {
    className: styles.checkboxWrapper,
  });

  const TITLE_CHECKBOX = createElement(Tag.H3, {
    className: styles.titleCheckbox,
    textContent: 'Default Shipping',
  });

  const SHIPPING_CHECKBOX = createInput({
    type: TypeInput.CHECKBOX,
    option: { id: 'shippingCheck', className: styles.checkbox },
    handler: { handlerInput: checkDefaultShipping },
  });

  CHECKBOX_WRAPPER.append(TITLE_CHECKBOX, SHIPPING_CHECKBOX);

  return CHECKBOX_WRAPPER;
}

export function createBillingCheckbox() {
  const CHECKBOX_WRAPPER = createElement(Tag.DIV, {
    className: styles.checkboxWrapper,
  });

  const TITLE_CHECKBOX = createElement(Tag.H3, {
    className: styles.titleCheckbox,
    textContent: 'Default Billing',
  });

  const SHIPPING_CHECKBOX = createInput({
    type: TypeInput.CHECKBOX,
    option: { id: 'billingCheck', className: styles.checkbox },
    handler: { handlerInput: checkDefaultBilling },
  });

  CHECKBOX_WRAPPER.append(TITLE_CHECKBOX, SHIPPING_CHECKBOX);

  return CHECKBOX_WRAPPER;
}
