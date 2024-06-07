export interface Price {
  id: string;
  value: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
    type: string;
  };
}

export interface Image {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

export interface Attribute {
  name: string;
  value: {
    key: string;
    label: string;
  };
  master?: boolean;
}

export interface Variant {
  id: number;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: [];
}

export interface Product {
  masterVariant: Variant;
  variants: Variant[];
}
