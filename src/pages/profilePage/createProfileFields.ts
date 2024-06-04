import { Tag, TypeButton } from '@/interface';
import createElement from '@utils/create-element';
import styles from '@/pages/profilePage/profilePage.module.css';
import createButton from '@/components/baseComponents/button/button';
import handlerClickPasswordEditMode, {
  handlerClickCancelPasswordEditMode,
  handlerClickChangePassword,
} from '@/utils/editPassword';
import toggleAllFields from '@/utils/editProfile';
import {
  createNameHiddenField,
  createPasswordUpdateField,
} from './createPasswordFields';
import createBasicInfoBox from './main/basicInfo/basicInfo';
import createAddressFields from './createAddressFields';

const createProfileFields = () => {
  const PROFILE_WRAPPER = createElement(Tag.DIV, {
    className: styles.profileWrapper,
    id: 'profileWrapper',
  });

  const CHANGE_PASSWORD_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: 'changePassword',
      textContent: 'Change password',
      className: styles.changePassword,
    },
    handler: { handlerClick: handlerClickChangePassword },
  });

  CHANGE_PASSWORD_BUTTON.setAttribute('disabled', 'true');

  const EDIT_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: 'editPassword',
      className: styles.edit,
      textContent: 'Edit',
    },
    handler: { handlerClick: handlerClickPasswordEditMode },
  });

  const CANCEL_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: 'cancelPassword',
      className: styles.cancel,
      textContent: 'Cancel',
    },
    handler: { handlerClick: handlerClickCancelPasswordEditMode },
  });

  CANCEL_BUTTON.setAttribute('disabled', 'true');

  const BUTTONS = createElement(Tag.FORM, {
    className: styles.profileButtons,
    id: 'passwordButtons',
  });

  BUTTONS.append(EDIT_BUTTON, CANCEL_BUTTON);

  const PersonalContainer = createElement(Tag.DIV, {
    id: 'personalContainer',
  });
  PersonalContainer.appendChild(createBasicInfoBox());

  const PasswordContainer = createElement(Tag.DIV, {
    id: 'passwordContainer',
    className: styles.passwordContainer,
  });

  const PasswordForm = createElement(Tag.FORM, {
    id: 'passwordForm',
  });

  const PasswordWrapper = createElement(Tag.DIV, {
    id: 'passwordWrapper',
    className: styles.passwordWrapper,
  });

  PasswordWrapper.append(
    BUTTONS,
    createNameHiddenField(),
    createPasswordUpdateField(true),
    createPasswordUpdateField(false),
    CHANGE_PASSWORD_BUTTON,
  );

  toggleAllFields(PasswordWrapper, true);

  PasswordForm.appendChild(PasswordWrapper);

  PasswordContainer.appendChild(PasswordForm);

  PasswordContainer.classList.add(styles.hidden);

  PROFILE_WRAPPER.append(
    PersonalContainer,
    PasswordContainer,
    createAddressFields(),
  );

  return PROFILE_WRAPPER;
};

export default createProfileFields;
