import createButton from '@/components/baseComponents/button/button';
import { Tag, TypeButton } from '@/interface';
import createElement from '@/utils/create-element';
import toggleAllFields, {
  handlerClickPersonalEditMode,
  handlerClickCancelEditMode,
} from '@/utils/editProfile';
import styles from '@/pages/profilePage/main/basicInfo/basicInfo.module.css';
import { createCustomerBox } from '@/pages/registrationPage/registration/registrationPage';

export default function createBasicInfoBox() {
  const PROFILE_DATA = createElement(Tag.FORM, {
    className: styles.profileData,
    id: 'profileData',
  });

  const EDIT_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: 'editProfile',
      className: styles.edit,
      textContent: 'Edit',
    },
    handler: { handlerClick: handlerClickPersonalEditMode },
  });

  const CANCEL_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: 'cancelProfile',
      className: styles.cancel,
      textContent: 'Cancel',
    },
    handler: { handlerClick: handlerClickCancelEditMode },
  });

  CANCEL_BUTTON.setAttribute('disabled', 'true');

  const BUTTONS = createElement(Tag.FORM, {
    className: styles.profileButtons,
    id: 'profileButtons',
  });

  const CUSTOMER_BOX = createCustomerBox(false);

  CUSTOMER_BOX.className = styles.customerBox;

  BUTTONS.append(EDIT_BUTTON, CANCEL_BUTTON);

  PROFILE_DATA.append(BUTTONS, CUSTOMER_BOX);

  toggleAllFields(PROFILE_DATA, true);

  return PROFILE_DATA;
}
