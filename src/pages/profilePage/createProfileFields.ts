import { Tag } from '@/interface';
import createElement from '@utils/create-element';
import styles from '@/pages/profilePage/profilePage.module.css';
import createBasicInfoBox from './main/basicInfo/basicInfo';
import createAddress from './main/adresses/addresses';

export default function createProfileFields() {
  const PROFILE_WRAPPER = createElement(Tag.DIV, {
    className: styles.profileWrapper,
  });

  PROFILE_WRAPPER.append(createBasicInfoBox(), createAddress());

  return PROFILE_WRAPPER;
}
