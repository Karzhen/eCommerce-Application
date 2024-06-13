import store from '@redux/store/configureStore';

export default function findItemBasketId(productID: string, variantID: string) {
  const product = store
    .getState()
    .basket.products.find(
      (item) =>
        item.id === productID && item.variantId.toString() === variantID,
    );
  return product ? product.itemBasketId : null;
}
