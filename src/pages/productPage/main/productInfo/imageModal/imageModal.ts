import createElement from '@utils/create-element';
import createButton from '@baseComponents/button/button';
import { Tag, TypeButton } from '@/interface';

import addSwipeHandlers from '@pages/productPage/main/productInfo/imageSlider/addSwipeHandlers';
import styles from './imageModal.module.css';

export default function createModal(images: string[], startIndex: number) {
  let currentSlideIndex = startIndex;

  const modalContent = createElement(Tag.DIALOG, {
    className: styles.modalContent,
  });

  modalContent.addEventListener('keydown', (event: Event) => {
    if (event instanceof KeyboardEvent && event.code === 'Escape') {
      event.stopPropagation();
      modalContent.remove();
    }
  });

  const closeButton = createButton({
    type: TypeButton.PRIMARY,
    option: {
      className: styles.closeButton,
      textContent: 'X',
    },
    handler: {
      handlerClick: () => {
        modalContent.remove();
      },
    },
  });
  modalContent.appendChild(closeButton);

  const mainWrapper = createElement(Tag.DIV, {
    className: styles.mainImageWrapper,
  });

  const mainImage = createElement(Tag.IMG, {
    className: styles.mainImage,
  }) as HTMLImageElement;
  mainImage.src = images[currentSlideIndex];
  mainImage.draggable = false;

  mainWrapper.appendChild(mainImage);
  modalContent.appendChild(mainWrapper);

  function updateMainImage(index: number) {
    currentSlideIndex = index;
    mainImage.style.opacity = '0';
    setTimeout(() => {
      if (images) {
        mainImage.src = images[currentSlideIndex];
      }
      mainImage.style.opacity = '1';
    }, 300);
  }

  function prevImage() {
    if (currentSlideIndex > 0) {
      updateMainImage(currentSlideIndex - 1);
    } else {
      updateMainImage(images.length - 1);
    }
  }

  function nextImage() {
    if (currentSlideIndex < images.length - 1) {
      updateMainImage(currentSlideIndex + 1);
    } else {
      updateMainImage(0);
    }
  }

  const buttonsContainer = createElement(Tag.DIV, {
    className: styles.buttonsContainer,
  });

  const prevButton = createButton({
    type: TypeButton.SECONDARY,
    option: {
      className: styles.navButton,
      textContent: '<',
    },
    handler: {
      handlerClick: () => {
        prevImage();
      },
    },
  });

  const nextButton = createButton({
    type: TypeButton.SECONDARY,
    option: {
      className: styles.navButton,
      textContent: '>',
    },
    handler: {
      handlerClick: () => {
        nextImage();
      },
    },
  });

  buttonsContainer.appendChild(prevButton);
  buttonsContainer.appendChild(nextButton);
  modalContent.append(buttonsContainer);
  addSwipeHandlers(modalContent, nextImage, prevImage);

  document.body.append(modalContent);
  (modalContent as HTMLDialogElement).showModal();
}
