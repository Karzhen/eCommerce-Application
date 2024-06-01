import createElement from '@utils/create-element';
import { Tag } from '@/interface';
import styles from '@pages/productPage/productInfo/productInfo.module.css';
import createImageSlider from '@pages/productPage/productInfo/createImageSlider';
import { Attribute } from '@pages/productPage/productInfo/interfaces';
import { ProductData, ProductVariant } from '@commercetools/platform-sdk';
import createAttributeButtons from '@pages/productPage/productInfo/createAttributeButtons';
import createPriceElements from '@pages/productPage/productInfo/createPriceElements';

function extractAttributes(productData: ProductData) {
  const uniqueAttributes = new Map<string, Attribute>();

  [productData.masterVariant, ...productData.variants].forEach(
    (variant: ProductVariant) => {
      variant.attributes?.forEach((attr) => {
        const key = `${attr.name}-${attr.value.key}`;
        if (!uniqueAttributes.has(key)) {
          uniqueAttributes.set(key, attr);
        }
      });
    },
  );

  return Array.from(uniqueAttributes.values());
}

export default function createProductInfo(
  productData: ProductData,
  variant?: ProductVariant,
) {
  const currentVariant = variant || productData.masterVariant;
  // console.log(currentVariant)
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
  brandImage.src = `/src/assets/images/brands/${brandName}.svg`;
  brandImage.alt = `Brand: ${brandName}`;

  productNameLogo.append(productName, brandImage);
  rightContainer.append(productNameLogo);

  const productDescription = createElement(Tag.P, {
    className: styles.productDescription,
    textContent: productData.description?.en || 'Description not available',
  });
  rightContainer.append(productDescription);

  const attributes = extractAttributes(productData);
  const attributeButtons = createAttributeButtons(attributes);
  rightContainer.append(attributeButtons);

  const priceElements = createPriceElements(currentVariant);
  priceElements.forEach((element) => rightContainer.appendChild(element));

  const buyButton = createElement(Tag.BUTTON, {
    textContent: 'Add to Cart',
    className: styles.buyButton,
    onclick: () => {
      // Логика покупки
    },
  });
  rightContainer.append(buyButton);

  contentContainer.append(leftContainer, rightContainer);
  productInfoContainer.append(contentContainer);

  return productInfoContainer;
}
