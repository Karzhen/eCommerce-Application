import styles from '@pages/productPage/main/productInfo/productInfo.module.css';
import apiChangeQuantity from '@api/apiChangeQuantity';
import findItemBasketId from '@pages/productPage/main/productInfo/utils/findItemBasketId';
import findItemBasket from '@pages/productPage/main/productInfo/utils/findItemBasket';

export default async function handlerIncreaseClick(
  event: Event,
  productID: string,
  variantID: string,
) {
  const QUANTITY_DISPLAY = (
    event.target as HTMLElement
  ).parentElement?.querySelector(`.${styles.quantityDisplay}`);
  if (QUANTITY_DISPLAY) {
    const currentQuantity = parseInt(QUANTITY_DISPLAY.textContent || '1', 10);
    const product = findItemBasketId(productID, variantID);
    if (product) {
      document.getElementById('buttonIncrease')?.setAttribute('disabled', '');
      await apiChangeQuantity(product, currentQuantity + 1);
      document.getElementById('buttonIncrease')?.removeAttribute('disabled');
      const productCounter = findItemBasket(productID, variantID);
      QUANTITY_DISPLAY.textContent = productCounter.toString();
    }
  }
}
