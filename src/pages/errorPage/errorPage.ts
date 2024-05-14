import { Page, Tag, TypeButton } from '@/interface';
import createElement from '@/utils/create-element';
import createButton from '@/components/baseComponents/button/button';
import styles from './errorPage.module.css';

function handlerClickBack(event: Event, goPage: (page: Page) => void) {
  event.preventDefault();
  goPage(Page.MAIN);
}

function createNotFoundMessage() {
  const message = createElement(Tag.H2, {
    id: 'messageTitle',
    textContent: 'Oh no! The requested page was not found.',
    className: styles.messageTitle,
  });
  return message;
}

function createErrorCode() {
  const box = createElement(Tag.DIV, {
    id: 'errorCodeBox',
    className: styles.codeBox,
  });

  const message = createElement(Tag.H3, {
    id: 'errorCode',
    textContent: 'Error code: ',
    className: styles.errorCode,
  });

  const code = createElement(Tag.H3, {
    id: 'code',
    textContent: '404',
    className: styles.code,
  });
  box.append(message, code);
  return box;
}

function createReturnBack(goPage: (page: Page) => void) {
  const box = createElement(Tag.DIV, {
    id: 'backBox',
    className: styles.backBox,
  });
  const textPart = createElement(Tag.P, {
    textContent: 'You can return to',
    className: styles.textParts,
  });
  const button = createButton({
    type: TypeButton.PRIMARY,
    option: {
      id: 'back',
      className: styles.backButton,
      textContent: 'Main Page',
    },
    handler: { handlerClick: (event) => handlerClickBack(event, goPage) },
  });
  box.append(textPart, button);
  return box;
}

function createGif() {
  const wrapper = createElement(Tag.DIV, {
    id: 'wrapperGif',
    className: styles.wrapperGif,
  });
  const gif = createElement(Tag.IMG, {
    id: 'dancingRacoon',
    className: styles.errorGif,
  });
  gif.setAttribute('src', './src/assets/images/error.gif');
  gif.setAttribute('alt', 'Dancing Racoon');
  wrapper.append(gif);
  return wrapper;
}

function createMessageBox() {
  const box = createElement(Tag.DIV, {
    id: 'messageBox',
    className: styles.messageBox,
  });
  box.append(createNotFoundMessage(), createErrorCode());
  return box;
}

function createLinksBox(goPage: (page: Page) => void) {
  const box = createElement(Tag.DIV, {
    id: 'linksBox',
    className: styles.linksBox,
  });

  const wrapper = createElement(Tag.DIV, {
    className: styles.linksWrapper,
  });

  wrapper.append(createGif(), createReturnBack(goPage));

  box.append(wrapper);
  return box;
}

export default function createErrorPage(goPage: (page: Page) => void) {
  const ERROR_PAGE = createElement(Tag.DIV, {
    id: 'errorPage',
    className: styles.errorPage,
  });

  const header = createElement(Tag.DIV, {
    id: 'errorHeader',
    className: styles.errorHeader,
  });

  const mainContent = createElement(Tag.DIV, {
    id: 'errorMain',
    className: styles.errorMain,
  });

  const footer = createElement(Tag.DIV, {
    id: 'errorFooter',
    className: styles.errorFooter,
  });

  mainContent.append(createMessageBox(), createLinksBox(goPage));

  ERROR_PAGE.append(header, mainContent, footer);

  return ERROR_PAGE;
}
