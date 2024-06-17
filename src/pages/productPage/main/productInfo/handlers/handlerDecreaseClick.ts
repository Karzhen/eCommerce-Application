import styles from '@pages/productPage/main/productInfo/productInfo.module.css';
import apiChangeQuantity from '@api/apiChangeQuantity';
import findItemBasketId from '@pages/productPage/main/productInfo/utils/findItemBasketId';
import findItemBasket from '@pages/productPage/main/productInfo/utils/findItemBasket';
import handlerRemoveClick from '@pages/productPage/main/productInfo/handlers/handlerRemoveClick';

export default async function handlerDecreaseClick(
  event: Event,
  productID: string,
  variantID: string,
) {
  const QUANTITY_DISPLAY = (
    event.target as HTMLElement
  ).parentElement?.querySelector(`.${styles.quantityDisplay}`);
  if (QUANTITY_DISPLAY) {
    const currentQuantity = parseInt(QUANTITY_DISPLAY.textContent || '1', 10);
    if (currentQuantity > 1) {
      const product = findItemBasketId(productID, variantID);
      if (product) {
        document.getElementById('buttonDecrease')?.setAttribute('disabled', '');
        await apiChangeQuantity(product, currentQuantity - 1);
        document.getElementById('buttonDecrease')?.removeAttribute('disabled');
        const productCounter = findItemBasket(productID, variantID);
        QUANTITY_DISPLAY.textContent = productCounter.toString();
      }
    } else {
      await handlerRemoveClick(productID, variantID);
    }
  }
}
