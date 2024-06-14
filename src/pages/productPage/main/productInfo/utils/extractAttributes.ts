import { Attribute } from '@pages/productPage/main/productInfo/interfaces';
import { ProductVariants } from '@/interface';

export default function extractAttributes(productData: ProductVariants) {
  const uniqueAttributes = new Map<string, Attribute>();

  const masterAttributes = new Map<string, boolean>();

  productData.masterVariant.attributes?.forEach((attr) => {
    const key = `${attr.name}-${attr.value.key}`;
    if (attr.name !== 'brand') {
      uniqueAttributes.set(key, { ...attr, master: true });
      masterAttributes.set(key, true);
    }
  });

  productData.variants.forEach((variant) => {
    variant.attributes?.forEach((attr) => {
      const key = `${attr.name}-${attr.value.key}`;
      if (attr.name !== 'brand') {
        if (!uniqueAttributes.has(key)) {
          uniqueAttributes.set(key, {
            ...attr,
            master: masterAttributes.has(key),
          });
        } else if (masterAttributes.has(key)) {
          uniqueAttributes.get(key)!.master = true;
        }
      }
    });
  });

  return Array.from(uniqueAttributes.values());
}
