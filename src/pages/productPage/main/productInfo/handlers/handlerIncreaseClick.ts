import styles from '@pages/productPage/main/productInfo/productInfo.module.css';
import apiChangeQuantity from '@api/apiChangeQuantity';
import findItemBasketId from '@pages/productPage/main/productInfo/utils/findItemBasketId';

export default async function handlerIncreaseClick(
  event: Event,
  productID: string,
  variantID: string,
) {
  const quantityDisplay = (
    event.target as HTMLElement
  ).parentElement?.querySelector(`.${styles.quantityDisplay}`);
  if (quantityDisplay) {
    const currentQuantity = parseInt(quantityDisplay.textContent || '1', 10);
    quantityDisplay.textContent = (currentQuantity + 1).toString();
    const product = findItemBasketId(productID, variantID);
    console.log(product);
    if (product) {
      await apiChangeQuantity(product, currentQuantity + 1);
    }
  }
}
