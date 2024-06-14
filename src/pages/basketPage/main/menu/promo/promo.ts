import store from '@redux/store/configureStore';

import apiSetPromocode from '@api/apiSetPromocode';
import apiRemovePromocode from '@api/apiRemovePromocode';

import createElement from '@/utils/create-element';

import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';
import createPopUp from '@components/popUp/popUp';

import { Tag, TypeInput, TypeButton } from '@/interface';

import styles from './promo.module.css';

export default function createPromoBlock() {
  const PROMO_BLOCK = createElement(Tag.DIV, {
    className: styles.promoBlock,
  });

  const promo = store.getState().basket.promoCode;

  const INPUT_PROMO = createInput({
    type: TypeInput.TEXT,
    option: {
      className: styles.inputPromo,
    },
    handler: {},
  });
  if (promo) {
    (INPUT_PROMO as HTMLInputElement).value = promo.title;
    INPUT_PROMO.setAttribute('promoCodeId', promo.promoCodeId);
    INPUT_PROMO.setAttribute('disabled', '');
  }

  let PROMO_REMOVE_BUTTON: HTMLElement;
  const PROMO_SUBMIT_BUTTON = createButton({
    type: TypeButton.SECONDARY,
    option: {
      textContent: 'Submit promo',
      className: styles.buttonSubmitPromo,
    },
    handler: {
      handlerClick: async () => {
        PROMO_SUBMIT_BUTTON.setAttribute('disabled', '');
        PROMO_REMOVE_BUTTON.removeAttribute('disabled');
        INPUT_PROMO.setAttribute('disabled', '');
        const promoCode = (INPUT_PROMO as HTMLInputElement).value.toUpperCase();
        const SPINNER = document.getElementById('spinner');
        if (SPINNER) {
          SPINNER.style.display = 'block';
        }
        await apiSetPromocode(promoCode);
        if (SPINNER) {
          SPINNER.style.display = 'none';
        }
        if (store.getState().basket.error) {
          (INPUT_PROMO as HTMLInputElement).value = '';
          INPUT_PROMO.removeAttribute('disabled');
          PROMO_SUBMIT_BUTTON.removeAttribute('disabled');
          PROMO_REMOVE_BUTTON.setAttribute('disabled', '');
          const POPUP = createPopUp(
            'Error',
            `the code ${(INPUT_PROMO as HTMLInputElement).value} is invalid`,
            false,
          );
          document.body.appendChild(POPUP);
          (POPUP as HTMLDialogElement).showModal();
        } else {
          INPUT_PROMO.setAttribute(
            'promoCodeId',
            store.getState().basket.promoCode!.promoCodeId,
          );
        }
      },
    },
  });
  if (promo) {
    PROMO_SUBMIT_BUTTON.setAttribute('disabled', '');
  } else {
    PROMO_SUBMIT_BUTTON.removeAttribute('disabled');
  }

  PROMO_REMOVE_BUTTON = createButton({
    type: TypeButton.SECONDARY,
    option: {
      textContent: 'Remove promo',
      className: styles.buttonRemovePromo,
    },
    handler: {
      handlerClick: async () => {
        const promoCode = (INPUT_PROMO as HTMLInputElement).getAttribute(
          'promoCodeId',
        );
        PROMO_SUBMIT_BUTTON.removeAttribute('disabled');
        PROMO_REMOVE_BUTTON.setAttribute('disabled', '');
        INPUT_PROMO.removeAttribute('disabled');
        (INPUT_PROMO as HTMLInputElement).value = '';

        if (promoCode) {
          const SPINNER = document.getElementById('spinner');
          if (SPINNER) {
            SPINNER.style.display = 'block';
          }
          await apiRemovePromocode(promoCode);
          if (SPINNER) {
            SPINNER.style.display = 'none';
          }
        }
      },
    },
  });
  if (promo) {
    PROMO_REMOVE_BUTTON.removeAttribute('disabled');
  } else {
    PROMO_REMOVE_BUTTON.setAttribute('disabled', '');
  }

  PROMO_BLOCK.append(INPUT_PROMO, PROMO_SUBMIT_BUTTON, PROMO_REMOVE_BUTTON);

  return PROMO_BLOCK;
}
