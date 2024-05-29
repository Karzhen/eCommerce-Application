import { Page, Tag, TypeButton, TypeInput } from '@/interface';
import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';
import clearDefaultAddresses from '@/utils/clearDefaultLS';
import toggleShippingInputs from '@/utils/toggleInputs';
import { applyStylesToContainer } from '@/utils/checkSameAddress';
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
  createSameAddressCheckbox,
  createStreetField,
} from './createFormElements';
import { handlerClickLogin, handlerSubmit } from './eventHandlers';
import createHeader from '../header/headerRegistr';
import createFooter from '../footer/footerRegistr';

export function createCustomerBox(isRegistrationPage: boolean) {
  const CUSTOMER_BOX = createElement(Tag.DIV, {
    className: styles.customerBox,
  });

  const MAIN_DATA_BOX = createElement(Tag.DIV, {
    className: styles.mainDataBox,
    id: 'mainDataBox',
  });

  const EMAIL_PASSWORD_BOX = createElement(Tag.DIV, {
    className: styles.emailPasswordBox,
  });

  const NAME_BIRTH_BOX = createElement(Tag.DIV, {
    className: styles.nameBirthBox,
  });

  if (isRegistrationPage) {
    EMAIL_PASSWORD_BOX.append(createEmailField(), createPasswordField());
    NAME_BIRTH_BOX.append(
      createNameField(),
      createLastNameField(),
      createDateBirthField(),
    );
    MAIN_DATA_BOX.append(EMAIL_PASSWORD_BOX, NAME_BIRTH_BOX);
  } else {
    EMAIL_PASSWORD_BOX.append(createEmailField(), createDateBirthField());
    NAME_BIRTH_BOX.append(createNameField(), createLastNameField());
    MAIN_DATA_BOX.append(NAME_BIRTH_BOX, EMAIL_PASSWORD_BOX);
  }

  const TITLE_CUSTOMER = createElement(Tag.H2, {
    className: styles.titleCustomer,
    textContent: 'Customer',
  });

  CUSTOMER_BOX.append(TITLE_CUSTOMER, MAIN_DATA_BOX);

  return CUSTOMER_BOX;
}

function createAddresses(title: string, prefix: string, isShipping?: boolean) {
  if (isShipping) {
    const TITLE_BOX = createElement(Tag.DIV, {});
    const TITLE = createElement(Tag.H2, {
      className: styles.shippingTitle,
      id: 'shippingTitle',
      textContent: title,
    });

    TITLE_BOX.append(TITLE, createSameAddressCheckbox());

    const ADDRESS_WRAPPER = createElement(Tag.DIV, {
      id: 'shipping-address-box',
    });

    ADDRESS_WRAPPER.append(
      TITLE_BOX,
      createStreetField(prefix),
      createCityField(prefix),
      createPostalCodeField(prefix),
      createCountryField(prefix),
    );

    toggleShippingInputs(ADDRESS_WRAPPER, true);
    applyStylesToContainer(ADDRESS_WRAPPER);
    return ADDRESS_WRAPPER;
  }

  const TITLE_ADDRESS = createElement(Tag.H2, {
    className: styles.titleAddress,
    textContent: title,
  });

  const ADDRESS_WRAPPER = createElement(Tag.DIV, {
    id: 'billing-address-box',
    className: styles.billingAddressBox,
  });

  ADDRESS_WRAPPER.append(
    TITLE_ADDRESS,
    createStreetField(prefix),
    createCityField(prefix),
    createPostalCodeField(prefix),
    createCountryField(prefix),
  );

  return ADDRESS_WRAPPER;
}

export function createAddressBox() {
  const ADDRESS_BOX = createElement(Tag.DIV, {
    className: styles.addressBox,
  });

  const SHIPPING_ADDRESS_BOX = createAddresses(
    'Shipping Address',
    'shipping',
    true,
  );
  const BILLING_ADDRESS_BOX = createAddresses('Billing Address', 'billing');

  BILLING_ADDRESS_BOX.append(createBillingCheckbox());

  const BOX_SECOND_COLUMN = createElement(Tag.DIV, {
    className: styles.secondColumn,
  });

  BOX_SECOND_COLUMN.append(SHIPPING_ADDRESS_BOX, createShippingCheckbox());

  ADDRESS_BOX.append(BILLING_ADDRESS_BOX, BOX_SECOND_COLUMN);

  return ADDRESS_BOX;
}

function createRegistrBox() {
  const REGISTR_BOX = createElement(Tag.DIV, {
    className: styles.registrBox,
  });

  REGISTR_BOX.append(createCustomerBox(true), createAddressBox());

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
  localStorage.setItem('sameAddress', 'true');

  return REGISTR_PAGE;
}
