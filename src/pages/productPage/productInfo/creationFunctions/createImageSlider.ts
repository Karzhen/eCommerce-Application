import createElement from '@utils/create-element.ts';
import { Tag } from '@/interface';
import styles from '@pages/productPage/productInfo/productInfo.module.css';

export default function createImageSlider(images: string[] | undefined) {
  let currentIndex = 0;

  let thumbnails: HTMLImageElement[] = [];

  function updateThumbnails() {
    thumbnails.forEach((thumbnailElement: HTMLImageElement, thumbnailIndex: number) => {
      thumbnailElement.classList.toggle(
          styles.activeThumbnail,
          thumbnailIndex === currentIndex,
      );
      thumbnailElement.classList.toggle(
          styles.thumbnail,
          thumbnailIndex !== currentIndex,
      );
    });
  };

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

  const updateMainImage = (index: number) => {
    currentIndex = index;
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = images[currentIndex];
      mainImage.style.opacity = '1';
    }, 300);
    updateThumbnails();
  };

  const prevButton = createElement(Tag.BUTTON, {
    className: styles.navigationButton,
    innerText: 'Prev',
    onclick: () => {
      if (currentIndex > 0) {
        updateMainImage(currentIndex - 1);
      } else {
        updateMainImage(images.length - 1);
      }
    },
  });

  const nextButton = createElement(Tag.BUTTON, {
    className: styles.navigationButton,
    innerText: 'Next',
    onclick: () => {
      if (currentIndex < images.length - 1) {
        updateMainImage(currentIndex + 1);
      } else {
        updateMainImage(0);
      }
    },
  });

  const imageSlider = createElement(Tag.DIV, {
    className: styles.imageSlider,
  });

  const thumbnailsContainer = createElement(Tag.DIV, {
    className: styles.thumbnailsContainer,
  });

  thumbnails = images.map((image: string, index: number) => {
    const thumbnail = createElement(Tag.IMG, {
      className: index === currentIndex ? styles.activeThumbnail : styles.thumbnail,
      onclick: () => {
        updateMainImage(index);
      },
    }) as HTMLImageElement;
    thumbnail.src = image;
    return thumbnail;
  });

  imageSlider.append(...thumbnails);
  thumbnailsContainer.append(prevButton, nextButton);
  imageContainer.append(thumbnailsContainer, mainImage, imageSlider);

  return imageContainer;
}
