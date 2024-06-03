import createElement from '@utils/create-element';
import { Tag } from '@/interface';

import styles from './imageModal.module.css';

export default function createModal(images: string[], currentIndex: number) {
  let currentIndexInModal = currentIndex;

  const modalOverlay = createElement(Tag.DIV, {
    className: styles.modalOverlay,
    onclick: (event) => {
      if (event.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    },
  });

  const modalContent = createElement(Tag.DIV, {
    className: styles.modalContent,
  });
  modalOverlay.appendChild(modalContent);

  const closeButton = createElement(Tag.BUTTON, {
    className: styles.closeButton,
    onclick: () => document.body.removeChild(modalOverlay),
  });
  closeButton.innerText = 'X';
  modalContent.appendChild(closeButton);

  const mainImage = createElement(Tag.IMG, {
    className: styles.image,
  }) as HTMLImageElement;
  mainImage.src = images[currentIndexInModal];

  modalContent.appendChild(mainImage);

  function updateModalImage(index: number) {
    currentIndexInModal = index;
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = images[currentIndexInModal];
      mainImage.style.opacity = '1';
    }, 300);
  }

  const prevButton = createElement(Tag.BUTTON, {
    className: styles.prevButton,
    onclick: () => {
      if (currentIndexInModal > 0) {
        updateModalImage(currentIndexInModal - 1);
      } else {
        updateModalImage(images.length - 1);
      }
    },
  });
  prevButton.innerText = '<';

  const nextButton = createElement(Tag.BUTTON, {
    className: styles.nextButton,
    onclick: () => {
      if (currentIndexInModal < images.length - 1) {
        updateModalImage(currentIndexInModal + 1);
      } else {
        updateModalImage(0);
      }
    },
  });
  nextButton.innerText = '>';

  modalContent.appendChild(prevButton);
  modalContent.appendChild(nextButton);

  document.body.appendChild(modalOverlay);
}
