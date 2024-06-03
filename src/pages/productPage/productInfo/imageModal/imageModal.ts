import createElement from '@utils/create-element';
import {Tag} from '@/interface';
import styles from '@pages/productPage/productInfo/imageModal/imageModal.module.css';

export default function createModal(images: string[], currentIndex: number) {
    const modalOverlay = createElement(Tag.DIV, {
        className: styles.modalOverlay,
        onclick: (event) => {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        },
    });

    const modalContent = createElement(Tag.DIV, { className: styles.modalContent });
    modalOverlay.appendChild(modalContent);

    const closeButton = createElement(Tag.BUTTON, {
        className: styles.closeButton,
        onclick: () => document.body.removeChild(modalOverlay),
    });
    closeButton.innerText = 'X';
    modalContent.appendChild(closeButton);

    const swiperContainer = createElement(Tag.DIV, { className: styles.swiperContainer });
    const swiperWrapper = createElement(Tag.DIV, { className: styles.swiperWrapper });

    images.forEach((image, index) => {
        const swiperSlide = createElement(Tag.DIV, {
            className: styles.swiperSlide,
        }) as HTMLDivElement;
        swiperSlide.style.display = index === currentIndex ? 'block' : 'none';
        const img = createElement(Tag.IMG, { className: styles.image }) as  HTMLImageElement;
        img.src = image;
        swiperSlide.appendChild(img);
        swiperWrapper.appendChild(swiperSlide);
    });

    swiperContainer.appendChild(swiperWrapper);
    modalContent.appendChild(swiperContainer);

    document.body.appendChild(modalOverlay);
}
