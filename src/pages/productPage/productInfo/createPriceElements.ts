import createElement from '@utils/create-element';
import { ProductVariant } from '@commercetools/platform-sdk';
import { Tag } from '@/interface';
import styles from '@pages/productPage/productInfo/productInfo.module.css';

export default function createPriceElements(
  currentVariant: ProductVariant,
): HTMLElement[] {
  const elements: HTMLElement[] = [];

  const currentPrice = currentVariant.prices![0]?.value;

  if (!currentPrice) {
    const unavailableMessage = createElement(Tag.P, {
      textContent: 'This product is not available',
      className: styles.originalPrice,
    });
    elements.push(unavailableMessage);
  } else {
    const price = currentPrice || { centAmount: 0, currencyCode: 'USD' };

    const discountedPrice = currentVariant.prices![0]?.discounted?.value;
    const priceTextContent = discountedPrice
      ? `Discounted Price: ${discountedPrice.centAmount / 100} ${discountedPrice.currencyCode}`
      : `Price: ${price.centAmount / 100} ${price.currencyCode}`;

    const productPrice = createElement(Tag.P, {
      textContent: priceTextContent,
      className: discountedPrice
        ? styles.discountedPrice
        : styles.originalPrice,
    });

    elements.push(productPrice);

    if (discountedPrice) {
      const originalPrice = createElement(Tag.P, {
        textContent: `Original Price: ${price.centAmount / 100} ${price.currencyCode}`,
        className: styles.originalPrice,
      });
      originalPrice.classList.add(styles.oldPrice);
      elements.push(originalPrice);
    }
  }

  return elements;
}
