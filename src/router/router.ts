import createLoginPage from '@pages/loginPage/loginPage';
import createErrorPage from '@pages/errorPage/errorPage';
import createRegistrationPage from '@pages/registrationPage/registrationPage';
import createMainPage from '@pages/mainPage/mainPage';
import createProfilePage from '@pages/profilePage/profilePage';
import createCatalogPage from '@pages/catalogPage/catalogPage';
import createBasketPage from '@pages/basketPage/basketPage';
import createAboutPage from '@pages/aboutPage/aboutPage';

import { Page } from '@/interface';

class Router {
  readonly BASE_URL = '/';

  currentPage: Page | null = null;

  init() {
    window.addEventListener('popstate', this.handlerPopstate.bind(this));

    const initialPage = this.getInitialPage();
    this.goPage(initialPage);
  }

  getInitialPage(): Page {
    const path = window.location.pathname;
    switch (path) {
      case this.BASE_URL:
      case `${this.BASE_URL}${Page.MAIN}`:
        return Page.MAIN;
      case `${this.BASE_URL}${Page.LOGIN}`:
        return Page.LOGIN;
      case `${this.BASE_URL}${Page.REGISTR}`:
        return Page.REGISTR;
      case `${this.BASE_URL}${Page.CATALOG}`:
        return Page.CATALOG;
      case `${this.BASE_URL}${Page.PROFILE}`:
        return Page.PROFILE;
      default:
        return this.getErrorPage(path);
    }
  }

  getErrorPage(path: string): Page {
    if (path.startsWith(this.BASE_URL)) {
      const enteredPath = path.slice(this.BASE_URL.length);
      if (enteredPath.trim() !== '') {
        return enteredPath as Page;
      }
    }
    return Page.ERROR;
  }

  goPage(page: Page) {
    window.history.pushState({ page }, '', page);
    this.currentPage = page;
    this.renderPage();
  }

  renderPage() {
    document.body.replaceChildren();
    switch (this.currentPage) {
      case Page.MAIN:
        document.body.append(createMainPage(this.goPage.bind(this)));
        break;
      case Page.LOGIN:
        document.body.append(createLoginPage(this.goPage.bind(this)));
        break;
      case Page.REGISTR:
        document.body.append(createRegistrationPage(this.goPage.bind(this)));
        break;
      case Page.CATALOG:
        document.body.append(createCatalogPage());
        break;
      case Page.PROFILE:
        document.body.append(createProfilePage());
        break;
      case Page.BASKET:
        document.body.append(createBasketPage());
        break;
      case Page.ABOUT:
        document.body.append(createAboutPage());
        break;
      default:
        document.body.append(createErrorPage(this.goPage.bind(this)));
    }
  }

  handlerPopstate(event: PopStateEvent) {
    switch (event.state.page) {
      case Page.MAIN:
        this.currentPage = Page.MAIN;
        break;
      case Page.LOGIN:
        this.currentPage = Page.LOGIN;
        break;
      case Page.REGISTR:
        this.currentPage = Page.REGISTR;
        break;
      case Page.CATALOG:
        this.currentPage = Page.CATALOG;
        break;
      case Page.PROFILE:
        this.currentPage = Page.PROFILE;
        break;
      default:
        this.currentPage = Page.ERROR;
    }
    this.renderPage();
  }
}

const router = new Router();
export default router;
