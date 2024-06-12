import {ProductData} from "@commercetools/platform-sdk";
import styles from "@pages/productPage/main/productInfo/productInfo.module.css";
import store from '@redux/store/configureStore';

function findProductVariant(
    productData: ProductData,
    color: string,
    size: string,
) {
    const variants = [productData.masterVariant, ...productData.variants];
    // console.clear();
    // console.log(variants);

    return variants.find((variant) => {
        const colorAttribute = variant.attributes?.find(
            (attr) => attr.name === 'color',
        );
        const sizeAttribute = variant.attributes?.find(
            (attr) => attr.name === 'size',
        );

        return (
            colorAttribute &&
            sizeAttribute &&
            colorAttribute.value.key === color &&
            sizeAttribute.value.key === size
        );
    });
}

function logActiveAttributes(productData: ProductData, productID: string) {
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
    const buyButton = document.querySelector(
        `.${styles['buy-button']}`,
    ) as HTMLButtonElement;
    if (currentVariant) {
        const currentVariantID = currentVariant.id;
        console.log(currentVariantID);

        const isProductInBasket = store.getState().basket.products.some(
            (pr) => pr.id === productID && pr.variantId === currentVariantID,
        );

        buyButton.disabled = isProductInBasket;
    } else {
        buyButton.disabled = true;
    }
}

export default function handleButtonClick(
    productData: ProductData,
    attributeName: string,
    label: HTMLElement,
    productID: string,
) {
    const siblings = document.querySelectorAll(`input[name='${attributeName}']`);
    siblings.forEach((sibling) => {
        sibling.parentElement?.classList.remove(styles.attributeActive);
        sibling.parentElement?.classList.add(styles.attributeInactive);
    });

    label.classList.add(styles.attributeActive);
    label.classList.remove(styles.attributeInactive);

    logActiveAttributes(productData, productID);
}