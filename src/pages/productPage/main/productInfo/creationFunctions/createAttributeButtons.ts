import { Attribute } from '@/pages/productPage/main/productInfo/interfaces';
import createElement from '@utils/create-element';
import { Tag } from '@/interface';
import styles from '@pages/productPage/main/productInfo/productInfo.module.css';
import { ProductData, ProductVariant } from '@commercetools/platform-sdk';

function findProductVariant(
  productData: ProductData,
  color: string,
  size: string,
) {
  const variants = [productData.masterVariant, ...productData.variants];
  // console.clear();
  // console.log(variants);

  return variants.find((variant) => {
    const colorAttribute = variant.attributes?.find(
      (attr) => attr.name === 'color',
    );
    const sizeAttribute = variant.attributes?.find(
      (attr) => attr.name === 'size',
    );

    return (
      colorAttribute &&
      sizeAttribute &&
      colorAttribute.value.key === color &&
      sizeAttribute.value.key === size
    );
  });
}

function logActiveAttributes(productData: ProductData) {
  const activeLabels = document.querySelectorAll(`.${styles.attributeActive}`);
  const activeAttributes: { [key: string]: string } = {};

  activeLabels.forEach((label) => {
    const input = label.querySelector('input') as HTMLInputElement;
    if (input) {
      activeAttributes[input.name] = input.value;
    }
  });

  const currentVariant = findProductVariant(
    productData,
    activeAttributes.color,
    activeAttributes.size,
  );
  // console.log(currentVariant);
  // console.log('Active Attributes:', activeAttributes);
  const buyButton = document.querySelector(
    `.${styles['buy-button']}`,
  ) as HTMLButtonElement;
  buyButton.disabled = !currentVariant;
}

function handleButtonClick(
  productData: ProductData,
  attributeName: string,
  label: HTMLElement,
) {
  const siblings = document.querySelectorAll(`input[name='${attributeName}']`);
  siblings.forEach((sibling) => {
    sibling.parentElement?.classList.remove(styles.attributeActive);
    sibling.parentElement?.classList.add(styles.attributeInactive);
  });

  label.classList.add(styles.attributeActive);
  label.classList.remove(styles.attributeInactive);

  logActiveAttributes(productData);
}

function createButtons(
  productData: ProductData,
  attribute: Attribute,
  currentVariant: ProductVariant,
): HTMLElement {
  const radio = createElement(Tag.INPUT, {}) as HTMLInputElement;
  radio.type = 'radio';
  radio.value = attribute.value.key;
  radio.name = attribute.name;

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

const createFieldset = (
  productData: ProductData,
  attributes: Attribute[],
  legendText: string,
  currentVariant: ProductVariant,
) => {
  const fieldset = createElement(Tag.FIELDSET, {
    className: styles.attributeFieldset,
  });

  const legend = createElement(Tag.LEGEND, {
    className: styles.attributeLegend,
    textContent: legendText,
  });

  fieldset.append(legend);

  attributes.forEach((attr) => {
    fieldset.append(createButtons(productData, attr, currentVariant));
  });

  return fieldset;
};

export default function createAttributeButtons(
  productData: ProductData,
  attributeArray: Attribute[],
  currentVariant: ProductVariant,
) {
  const container = createElement(Tag.DIV, {
    className: styles.attributesContainer,
  });

  const sizeAttributes = attributeArray.filter((attr) => attr.name === 'size');
  const colorAttributes = attributeArray.filter(
    (attr) => attr.name === 'color',
  );

  const sizeFieldset = createFieldset(
    productData,
    sizeAttributes,
    'Size',
    currentVariant,
  );
  const colorFieldset = createFieldset(
    productData,
    colorAttributes,
    'Color',
    currentVariant,
  );

  container.append(sizeFieldset, colorFieldset);

  return container;
}
