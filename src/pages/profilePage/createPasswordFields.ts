import { Tag, TypeInput } from '@/interface';
import createElement from '@utils/create-element';
import createInput from '@baseComponents/input/input';
import styles from '@/pages/profilePage/profilePage.module.css';
import { validatePasswordForm } from './validate-profile-form';

export function handlerClickEye(event: Event) {
  const EL = event.target;
  if (EL instanceof HTMLElement) {
    const PASSWORD_ID =
      EL.id === 'eyeCurrent' ? 'currentPassword' : 'newPassword';
    const INPUT_PASSWORD = document.getElementById(PASSWORD_ID);
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

export function handlerInputPasswordChange(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    const CHANGE = document.getElementById('changePassword');
    if (CHANGE) {
      if (validatePasswordForm()) {
        CHANGE.removeAttribute('disabled');
      } else {
        CHANGE.setAttribute('disabled', 'disabled');
      }
    }
  }
}

export function createPasswordUpdateField(isCurrent: boolean) {
  const PASSWORD_FIELD = createElement(Tag.DIV, {
    className: styles.passwordField,
    id: isCurrent ? 'currentPasswordField' : 'newPasswordField',
  });

  const LABEL_PASSWORD = createElement(Tag.LABEL, {
    className: styles.passwordLabel,
    textContent: isCurrent ? 'Current Password' : 'New Password',
  });

  const WRAPPER_PASSWORD = createElement(Tag.DIV, {
    className: styles.wrapperPassword,
  });

  const INPUT_PASSWORD = createInput({
    type: TypeInput.PASS,
    option: {
      id: isCurrent ? 'currentPassword' : 'newPassword',
      className: styles.password,
    },
    handler: { handlerInput: handlerInputPasswordChange },
  });
  INPUT_PASSWORD.setAttribute('required', 'required');
  INPUT_PASSWORD.setAttribute(
    'autocomplete',
    isCurrent ? 'current-password' : 'new-password',
  );
  INPUT_PASSWORD.setAttribute(
    'pattern',
    '^(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}(?<!\\s)$',
  );
  INPUT_PASSWORD.setAttribute('minlength', '8');

  const IMG_EYE = createElement(Tag.DIV, {
    id: isCurrent ? 'eyeCurrent' : 'eyeNew',
    className: styles.eye,
  });
  IMG_EYE.addEventListener('click', handlerClickEye);

  WRAPPER_PASSWORD.append(INPUT_PASSWORD, IMG_EYE);

  const LABEL_ERROR = createElement(Tag.LABEL, {
    id: isCurrent ? 'currentPasswordError' : 'newPasswordError',
    className: styles.passwordError,
  });
  PASSWORD_FIELD.append(LABEL_PASSWORD, WRAPPER_PASSWORD, LABEL_ERROR);

  return PASSWORD_FIELD;
}

export function createNameHiddenField() {
  const NAME_FIELD = createElement(Tag.DIV, {
    className: styles.hiddenName,
  });

  const INPUT_NAME = createInput({
    type: TypeInput.TEXT,
    option: { id: 'hiddenName', className: styles.hiddenName },
    handler: {},
  });
  INPUT_NAME.setAttribute('autocomplete', 'none');
  INPUT_NAME.setAttribute('hidden', '');

  NAME_FIELD.append(INPUT_NAME);

  return NAME_FIELD;
}
