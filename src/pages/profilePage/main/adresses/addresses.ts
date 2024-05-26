import { Tag } from '@/interface';
import createElement from '@/utils/create-element';
import toggleAllFields from '@/utils/editProfile';
import styles from '@/pages/profilePage/main/adresses/addresses.module.css';
import { createAddressBox } from '@/pages/registrationPage/registration/registrationPage';

export default function createAddress() {
  const ADDRESS_DATA = createElement(Tag.FORM, {
    className: styles.addressData,
    id: 'profileAddress',
  });

  const ADDRESS_BOX = createAddressBox();

  ADDRESS_BOX.className = styles.addressBox;

  toggleAllFields(ADDRESS_BOX, true);

  ADDRESS_DATA.append(ADDRESS_BOX);

  return ADDRESS_DATA;
}
