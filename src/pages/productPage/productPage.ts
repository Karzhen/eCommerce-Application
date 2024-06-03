import createElement from '@utils/create-element';
import createHeader from '@components/header/header';

import { Tag, Page } from '@/interface';

import apiGetEachProduct from '@api/apiGetProduct';
import createProductInfo from '@pages/productPage/productInfo/productInfo';
import styles from './productPage.module.css';

export default function createProductPage(
  goPage: (page: Page, id?: string) => void,
  productId: string,
) {
  const PRODUCT_PAGE = createElement(Tag.DIV, {
    id: 'productPage',
    className: styles.productPage,
    // textContent: productId,
  });

  PRODUCT_PAGE.append(createHeader(goPage));

  (async () => {
    try {
      const productData = await apiGetEachProduct(productId);

      if (productData) {
        const productInfo = createProductInfo(productData);
        PRODUCT_PAGE.append(productInfo);
      } else {
        // Обработка случая, если данные не были получены
        const errorMessage = createElement(Tag.DIV, {
          className: styles.error,
          textContent: 'Не удалось загрузить данные о продукте.',
        });
        PRODUCT_PAGE.append(errorMessage);
      }
    } catch (error) {
      // console.error('Error fetching product data:', error);
      const errorMessage = createElement(Tag.DIV, {
        className: styles.error,
        textContent: 'Произошла ошибка при загрузке данных о продукте.',
      });
      PRODUCT_PAGE.append(errorMessage);
    }
  })();

  return PRODUCT_PAGE;
}
