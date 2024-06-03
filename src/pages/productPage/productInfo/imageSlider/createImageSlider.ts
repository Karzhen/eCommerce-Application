import createElement from '@utils/create-element';
import { Tag } from '@/interface';
import styles from '@pages/productPage/productInfo/productInfo.module.css';
import {
  createImageContainer,
  createImageSliderContainer,
  createMainImage,
  createNextButton,
  createNoImageMessage,
  createPrevButton,
  createThumbnailsContainer,
} from '@pages/productPage/productInfo/creationFunctions/createImageSliderComponents';
import addSwipeHandlers from '@pages/productPage/productInfo/imageSlider/addSwipeHandlers';

function createNavigationButtons(
  nextImage: { (): void; (): void },
  prevImage: { (): void; (): void },
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

  const mainImage = createMainImage(images[currentIndex]);

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
  imageContainer.append(thumbnailsContainer, mainImage, imageSlider);

  addSwipeHandlers(imageContainer, nextImage, prevImage);

  prevButton.addEventListener('click', prevImage);
  nextButton.addEventListener('click', nextImage);

  return imageContainer;
}
