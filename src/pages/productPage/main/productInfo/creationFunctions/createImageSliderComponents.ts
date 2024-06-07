import createElement from '@utils/create-element.ts';
import { Tag } from '@/interface';
import styles from '@pages/productPage/main/productInfo/productInfo.module.css';

export function createImageContainer() {
  return createElement(Tag.DIV, {
    className: styles.imageContainer,
  });
}

export function createNoImageMessage() {
  return createElement(Tag.P, {
    textContent: 'No images available',
    className: styles.noImageMessage,
  });
}

export function createMainImage(src: string) {
  const mainImage = createElement(Tag.IMG, {
    className: styles.mainImage,
  }) as HTMLImageElement;
  mainImage.src = src;
  mainImage.draggable = false;
  return mainImage;
}

export function createPrevButton() {
  return createElement(Tag.BUTTON, {
    className: styles.navigationButton,
    innerText: 'Prev',
  });
}

export function createNextButton() {
  return createElement(Tag.BUTTON, {
    className: styles.navigationButton,
    innerText: 'Next',
  });
}

export function createImageSliderContainer() {
  return createElement(Tag.DIV, {
    className: styles.imageSlider,
  });
}

export function createThumbnailsContainer() {
  return createElement(Tag.DIV, {
    className: styles.thumbnailsContainer,
  });
}
