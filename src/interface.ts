import { ProductData } from '@commercetools/platform-sdk';

export enum Page {
  LOGIN = '/login',
  ERROR = '/error',
  REGISTR = '/registration',
  MAIN = '/main',
  ABOUT = '/about',
  BASKET = '/basket',
  CATALOG = '/catalog',
  PROFILE = '/profile',
  PRODUCT = '/product',
}

export enum Tag {
  DIV = 'div',
  P = 'p',
  FORM = 'form',
  LINK = 'a',
  NAV = 'nav',
  BUTTON = 'button',
  INPUT = 'input',
  SELECT = 'select',
  OPTION = 'option',
  LABEL = 'label',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  FOOTER = 'footer',
  HEADER = 'header',
  MAIN = 'main',
  IMG = 'img',
  DIALOG = 'dialog',
  SPAN = 'span',
  FIELDSET = 'fieldset',
  LEGEND = 'legend',
  UL = 'ul',
  LI = 'li',
}

export enum TypeInput {
  DATE = 'date',
  TEXT = 'text',
  SUBMIT = 'submit',
  CHECKBOX = 'checkbox',
  PASS = 'password',
}

export enum TypeButton {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TRANSPARENT = 'transparent',
}

export enum TypeLink {
  LINK = 'link',
  LINK_ICO = 'link-ico',
}

export type TypeHandler = {
  handlerClick?: HandlerComponent;
  handlerInput?: HandlerComponent;
  handlerChange?: HandlerComponent;
  handlerClickIcon?: HandlerComponent;
  handlerKeyClick?: HandlerComponent;
};

export type HandlerComponent = (event: Event) => void;

interface CheckboxOption extends Partial<HTMLInputElement> {
  checked?: boolean;
}

export interface ParametersBaseComponent {
  type?: TypeInput | TypeButton;
  iconUrl?: string;
  option: Partial<HTMLElement> | CheckboxOption;
  handler: TypeHandler;
}

export type StateLogin = {
  value: string | null;
  isLogin: boolean;
  user?: Customer | null;
  version?: number | null;
  errorUpdate?: string | null;
  errorChangePassword?: string | null;
};

export type StateRegister = {
  value: string | null;
  isRegister: boolean;
};

export interface ProductM {
  id: string;
  name: string;
  price: number;
  discount: number | null;
  img: string[];
  description: string;
  variantId: number;
}

export type StateProducts = {
  value: ProductM[];
  error: string;
};

export type StateProduct = {
  value: ProductData;
  error: string;
};

export interface CategoryM {
  id: string;
  name: string;
  parent: string | null;
}

export interface AttributeM {
  name: string;
  label: string;
  value: { key: string; label: string }[];
}

export type StateParameters = {
  categories: CategoryM[];
  attributes: { [id: string]: AttributeM };
  error: string;
};

export enum LoginError {
  ERROR_EMAIL = 'This user does not exist',
  ERROR_PASSWORD = 'Wrong data',
}

export interface Customer {
  id: string;
  dateOfBirth: string | undefined;
  defaultBillingAddressId: string | undefined;
  defaultShippingAddressId: string | undefined;
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
  password: string | undefined;
  authenticationMode: string;
  billingAddressIds: string[] | undefined;
  shippingAddressIds: string[] | undefined;
  addresses: AddressData[];
  version: number;
}

export interface AddressData {
  streetName: string | undefined;
  postalCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
}

export interface AddressGet {
  id: string;
  streetName: string | undefined;
  postalCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
}

export enum CurrencyCode {
  RU = 'RUB',
  EN = 'USD',
  DE = 'EUR',
}

export enum Language {
  RU = 'ru',
  EN = 'en',
  DE = 'de',
}

export type StateLocal = {
  language: Language;
  currencyCode: CurrencyCode;
};

export interface Filter {
  category?: string[];
  priceStart?: number;
  priceEnd?: number;
  brand?: string;
  color?: string;
  size?: { size1?: string; size2?: string; size3?: string };
  sort?: { name: string; order: string };
  search?: string;
}
