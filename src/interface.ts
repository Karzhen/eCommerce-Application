export enum Page {
  LOGIN = 'login',
  ERROR = 'error',
  REGISTR = 'registration',
}

export enum Tag {
  DIV = 'div',
  FORM = 'form',
  LINK = 'a',
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

export type TypeHandler = {
  'handlerClick'?: HandlerComponent;
  'handlerInput'?: HandlerComponent;
};

export type HandlerComponent = (event: Event) => void;

export interface ParametersBaseComponent {
  type?: TypeInput | TypeButton;
  option: Partial<HTMLElement>;
  handler: TypeHandler;
}
