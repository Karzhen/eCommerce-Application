import store from '@redux/store/configureStore';

import { Language } from '@/interface';

import { type Category } from '@commercetools/platform-sdk';

function grabName(element: Category, language: string) {
  if (element.name) {
    switch (language) {
      case Language.EN:
        return String(element.name.en);
      case Language.DE:
        return String(element.name.de);
      case Language.RU:
        return String(element.name.ru);
      default:
        break;
    }
  }
  return '';
}

function grabParent(element: Category) {
  if (element.parent) {
    return element.parent.id;
  }
  return null;
}

export default function generateProduct(element: Category) {
  const { language } = store.getState().local;

  return {
    id: element.id,
    name: grabName(element, language),
    parent: grabParent(element),
  };
}
