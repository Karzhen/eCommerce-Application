import {ProductData, ProductVariant} from "@commercetools/platform-sdk";
import {Attribute} from "@pages/productPage/main/productInfo/interfaces";
import createElement from "@utils/create-element.ts";
import {Tag} from "@/interface";
import styles from "@pages/productPage/main/productInfo/productInfo.module.css";
import createButtons from "@pages/productPage/main/productInfo/creationFunctions/createButtons";

export default function createFieldset(productData: ProductData, attributes: Attribute[], legendText: string, currentVariant: ProductVariant, productID: string,) {
    const fieldset = createElement(Tag.FIELDSET, {
        className: styles.attributeFieldset,
    });

    const legend = createElement(Tag.LEGEND, {
        className: styles.attributeLegend,
        textContent: legendText,
    });

    fieldset.append(legend);

    attributes.forEach((attr) => {
        fieldset.append(createButtons(productData, attr, currentVariant, productID));
    });
    // console.clear();
    // console.log(productData);

    return fieldset;
}
