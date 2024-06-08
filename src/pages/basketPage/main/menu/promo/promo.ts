import createElement from '@/utils/create-element';

import createInput from '@baseComponents/input/input';
import createButton from '@baseComponents/button/button';

import { Tag, TypeInput, TypeButton } from '@/interface';

import styles from './promo.module.css';

export default function createPromoBlock() {
  const PROMO_BLOCK = createElement(Tag.DIV, {
    className: styles.promoBlock,
  });

  const INPUT_PROMO = createInput({
    type: TypeInput.TEXT,
    option: {},
    handler: {},
  });

  const PROMO_BUTTON = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Submit promo' },
    handler: {},
  });

  PROMO_BLOCK.append(INPUT_PROMO, PROMO_BUTTON);

  return PROMO_BLOCK;
}
