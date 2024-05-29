import createButton from '@/components/baseComponents/button/button';
import { Tag, TypeButton } from '@/interface';
import createElement from '@/utils/create-element';
import toggleAllFields, { handlerClickEditMode } from '@/utils/editProfile';
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
    handler: { handlerClick: handlerClickEditMode },
  });

  const CUSTOMER_BOX = createCustomerBox(false);

  CUSTOMER_BOX.className = styles.customerBox;

  PROFILE_DATA.append(EDIT_BUTTON, CUSTOMER_BOX);

  toggleAllFields(PROFILE_DATA, true);

  return PROFILE_DATA;
}
