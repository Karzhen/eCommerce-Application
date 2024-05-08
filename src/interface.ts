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
  FORM = 'form',
  LINK = 'a',
  NAV = 'nav',
  BUTTON = 'button',
  INPUT = 'input',
  LABEL = 'label',
  H1 = 'h1',
  FOOTER = 'footer',
  HEADER = 'header',
  MAIN = 'main',
  IMG = 'img',
  DIALOG = 'dialog',
}

export enum TypeInput {
  TEXT = 'text',
  SUBMIT = 'submit',
  CHECKBOX = 'checkbox',
  PASS = 'password',
}

export enum TypeButton {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GREEN = 'green',
  TRANSPARENT = 'transparent',
}

export enum TypeLink {
  LINK = 'link',
  LINK_ICO = 'link-ico',
}

export type TypeHandler = {
  handlerClick?: HandlerComponent;
  handlerInput?: HandlerComponent;
  handlerClickIcon?: HandlerComponent;
};

export type HandlerComponent = (event: Event) => void;

export interface ParametersBaseComponent {
  type?: TypeInput | TypeButton;
  iconUrl?: string;
  option: Partial<HTMLElement>;
  handler: TypeHandler;
}

export type StateLogin = {
  value: string | null;
  isLogin: boolean;
};
