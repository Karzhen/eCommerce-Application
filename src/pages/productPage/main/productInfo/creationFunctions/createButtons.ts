import { ProductVariant } from '@commercetools/platform-sdk';
import { Attribute } from '@pages/productPage/main/productInfo/interfaces';
import createElement from '@utils/create-element';
import { ProductVariants, Tag } from '@/interface';
import styles from '@pages/productPage/main/productInfo/productInfo.module.css';
import handleButtonClick from '@pages/productPage/main/productInfo/handlers/handleButtonClick';

export default function createButtons(
  productData: ProductVariants,
  attribute: Attribute,
  currentVariant: ProductVariant,
): HTMLElement {
  const radio = createElement(Tag.INPUT, {}) as HTMLInputElement;
  radio.type = 'radio';
  radio.value = attribute.value.key;
  radio.name = attribute.name;
  // console.log(`${attribute.name}: ${attribute.value.key}`);

  const label = createElement(Tag.LABEL, {
    textContent: attribute.value.label,
    className: styles.attributeButton,
    onclick: () => {
      if (!label.classList.contains(styles.attributeActive)) {
        handleButtonClick(productData, attribute.name, label);
      }
    },
  });

  if (attribute.name === 'color') {
    label.style.setProperty('--button-background-color', attribute.value.label);
    label.style.setProperty('--button-color', attribute.value.label);
  }

  const isActive = currentVariant.attributes?.some(
    (attr) =>
      attr.name === attribute.name && attr.value.key === attribute.value.key,
  );

  if (isActive) {
    label.classList.add(styles.attributeActive);
  } else {
    label.classList.add(styles.attributeInactive);
  }

  label.appendChild(radio);

  return label;
}
