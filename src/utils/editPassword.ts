import apiUpdatePassword from '@/api/apiUpdatePassword';
import { validatePasswordForm } from '@/pages/profilePage/validate-profile-form';
import store from '@/redux/store/configureStore';
import { createAndShowPopup } from '@/pages/registrationPage/registration/eventHandlers';
import toggleAllFields from './editProfile';

export default function handlerClickPasswordEditMode(event: Event) {
  event?.preventDefault();
  const EDIT = event.target as HTMLButtonElement;
  const CANCEL = document.getElementById('cancelPassword') as HTMLButtonElement;
  const PASSWORD_DATA = document.getElementById(
    'passwordWrapper',
  ) as HTMLElement;
  if (EDIT) {
    CANCEL.removeAttribute('disabled');
    toggleAllFields(PASSWORD_DATA, false);
    EDIT.setAttribute('disabled', 'true');
  }
}

export async function handlerClickChangePassword(event: Event) {
  event?.preventDefault();
  const CHANGE_PASSWORD_BUTTON = event.target as HTMLButtonElement;
  const CURRENT_PASSWORD = document.getElementById('currentPassword');
  const NEW_PASSWORD = document.getElementById('newPassword');
  const CANCEL = document.getElementById('cancelPassword') as HTMLButtonElement;
  const EDIT = document.getElementById('editPassword') as HTMLButtonElement;
  const PASSWORD_DATA = document.getElementById(
    'passwordWrapper',
  ) as HTMLElement;
  if (
    CURRENT_PASSWORD instanceof HTMLInputElement &&
    NEW_PASSWORD instanceof HTMLInputElement &&
    validatePasswordForm()
  ) {
    await apiUpdatePassword(CURRENT_PASSWORD.value, NEW_PASSWORD.value);
    const { errorChangePassword } = store.getState().login;
    if (errorChangePassword) {
      createAndShowPopup(
        'Failure to change password',
        `Error: ${errorChangePassword}`,
        false,
      );
    } else {
      createAndShowPopup(
        'Password successfully updated',
        'The password is valid. Now you can use it to login.',
        true,
      );
    }
    CURRENT_PASSWORD.value = '';
    NEW_PASSWORD.value = '';
  }
  CANCEL.setAttribute('disabled', 'true');
  EDIT.removeAttribute('disabled');
  CHANGE_PASSWORD_BUTTON.setAttribute('disabled', 'true');
  toggleAllFields(PASSWORD_DATA, true);
}

export function handlerClickCancelPasswordEditMode(event: Event) {
  event.preventDefault();
  const EDIT = document.getElementById('editPassword') as HTMLButtonElement;
  const CANCEL = document.getElementById('cancelPassword') as HTMLButtonElement;
  const PASSWORD_DATA = document.getElementById(
    'passwordWrapper',
  ) as HTMLElement;
  CANCEL.setAttribute('disabled', 'true');
  EDIT.removeAttribute('disabled');
  toggleAllFields(PASSWORD_DATA, true);
  const CURRENT_PASSWORD = document.getElementById('currentPassword');
  const NEW_PASSWORD = document.getElementById('newPassword');
  if (
    CURRENT_PASSWORD instanceof HTMLInputElement &&
    NEW_PASSWORD instanceof HTMLInputElement
  ) {
    CURRENT_PASSWORD.value = '';
    NEW_PASSWORD.value = '';
  }
  validatePasswordForm();
}
