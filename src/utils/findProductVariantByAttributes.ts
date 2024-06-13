import { ProductVariants } from '@/interface';

export default function findProductVariant(
  productData: ProductVariants,
  color: string,
  size: string,
) {
  const variants = [productData.masterVariant, ...productData.variants];

  return variants.find((variant) => {
    const colorAttribute = variant.attributes?.find(
      (attr) => attr.name === 'color',
    );
    const sizeAttribute = variant.attributes?.find(
      (attr) => attr.name === 'size',
    );

    return (
      colorAttribute &&
      sizeAttribute &&
      colorAttribute.value.key === color &&
      sizeAttribute.value.key === size
    );
  });
}
