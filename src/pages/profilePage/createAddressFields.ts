import { AddressGet, Tag, TypeButton } from '@/interface';
import createElement from '@/utils/create-element';
import styles from '@/pages/profilePage/profilePage.module.css';
import store from '@/redux/store/configureStore';
import createManyAddressBox from '@/utils/createManyAdresses';
import createButton from '@/components/baseComponents/button/button';
import toggleAllFields from '@/utils/editProfile';
import { handlerClickAddAddress } from '@/utils/editAddress';

export default function createAddressFields() {
  const WRAPPER = createElement(Tag.DIV, {
    className: styles.addressWrapper,
    id: 'wrapper',
  });

  const AddressContainer = createElement(Tag.DIV, {
    id: 'addressContainer',
    className: styles.addressContainer,
  });

  const ADD_ADDRESS_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: `addAddress`,
      className: styles.add,
      textContent: 'Add new address',
    },
    handler: { handlerClick: handlerClickAddAddress },
  });

  WRAPPER.append(ADD_ADDRESS_BUTTON);

  const data = store.getState().login.user;

  if (data) {
    WRAPPER.append(
      createManyAddressBox(
        data.addresses as AddressGet[],
        data.billingAddressIds as string[],
        data.shippingAddressIds as string[],
        data.defaultShippingAddressId as string,
        data.defaultBillingAddressId as string,
      ),
    );
    toggleAllFields(WRAPPER, true);
  }

  AddressContainer.classList.add(styles.hidden);

  AddressContainer.append(WRAPPER);

  return AddressContainer;
}
