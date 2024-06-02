import { Attribute } from '@pages/productPage/productInfo/interfaces';
import createElement from '@utils/create-element';
import { Tag } from '@/interface';
import styles from '@pages/productPage/productInfo/productInfo.module.css';

function createButtons(attribute: Attribute): HTMLElement {
  const radio = createElement(Tag.INPUT, {}) as HTMLInputElement;
  radio.type = 'radio';
  radio.value = attribute.value.key;
  radio.name = attribute.name;

  const label = createElement(Tag.LABEL, {
    textContent: attribute.value.label,
    className: styles.attributeButton,
    onclick: () => {
      const siblings = document.querySelectorAll(
        `input[name='${attribute.name}']`,
      );
      siblings.forEach((sibling) => {
        sibling.parentElement?.classList.remove(styles.attributeActive);
        sibling.parentElement?.classList.add(styles.attributeInactive);
      });

      label.classList.add(styles.attributeActive);
      label.classList.remove(styles.attributeInactive);
    },
  });

  if (attribute.name === 'color') {
    label.style.setProperty('--button-background-color', attribute.value.label);
    label.style.setProperty('--button-color', attribute.value.label);
  }

  if (attribute.master) {
    label.classList.add(styles.attributeActive);
  } else {
    label.classList.add(styles.attributeInactive);
  }

  label.appendChild(radio);

  return label;
}

const createFieldset = (attributes: Attribute[], legendText: string) => {
  const fieldset = createElement(Tag.FIELDSET, {
    className: styles.attributeFieldset,
  });

  const legend = createElement(Tag.LEGEND, {
    className: styles.attributeLegend,
    textContent: legendText,
  });

  fieldset.append(legend);

  attributes.forEach((attr) => {
    fieldset.append(createButtons(attr));
  });

  return fieldset;
};

export default function createAttributeButtons(attributeArray: Attribute[]) {
  const container = createElement(Tag.DIV, {
    className: styles.attributesContainer,
  });

  const sizeAttributes = attributeArray.filter((attr) => attr.name === 'size');
  const colorAttributes = attributeArray.filter(
    (attr) => attr.name === 'color',
  );

  const sizeFieldset = createFieldset(sizeAttributes, 'Size');
  const colorFieldset = createFieldset(colorAttributes, 'Color');

  container.append(sizeFieldset, colorFieldset);

  return container;
}
