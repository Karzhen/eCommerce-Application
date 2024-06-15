import findItemBasketId from '@pages/productPage/main/productInfo/utils/findItemBasketId';
import apiDeleteProductFromBasket from '@api/apiDeleteProductFromBasket';
import styles from '@pages/productPage/main/productInfo/productInfo.module.css';

export default async function handlerRemoveClick(
  productID: string,
  variantID: string,
) {
  const BUTTON_BASKET: HTMLButtonElement = document.querySelector(
    `.${styles.buyButton}`,
  )!;
  const QUANTITY_CONTAINER: HTMLElement = document.querySelector(
    `.${styles.quantityContainer}`,
  )!;
  const product = findItemBasketId(productID, variantID)!;
  await apiDeleteProductFromBasket(product);
  if (!findItemBasketId(productID, variantID)) {
    BUTTON_BASKET.style.display = 'block';
    BUTTON_BASKET.removeAttribute('disabled');
    QUANTITY_CONTAINER.style.display = 'none';
  }
}
