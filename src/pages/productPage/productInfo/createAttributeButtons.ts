import { Attribute } from '@pages/productPage/productInfo/interfaces';
import createElement from '@utils/create-element';
import { Tag } from '@/interface';
import styles from '@pages/productPage/productInfo/productInfo.module.css';

function createButtons(attribute: Attribute): HTMLElement {
  const button = createElement(Tag.BUTTON, {
    textContent: attribute.value.label,
    className: styles.attributeButton,
    onclick: () => {
      // if (attribute.name === "size") {
      //     // Логика изменения размера
      // } else if (attribute.name === "color") {
      //     // Логика изменения цвета
      // }
    },
  });

  button.style.setProperty('--button-background-color', attribute.value.label);
  button.style.setProperty('--button-color', attribute.value.label);
  return button;
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

  const sizeButtons = createElement(Tag.DIV, {
    textContent: 'Size',
    className: styles.attributeGroup,
  });
  sizeAttributes.forEach((attr) => {
    sizeButtons.append(createButtons(attr));
  });

  const colorButtons = createElement(Tag.DIV, {
    textContent: 'Color',
    className: styles.attributeGroup,
  });
  colorAttributes.forEach((attr) => {
    colorButtons.append(createButtons(attr));
  });

  const sizeFieldset = createFieldset(sizeAttributes, 'Size');
  const colorFieldset = createFieldset(colorAttributes, 'Color');

  container.append(sizeFieldset, colorFieldset);

  return container;
}
