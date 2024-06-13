import styles from '@pages/productPage/main/productInfo/productInfo.module.css';
import { ProductVariants } from '@/interface';
import router from '@router/router';
import findProductVariant from '@utils/findProductVariantByAttributes';

function logActiveAttributes(productData: ProductVariants) {
  const productId = productData.id;
  const activeLabels = document.querySelectorAll(`.${styles.attributeActive}`);
  const activeAttributes: { [key: string]: string } = {};

  activeLabels.forEach((label) => {
    const input = label.querySelector('input') as HTMLInputElement;
    if (input) {
      activeAttributes[input.name] = input.value;
    }
  });

  const currentVariant = findProductVariant(
    productData,
    activeAttributes.color,
    activeAttributes.size,
  );
  if (currentVariant) {
    const currentVariantID = currentVariant.id;
    const productPagePath = `/product/${productId}:${currentVariantID}`;
    router.goPage(productPagePath);
  }
}

export default function handleButtonClick(
  productData: ProductVariants,
  attributeName: string,
  label: HTMLElement,
) {
  const siblings = document.querySelectorAll(`input[name='${attributeName}']`);
  siblings.forEach((sibling) => {
    sibling.parentElement?.classList.remove(styles.attributeActive);
    sibling.parentElement?.classList.add(styles.attributeInactive);
  });

  label.classList.add(styles.attributeActive);
  label.classList.remove(styles.attributeInactive);
  logActiveAttributes(productData);
}
