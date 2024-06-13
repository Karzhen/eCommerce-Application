import styles from '@pages/productPage/main/productInfo/productInfo.module.css';

export default function handlerIncreaseClick(event: Event) {
  const quantityDisplay = (
    event.target as HTMLElement
  ).parentElement?.querySelector(`.${styles.quantityDisplay}`);
  if (quantityDisplay) {
    const currentQuantity = parseInt(quantityDisplay.textContent || '1', 10);
    quantityDisplay.textContent = (currentQuantity + 1).toString();
  }
}
