import styles from '@pages/productPage/main/productInfo/productInfo.module.css';
import apiAddProductToBasket from '@api/apiAddProductToBasket.ts';
import store from '@redux/store/configureStore';
import createPopUp from '@components/popUp/popUp';

export default async function handlerBuyClick(event: Event) {
  const BUTTON_BASKET: HTMLButtonElement = document.querySelector(
    `.${styles.buyButton}`,
  )!;
  const QUANTITY_CONTAINER: HTMLElement = document.querySelector(
    `.${styles.quantityContainer}`,
  )!;
  BUTTON_BASKET.style.display = 'none';
  QUANTITY_CONTAINER.style.display = 'flex';
  const el = event.target;
  if (el instanceof HTMLButtonElement) {
    el.setAttribute('disabled', '');
    el.style.display = 'none';
    const [productId, variantId] = el.value.split(':');
    await apiAddProductToBasket(productId, Number(variantId));
    if (store.getState().basket.error) {
      el.removeAttribute('disabled');
      const POPUP = createPopUp(
        'Error',
        'Product cannot be added to cart',
        false,
      );
      document.body.append(POPUP);
      (POPUP as HTMLDialogElement).showModal();
    }
  }
  console.log(store.getState().basket.products);
}
