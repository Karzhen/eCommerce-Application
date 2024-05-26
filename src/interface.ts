export enum Page {
  LOGIN = 'login',
  ERROR = 'error',
  REGISTR = 'registration',
  MAIN = 'main',
  ABOUT = 'about',
  BASKET = 'basket',
  CATALOG = 'catalog',
  PROFILE = 'profile',
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
  user: Customer | null;
};

export type StateRegister = {
  value: string | null;
  isRegister: boolean;
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
}

export interface AddressData {
  streetNumber: string | undefined;
  streetName: string | undefined;
  postalCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
}
