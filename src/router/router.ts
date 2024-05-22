import state from '@redux/store/configureStore';

import createLoginPage from '@/pages/loginPage/login/loginPage';
import createErrorPage from '@pages/errorPage/errorPage';
import createRegistrationPage from '@/pages/registrationPage/registration/registrationPage';
import createMainPage from '@pages/mainPage/mainPage';
import createProfilePage from '@/pages/profilePage/profile/profilePage';
import createCatalogPage from '@/pages/catalogPage/catalog/catalogPage';
import createBasketPage from '@/pages/basketPage/basket/basketPage';
import createAboutPage from '@/pages/aboutPage/about/aboutPage';

import { Page } from '@/interface';

class Router {
  readonly BASE_URL = '/';

  currentPage: Page | null = null;

  init() {
    window.addEventListener('popstate', this.handlerPopstate.bind(this));
    const initialPage = this.getInitialPage();
    this.currentPage = initialPage;
    window.history.replaceState({ page: initialPage }, '', initialPage);
    this.renderPage();
  }

  getInitialPage(): Page {
    const path = window.location.pathname;
    switch (path) {
      case this.BASE_URL:
      case `${this.BASE_URL}${Page.MAIN}`:
        return Page.MAIN;
      case `${this.BASE_URL}${Page.LOGIN}`:
        if (state.getState().login.isLogin) return Page.MAIN;
        return Page.LOGIN;
      case `${this.BASE_URL}${Page.REGISTR}`:
        if (state.getState().login.isLogin) return Page.MAIN;
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
    if (
      (page === Page.LOGIN && state.getState().login.isLogin) ||
      (page === Page.REGISTR && state.getState().login.isLogin)
    ) {
      this.currentPage = Page.MAIN;
    } else {
      this.currentPage = page;
    }
    window.history.pushState({ page: this.currentPage }, '', this.currentPage);
    this.renderPage();
  }

  renderPage() {
    document.body.replaceChildren();
    const bindGoPage = this.goPage.bind(this);
    switch (this.currentPage) {
      case Page.MAIN:
        document.body.append(createMainPage(bindGoPage));
        break;
      case Page.LOGIN:
        document.body.append(createLoginPage(bindGoPage));
        break;
      case Page.REGISTR:
        document.body.append(createRegistrationPage(bindGoPage));
        break;
      case Page.CATALOG:
        document.body.append(createCatalogPage(bindGoPage));
        break;
      case Page.PROFILE:
        document.body.append(createProfilePage(bindGoPage));
        break;
      case Page.BASKET:
        document.body.append(createBasketPage(bindGoPage));
        break;
      case Page.ABOUT:
        document.body.append(createAboutPage(bindGoPage));
        break;
      default:
        document.body.append(createErrorPage(bindGoPage));
    }
  }

  handlerPopstate(event: PopStateEvent) {
    if (event.state) {
      switch (event.state.page) {
        case Page.MAIN:
          this.currentPage = Page.MAIN;
          break;
        case Page.LOGIN:
          if (state.getState().login.isLogin) {
            this.currentPage = Page.MAIN;
            window.history.replaceState({ page: Page.MAIN }, '', Page.MAIN);
          } else this.currentPage = Page.LOGIN;
          break;
        case Page.REGISTR:
          if (state.getState().login.isLogin) {
            this.currentPage = Page.MAIN;
            window.history.replaceState({ page: Page.MAIN }, '', Page.MAIN);
          } else this.currentPage = Page.REGISTR;
          break;
        case Page.CATALOG:
          this.currentPage = Page.CATALOG;
          break;
        case Page.PROFILE:
          this.currentPage = Page.PROFILE;
          break;
        case Page.ABOUT:
          this.currentPage = Page.ABOUT;
          break;
        case Page.BASKET:
          this.currentPage = Page.BASKET;
          break;
        default:
          this.currentPage = Page.ERROR;
      }
      this.renderPage();
    }
  }
}

const router = new Router();
export default router;
