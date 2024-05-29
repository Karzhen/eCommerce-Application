import { Tag, TypeButton } from '@/interface';
import createElement from '@utils/create-element';
import styles from '@/pages/profilePage/profilePage.module.css';
import createButton from '@/components/baseComponents/button/button';
import createBasicInfoBox from './main/basicInfo/basicInfo';
import createAddress from './main/adresses/addresses';

export default function createProfileFields() {
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
    handler: {},
  });

  const BASIC_ADDRESS_WRAPPER = createElement(Tag.DIV, {
    className: styles.basicAddressWrapper,
  });

  BASIC_ADDRESS_WRAPPER.append(
    createBasicInfoBox(),
    createAddress(),
    CHANGE_PASSWORD_BUTTON,
  );

  PROFILE_WRAPPER.append(BASIC_ADDRESS_WRAPPER);

  return PROFILE_WRAPPER;
}
