import { Page, Tag, TypeButton, TypeInput } from '@/interface';
import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';
import clearDefaultAddresses from '@/utils/clearDefaultLS';
import styles from './registrationPage.module.css';
import {
  createBillingCheckbox,
  createCityField,
  createCountryField,
  createDateBirthField,
  createEmailField,
  createLastNameField,
  createNameField,
  createPasswordField,
  createPostalCodeField,
  createShippingCheckbox,
  createStreetField,
} from './createFormElements';
import { handlerClickLogin, handlerSubmit } from './eventHandlers';
import createHeader from '../header/headerRegistr';
import createFooter from '../footer/footerRegistr';

function createCustomerBox() {
  const CUSTOMER_BOX = createElement(Tag.DIV, {
    className: styles.customerBox,
  });

  const TITLE_CUSTOMER = createElement(Tag.H2, {
    className: styles.titleCustomer,
    textContent: 'Customer',
  });

  CUSTOMER_BOX.append(
    TITLE_CUSTOMER,
    createEmailField(),
    createPasswordField(),
    createNameField(),
    createLastNameField(),
    createDateBirthField(),
  );

  return CUSTOMER_BOX;
}

function createAddressBox() {
  const TITLE_ADDRESS = createElement(Tag.H2, {
    className: styles.titleAddress,
    textContent: 'Address',
  });

  const ADDRESS_BOX = createElement(Tag.DIV, {
    className: styles.adressBox,
  });

  ADDRESS_BOX.append(
    TITLE_ADDRESS,
    createStreetField(),
    createCityField(),
    createPostalCodeField(),
    createCountryField(),
    createShippingCheckbox(),
    createBillingCheckbox(),
  );

  return ADDRESS_BOX;
}

function createRegistrBox() {
  const REGISTR_BOX = createElement(Tag.DIV, {
    className: styles.registrBox,
  });

  REGISTR_BOX.append(createCustomerBox(), createAddressBox());

  return REGISTR_BOX;
}

function createForm(goPage: (page: Page) => void) {
  const FORM = createElement(Tag.FORM, {
    id: 'registrForm',
    className: styles.registrForm,
  });

  const TITLE = createElement(Tag.H1, {
    className: styles.title,
    textContent: 'Registration',
  });

  const SUBMIT = createInput({
    type: TypeInput.SUBMIT,
    option: {
      id: 'submit',
    },
    handler: { handlerClick: (event) => handlerSubmit(event, goPage) },
  });
  SUBMIT.setAttribute('disabled', 'disabled');
  SUBMIT.setAttribute('value', 'Continue');

  const BOX_LOGIN_TEXT_BUTTON = createElement(Tag.DIV, {
    className: styles.loginTextButton,
  });

  const TEXT_LOGIN = createElement(Tag.DIV, {
    className: styles.titleQuestion,
    textContent: 'Already have an account?',
  });

  const BUTTON_LOGIN = createButton({
    type: TypeButton.TRANSPARENT,
    option: {
      id: 'login',
      className: styles.login,
      textContent: 'Sign in',
    },
    handler: { handlerClick: (event) => handlerClickLogin(event, goPage) },
  });

  BOX_LOGIN_TEXT_BUTTON.append(TEXT_LOGIN, BUTTON_LOGIN);

  FORM.append(TITLE, createRegistrBox(), SUBMIT, BOX_LOGIN_TEXT_BUTTON);

  return FORM;
}

export default function createRegistrationPage(goPage: (page: Page) => void) {
  const REGISTR_PAGE = createElement(Tag.DIV, {
    id: 'registrPage',
    className: styles.registrPage,
  });

  REGISTR_PAGE.append(createHeader(goPage), createForm(goPage), createFooter());

  clearDefaultAddresses();

  return REGISTR_PAGE;
}
