import { Attribute } from '@/pages/productPage/main/productInfo/interfaces';
import createElement from '@utils/create-element';
import { ProductVariants, Tag } from '@/interface';
import styles from '@pages/productPage/main/productInfo/productInfo.module.css';
import { ProductVariant } from '@commercetools/platform-sdk';
import createFieldset from '@pages/productPage/main/productInfo/creationFunctions/createFieldset';

export default function createAttributeButtons(
  productData: ProductVariants,
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
