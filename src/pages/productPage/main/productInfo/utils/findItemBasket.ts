import store from '@redux/store/configureStore';

export default function findItemBasket(productID: string, variantID: string) {
  console.log(store.getState().basket.products);
  console.log(productID, variantID);
  const product = store
    .getState()
    .basket.products.find(
      (item) =>
        item.id === productID && item.variantId.toString() === variantID,
    );
  console.log(product);
  return product ? product.quantity : 0;
}
