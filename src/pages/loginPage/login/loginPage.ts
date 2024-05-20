import store from '@redux/store/configureStore';

import { Tag, TypeInput, TypeButton, Page } from '@/interface';
import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';
import createPopUp from '@components/popUp/popUp';

import loginUser from '@utils/login';
import { createAndShowPopup } from "@pages/registrationPage/registration/eventHandlers";
import validateLoginForm from './validate-login-form';

import styles from './loginPage.module.css';
import createHeader from '../header/headerLogin';
import createFooter from '../footer/footerLogin';

async function handlerSubmit(event: Event, goPage: (page: Page) => void) {
  event?.preventDefault();
  (event.target as HTMLButtonElement).setAttribute('disabled', 'disabled');

  const INPUT_EMAIL = document.getElementById('email');
  const INPUT_PASSWORD = document.getElementById('password');

  if (
    INPUT_EMAIL instanceof HTMLInputElement &&
    INPUT_PASSWORD instanceof HTMLInputElement
  ) {
    const login = INPUT_EMAIL.value;
    const password = INPUT_PASSWORD.value;

    if (!validateLoginForm()) {
      createAndShowPopup(
          'Authorisation Error',
          'One or more fields do not match the input data format. Refresh the page and try again',
          false
      );
    } else {
      await loginUser(login, password);
      if (store.getState().login.isLogin) goPage(Page.MAIN);
      else {
        const popup = createPopUp(
            'Authorisation Error',
            store.getState().login.value || 'Something went wrong',
        );
        document.body.append(popup);
        (popup as HTMLDialogElement).showModal();
      }
    }
  }
  (event.target as HTMLButtonElement).removeAttribute('disabled');
}

function handlerInputPasswordEmail(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    const SUBMIT = document.getElementById('submit');
    if (SUBMIT) {
      if (validateLoginForm()) {
        SUBMIT.removeAttribute('disabled');
      } else {
        SUBMIT.setAttribute('disabled', 'disabled');
      }
    }
  }
}

function handlerClickEye(event: Event) {
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

function handlerClickRegister(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.REGISTR);
}

function createEmailField() {
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
    handler: { handlerInput: handlerInputPasswordEmail },
  });
  INPUT_EMAIL.setAttribute('required', 'required');
  INPUT_EMAIL.setAttribute('autocomplete', 'username');
  INPUT_EMAIL.setAttribute(
    'pattern',
    '^[a-zA-Z0-9_\\-\\.]+@[a-z]+\\.[a-z]{2,4}$',
  );

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: 'emailError',
    className: styles.emailError,
  });

  EMAIL_FIELD.append(LABEL_EMAIL, INPUT_EMAIL, LABEL_ERROR);

  return EMAIL_FIELD;
}

function createPasswordField() {
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
    handler: { handlerInput: handlerInputPasswordEmail },
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

function createForm(goPage: (page: Page) => void) {
  const FORM = createElement(Tag.FORM, {
    id: 'loginForm',
    className: styles.loginForm,
  });

  const TITLE = createElement(Tag.H1, {
    className: styles.title,
    textContent: 'Sign in',
  });

  const SUBMIT = createInput({
    type: TypeInput.SUBMIT,
    option: {
      id: 'submit',
    },
    handler: { handlerClick: (event) => handlerSubmit(event, goPage) },
  });
  SUBMIT.setAttribute('disabled', 'disabled');
  SUBMIT.setAttribute('value', 'Sign in');

  const BUTTON_REGISTRATION = createButton({
    type: TypeButton.TRANSPARENT,
    option: {
      id: 'register',
      className: styles.register,
      textContent: 'Sign up',
    },
    handler: { handlerClick: (event) => handlerClickRegister(event, goPage) },
  });

  FORM.append(
    TITLE,
    createEmailField(),
    createPasswordField(),
    SUBMIT,
    BUTTON_REGISTRATION,
  );

  return FORM;
}

export default function createLoginPage(goPage: (page: Page) => void) {
  const LOGIN_PAGE = createElement(Tag.DIV, {
    id: 'loginPage',
    className: styles.loginPage,
  });

  LOGIN_PAGE.append(createHeader(goPage), createForm(goPage), createFooter());

  return LOGIN_PAGE;
}
