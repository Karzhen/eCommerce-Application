import { Tag, TypeInput } from '@/interface';
import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';

import validateForm from './validate-form';

import styles from './loginPage.module.css';

function handlerSubmit(event: Event) {
  event?.preventDefault();
}

function handlerInputPasswordEmail(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    const SUBMIT = document.getElementById('submit');
    if (SUBMIT) {
      if (validateForm()) {
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
  INPUT_EMAIL.setAttribute('pattern', '^[a-zA-Z0-9_\\-]+@[a-z]+\\.[a-z]{2,4}$');

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

export default function createLoginPage() {
  const LOGIN_PAGE = createElement(Tag.DIV, {
    id: 'loginPage',
    className: styles.loginPage,
  });

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
    handler: { handlerClick: (event) => handlerSubmit(event) },
  });
  SUBMIT.setAttribute('disabled', 'disabled');
  SUBMIT.setAttribute('value', 'Sign in');

  FORM.append(TITLE, createEmailField(), createPasswordField(), SUBMIT);
  LOGIN_PAGE.append(FORM);

  return LOGIN_PAGE;
}
