import createElement from '@utils/create-element';
import createButton from '@baseComponents/button/button';
import { ProductVariants, Tag, TypeButton } from '@/interface';

import createImageSlider from '@/pages/productPage/main/productInfo/imageSlider/createImageSlider';

import { Attribute, ProductVariant } from '@commercetools/platform-sdk';
import createAttributeButtons from '@/pages/productPage/main/productInfo/creationFunctions/createAttributeButtons';
import createPriceElements from '@/pages/productPage/main/productInfo/creationFunctions/createPriceElements';

import store from '@redux/store/configureStore';

import handlerBuyClick from './handlers/handlerBuyClick';
import handlerDecreaseClick from './handlers/handlerDecreaseClick';
import handlerIncreaseClick from './handlers/handlerIncreaseClick';
import findItemBasketId from './utils/findItemBasketId';
import findItemBasket from './utils/findItemBasket';
import extractAttributes from './utils/extractAttributes';

import styles from './productInfo.module.css';

export default function createProductInfo(
  productID: string,
  variantID: string,
) {
  const productData: ProductVariants = store.getState().product.value;
  const currentVariant: ProductVariant =
    productData.variants?.find(
      (variant) => variant.id.toString() === variantID,
    ) || productData.masterVariant;
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
    textContent: <string>(<unknown>productData.name),
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
    textContent:
      <string>(<unknown>productData.description) || 'Description not available',
  });
  rightContainer.append(productDescription);

  const allAttributes: Attribute[] = extractAttributes(productData);

  const attributeButtons = createAttributeButtons(
    productData,
    allAttributes,
    currentVariant,
  );
  rightContainer.append(attributeButtons);

  const priceElements = createPriceElements(currentVariant);
  priceElements.forEach((element) => rightContainer.appendChild(element));

  const BUTTON_CONTAINER = createElement(Tag.DIV, {
    className: styles.buttonContainer,
  });

  // Создание кнопки "Добавить в корзину"
  const BUTTON_BASKET = createButton({
    type: TypeButton.PRIMARY,
    option: { textContent: 'Add to Cart', className: styles.buyButton },
    handler: {
      handlerClick: (event: Event) =>
        handlerBuyClick(event, productID, variantID),
    },
  });
  // BUTTON_BASKET.setAttribute('value', `${productID}:${variantID}`);

  // console.log(store.getState().basket.products)

  // Проверка, добавлен ли товар в корзину
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
  BUTTON_CONTAINER.append(BUTTON_BASKET);

  // Создание контейнера для управления количеством товара
  const QUANTITY_CONTAINER = createElement(Tag.DIV, {
    className: styles.quantityContainer,
  });

  // Создание кнопки "-" для уменьшения количества
  const BUTTON_DECREASE = createButton({
    type: TypeButton.SECONDARY,
    option: { textContent: '-', className: styles.quantityButton },
    handler: {
      handlerClick: (event: Event) =>
        handlerDecreaseClick(event, productID, variantID),
    },
  });

  // Создание текстового поля для отображения количества
  const QUANTITY_DISPLAY = createElement(Tag.SPAN, {
    className: styles.quantityDisplay,
    textContent: findItemBasket(productID, variantID).toString(), // Начальное значение количества
  });

  // Создание кнопки "+" для увеличения количества
  const BUTTON_INCREASE = createButton({
    type: TypeButton.SECONDARY,
    option: { textContent: '+', className: styles.quantityButton },
    handler: {
      handlerClick: (event: Event) =>
        handlerIncreaseClick(event, productID, variantID),
    },
  });

  // Добавление элементов в контейнер для управления количеством
  QUANTITY_CONTAINER.append(BUTTON_DECREASE, QUANTITY_DISPLAY, BUTTON_INCREASE);

  // Добавление контейнера для количества и кнопки "Добавить в корзину" в общий контейнер
  BUTTON_CONTAINER.append(QUANTITY_CONTAINER, BUTTON_BASKET);

  const product = findItemBasketId(productID, variantID);
  if (product) {
    BUTTON_BASKET.style.display = 'none';
    QUANTITY_CONTAINER.style.display = 'flex';
  } else {
    BUTTON_BASKET.style.display = 'block';
    QUANTITY_CONTAINER.style.display = 'none';
  }

  rightContainer.append(BUTTON_CONTAINER);

  contentContainer.append(leftContainer, rightContainer);
  productInfoContainer.append(contentContainer);

  return productInfoContainer;
}
