import createElement from '@utils/create-element';
import {Tag} from '@/interface';
import styles from '@pages/basketPage/main/products/products.module.css';

export default function createEmptyPlug(PRODUCTS_BLOCK: HTMLElement) {
    const emptyText = createElement(Tag.H1, {
        className: styles.emptyCart,
        textContent: 'The Cart is empty',
    });
    PRODUCTS_BLOCK.append(emptyText);
    PRODUCTS_BLOCK.classList.add(styles.productsEmpty);
}