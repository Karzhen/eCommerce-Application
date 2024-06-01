import createElement from '@utils/create-element';
import { Tag } from '@/interface';
import styles from '@pages/productPage/productInfo/productInfo.module.css';

export default function createImageSlider(images: string[] | undefined) {
  let currentIndex = 0;

  const imageContainer = createElement(Tag.DIV, {
    className: styles.imageContainer,
  });

  if (!images || images.length === 0) {
    const noImageMessage = createElement(Tag.P, {
      textContent: 'No images available',
      className: styles.noImageMessage,
    });
    imageContainer.appendChild(noImageMessage);
    return imageContainer;
  }

  const mainImage = createElement(Tag.IMG, {
    className: styles.mainImage,
  }) as HTMLImageElement;
  mainImage.src = images[currentIndex];

  const imageSlider = createElement(Tag.DIV, {
    className: styles.imageSlider,
  });

  const thumbnails = images.map((image: string, index: number) => {
    const thumbnail = createElement(Tag.IMG, {
      className:
        index === currentIndex ? styles.activeThumbnail : styles.thumbnail,
      onclick: () => {
        currentIndex = index;
        mainImage.src = images[currentIndex];
        thumbnails.forEach(
          (thumbnailElement: HTMLImageElement, thumbnailIndex: number) => {
            thumbnailElement.classList.toggle(
              styles.activeThumbnail,
              thumbnailIndex === currentIndex,
            );
            thumbnailElement.classList.toggle(
              styles.thumbnail,
              thumbnailIndex !== currentIndex,
            );
          },
        );
      },
    }) as HTMLImageElement;
    thumbnail.src = image;
    return thumbnail;
  });

  imageSlider.append(...thumbnails);
  imageContainer.append(mainImage, imageSlider);

  return imageContainer;
}
