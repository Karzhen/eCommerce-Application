import createElement from '@utils/create-element';
import createButton from '@baseComponents/button/button';
import { Tag, TypeButton } from '@/interface';

import createImageSlider from '@/pages/productPage/main/productInfo/imageSlider/createImageSlider';
import { Attribute } from '@/pages/productPage/main/productInfo/interfaces';

import { ProductData, ProductVariant } from '@commercetools/platform-sdk';
import createAttributeButtons from '@/pages/productPage/main/productInfo/creationFunctions/createAttributeButtons';
import createPriceElements from '@/pages/productPage/main/productInfo/creationFunctions/createPriceElements';

import store from '@redux/store/configureStore';
import apiAddProductToBasket from '@api/apiAddProductToBasket.ts';
import createPopUp from '@components/popUp/popUp';
import styles from './productInfo.module.css';

async function handlerBuyClick(event: Event) {
  const el = event.target;
  if (el instanceof HTMLButtonElement) {
    el.setAttribute('disabled', '');
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
}

function extractAttributes(productData: ProductData) {
  const uniqueAttributes = new Map<string, Attribute>();

  const masterAttributes = new Map<string, boolean>();

  productData.masterVariant.attributes?.forEach((attr) => {
    const key = `${attr.name}-${attr.value.key}`;
    if (attr.name !== 'brand') {
      uniqueAttributes.set(key, { ...attr, master: true });
      masterAttributes.set(key, true);
    }
  });

  productData.variants.forEach((variant) => {
    variant.attributes?.forEach((attr) => {
      const key = `${attr.name}-${attr.value.key}`;
      if (attr.name !== 'brand') {
        if (!uniqueAttributes.has(key)) {
          uniqueAttributes.set(key, {
            ...attr,
            master: masterAttributes.has(key),
          });
        } else if (masterAttributes.has(key)) {
          uniqueAttributes.get(key)!.master = true;
        }
      }
    });
  });

  return Array.from(uniqueAttributes.values());
}

export default function createProductInfo(
  productData: ProductData,
  productID: string,
  variantID: string,
  // variant?: ProductVariant,
) {
  // console.log(productID);
  // console.log(variantID);
  const currentVariant: ProductVariant =
    productData.variants.find(
      (variant) => variant.id.toString() === variantID,
    ) || productData.masterVariant;
  // console.log(currentVariant);
  // console.log(productData);
  const productInfoContainer = createElement(Tag.DIV, {
    className: styles.productInfo,
  });

  const contentContainer = createElement(Tag.DIV, {
    className: styles.contentContainer,
  });

  const leftContainer = createElement(Tag.DIV, {
    className: styles.leftContainer,
  });

  const rightContainer = createElement(Tag.DIV, {
    className: styles.rightContainer,
  });

  const images = currentVariant.images?.map(
    (image: { url: string }) => image.url,
  );

  const imageSlider = createImageSlider(images);
  leftContainer.append(imageSlider);

  const productNameLogo = createElement(Tag.DIV, {
    className: styles.productNameLogo,
  });

  const productName = createElement(Tag.H1, {
    className: styles.productName,
    textContent: productData.name.en,
  });

  const brandName = currentVariant.attributes?.find(
    (attr) => attr.name === 'brand',
  )?.value.label;
  const brandImage: HTMLImageElement = createElement(Tag.IMG, {
    className: styles.productLogo,
  }) as HTMLImageElement;
  brandImage.src = `/brands/${brandName.toLowerCase()}.svg`;
  brandImage.alt = `Brand: ${brandName}`;
  brandImage.draggable = false;

  productNameLogo.append(productName, brandImage);
  rightContainer.append(productNameLogo);

  const productDescription = createElement(Tag.P, {
    className: styles.productDescription,
    textContent: productData.description?.en || 'Description not available',
  });
  rightContainer.append(productDescription);

  const allAttributes = extractAttributes(productData);

  const attributeButtons = createAttributeButtons(
    productData,
    allAttributes,
    currentVariant,
  );
  rightContainer.append(attributeButtons);

  const priceElements = createPriceElements(currentVariant);
  priceElements.forEach((element) => rightContainer.appendChild(element));

  const BUTTON_BASKET = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Add to Cart', className: styles.buyButton },
    handler: { handlerClick: (event: Event) => handlerBuyClick(event) },
  });
  BUTTON_BASKET.setAttribute('value', `${productID}:${variantID}`);

  if (
    store.getState().basket.products &&
    store
      .getState()
      .basket.products.some(
        (pr) => pr.id === productID && pr.variantId.toString() === variantID,
      )
  ) {
    BUTTON_BASKET.setAttribute('disabled', '');
  }

  // const buyButton = createButton({
  //   type: TypeButton.PRIMARY,
  //   option: {
  //     textContent: 'Add to Cart',
  //     className: styles.buyButton,
  //   },
  //   handler: {},
  // });
  rightContainer.append(BUTTON_BASKET);

  contentContainer.append(leftContainer, rightContainer);
  productInfoContainer.append(contentContainer);

  return productInfoContainer;
}
