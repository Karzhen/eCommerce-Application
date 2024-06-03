import createElement from '@utils/create-element';
import { Tag } from '@/interface';

import {
  createImageContainer,
  createImageSliderContainer,
  createMainImage,
  createNextButton,
  createNoImageMessage,
  createPrevButton,
  createThumbnailsContainer,
} from '@pages/productPage/main/productInfo/creationFunctions/createImageSliderComponents';

import createModal from '@/pages/productPage/main/productInfo/imageModal/imageModal';
import addSwipeHandlers from '@/pages/productPage/main/productInfo/imageSlider/addSwipeHandlers';

import styles from '@pages/productPage/main/productInfo/productInfo.module.css';

function createNavigationButtons(
  prevImage: { (): void; (): void },
  nextImage: { (): void; (): void },
) {
  const prevButton = createPrevButton();
  const nextButton = createNextButton();

  prevButton.addEventListener('click', prevImage);
  nextButton.addEventListener('click', nextImage);

  return { prevButton, nextButton };
}

export default function createImageSlider(images: string[] | undefined) {
  let currentIndex = 0;
  let thumbnails: HTMLImageElement[] = [];

  function updateThumbnails() {
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
  }

  const imageContainer = createImageContainer();

  if (!images || images.length === 0) {
    const noImageMessage = createNoImageMessage();
    imageContainer.appendChild(noImageMessage);
    return imageContainer;
  }

  const mainWrapper = createElement(Tag.DIV, {
    className: styles.mainImageWrapper,
  });

  const mainImage = createMainImage(images[currentIndex]);
  mainImage.addEventListener('click', () => createModal(images, currentIndex));

  mainWrapper.appendChild(mainImage);

  function updateMainImage(index: number) {
    currentIndex = index;
    mainImage.style.opacity = '0';
    setTimeout(() => {
      if (images) {
        mainImage.src = images[currentIndex];
      }
      mainImage.style.opacity = '1';
    }, 300);
    updateThumbnails();
  }

  function prevImage() {
    if (currentIndex > 0) {
      updateMainImage(currentIndex - 1);
    } else {
      updateMainImage(images!.length - 1);
    }
  }

  function nextImage() {
    if (currentIndex < images!.length - 1) {
      updateMainImage(currentIndex + 1);
    } else {
      updateMainImage(0);
    }
  }
  const { prevButton, nextButton } = createNavigationButtons(
    prevImage,
    nextImage,
  );
  const imageSlider = createImageSliderContainer();
  const thumbnailsContainer = createThumbnailsContainer();

  thumbnails = images.map((image: string, index: number) => {
    const thumbnail = createElement(Tag.IMG, {
      className:
        index === currentIndex ? styles.activeThumbnail : styles.thumbnail,
      onclick: () => {
        updateMainImage(index);
      },
    }) as HTMLImageElement;
    thumbnail.src = image;
    thumbnail.draggable = false;
    return thumbnail;
  });

  imageSlider.append(...thumbnails);
  thumbnailsContainer.append(prevButton, nextButton);
  if (images.length > 1) {
    imageContainer.append(thumbnailsContainer, mainWrapper, imageSlider);
    addSwipeHandlers(imageContainer, nextImage, prevImage);
  } else {
    imageContainer.append(mainWrapper);
  }

  prevButton.addEventListener('click', prevImage);
  nextButton.addEventListener('click', nextImage);

  return imageContainer;
}
