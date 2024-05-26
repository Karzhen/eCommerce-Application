import createButton from '@/components/baseComponents/button/button';
import createInput from '@/components/baseComponents/input/input';
import { Tag, TypeButton, TypeInput } from '@/interface';
import createElement from '@/utils/create-element';
import toggleAllFields from '@/utils/editProfile';
import styles from '@/pages/profilePage/main/basicInfo/basicInfo.module.css';

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
    handler: {},
  });

  const LABEL_NAME = createElement(Tag.LABEL, {
    className: styles.profileName,
    textContent: 'Name',
  });

  LABEL_NAME.setAttribute('for', 'profileName');

  const INPUT_NAME = createInput({
    type: TypeInput.TEXT,
    option: { id: 'profileName', className: styles.name },
    handler: {},
  });
  INPUT_NAME.setAttribute('readonly', '');

  const LABEL_LASTNAME = createElement(Tag.LABEL, {
    className: styles.profileLastName,
    textContent: 'Last name',
  });

  LABEL_NAME.setAttribute('for', 'profileLastName');

  const INPUT_LASTNAME = createInput({
    type: TypeInput.TEXT,
    option: { id: 'profileLastName', className: styles.lastName },
    handler: {},
  });
  INPUT_LASTNAME.setAttribute('readonly', '');

  const LABEL_DATE_BIRTH = createElement(Tag.LABEL, {
    className: styles.profileDateBirth,
    textContent: 'Date of birth',
  });

  LABEL_DATE_BIRTH.setAttribute('for', 'dateBirth');

  const INPUT_DATE_BIRTH = createInput({
    type: TypeInput.TEXT,
    option: { id: 'dateBirth', className: styles.dateBirth },
    handler: {},
  });
  INPUT_DATE_BIRTH.setAttribute('readonly', '');

  PROFILE_DATA.append(
    EDIT_BUTTON,
    LABEL_NAME,
    INPUT_NAME,
    LABEL_LASTNAME,
    INPUT_LASTNAME,
    LABEL_DATE_BIRTH,
    INPUT_DATE_BIRTH,
  );

  toggleAllFields(PROFILE_DATA, true);

  return PROFILE_DATA;
}
