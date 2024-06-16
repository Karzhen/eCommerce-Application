import createElement from '@utils/create-element';
import { Tag, TypeButton } from '@/interface';
import styles from '@pages/basketPage/main/products/products.module.css';
import router from '@router/router';
import createButtonWithIcon from '@baseComponents/buttonWithIcon/buttonWithIcon';
import iconCatalog from '@assets/images/align-justify.png';

export default function createEmptyPlug(PRODUCTS_BLOCK: HTMLElement) {
  const emptyText = createElement(Tag.H1, {
    className: styles.emptyCart,
    textContent: 'The Cart is empty',
  });
  PRODUCTS_BLOCK.append(emptyText);
  PRODUCTS_BLOCK.classList.add(styles.productsEmpty);
  const BUTTON_CATALOG = createButtonWithIcon({
    type: TypeButton.SECONDARY,
    option: { textContent: 'Catalog', className: styles.buttonCatalog },
    iconUrl: iconCatalog,
    handler: {
      handlerClick: () => {
        const productPagePath = '/catalog';
        router.goPage(productPagePath);
      },
    },
  });
  PRODUCTS_BLOCK.append(BUTTON_CATALOG);
}
