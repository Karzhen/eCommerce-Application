import state from '@redux/store/configureStore';

import createLoginPage from '@pages/loginPage/login/loginPage';
import createErrorPage from '@pages/errorPage/errorPage';
import createRegistrationPage from '@pages/registrationPage/registration/registrationPage';
import createMainPage from '@pages/mainPage/mainPage';
import createProfilePage from '@pages/profilePage/profilePage';
import createCatalogPage from '@pages/catalogPage/catalogPage';
import createBasketPage from '@pages/basketPage/basket/basketPage';
import createAboutPage from '@pages/aboutPage/about/aboutPage';
import createProductPage from '@pages/productPage/productPage';

import fillProfileFields from '@pages/profilePage/fillProfile';

import { Page } from '@/interface';

export class Router {
  readonly BASE_URL = '/';

  currentPage: Page | null = null;

  currentProductId: string | null = null;

  currentCategories: string[] = [];

  init() {
    window.addEventListener('popstate', this.handlerPopstate.bind(this));

    this.getRout();
    this.renderPage();
  }

  getRout(path: string = window.location.pathname) {
    this.currentPage = null;
    this.currentCategories = [];
    const pathSegments = path.substring(1).split('/');
    const mainPartPath = `/${pathSegments[0]}`;

    switch (mainPartPath) {
      case '/':
        this.currentPage = Page.MAIN;
        window.history.replaceState({}, '', Page.MAIN);
        break;
      case Page.MAIN:
        this.currentPage = Page.MAIN;
        break;
      case Page.LOGIN:
        if (state.getState().login.isLogin) {
          this.currentPage = Page.MAIN;
          window.history.replaceState({}, '', Page.MAIN);
        } else this.currentPage = Page.LOGIN;
        break;
      case Page.REGISTR:
        if (state.getState().login.isLogin) {
          this.currentPage = Page.MAIN;
          window.history.replaceState({}, '', Page.MAIN);
        } else this.currentPage = Page.REGISTR;
        break;
      case Page.PROFILE:
        this.currentPage = Page.PROFILE;
        break;
      case Page.BASKET:
        this.currentPage = Page.BASKET;
        break;
      case Page.ABOUT:
        this.currentPage = Page.ABOUT;
        break;
      case Page.CATALOG:
        if (pathSegments.length > 1) {
          const [, ...categories] = pathSegments;
          this.currentCategories = categories;
          this.currentPage = Page.CATALOG;
        } else {
          this.currentPage = Page.CATALOG;
        }
        break;
      case Page.PRODUCT:
        if (pathSegments.length > 1) {
          const [, productId] = pathSegments;
          this.currentProductId = productId;
          this.currentPage = Page.PRODUCT;
        } else {
          this.currentPage = this.getErrorPage(path);
        }
        break;
      default:
        this.currentPage = this.getErrorPage(path);
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

  goPage(path: string) {
    window.history.pushState({}, '', path);
    this.getRout(path);
    this.renderPage();
  }

  async renderPage() {
    document.body.replaceChildren();
    const bindGoPage = this.goPage.bind(this);
    switch (this.currentPage) {
      case Page.MAIN:
        document.body.append(await createMainPage(bindGoPage));
        break;
      case Page.LOGIN:
        document.body.append(createLoginPage(bindGoPage));
        break;
      case Page.REGISTR:
        document.body.append(createRegistrationPage(bindGoPage));
        break;
      case Page.CATALOG:
        document.body.append(
          await createCatalogPage(bindGoPage, this.currentCategories),
        );
        break;
      case Page.PROFILE:
        document.body.append(createProfilePage(bindGoPage));
        fillProfileFields();
        break;
      case Page.BASKET:
        document.body.append(createBasketPage(bindGoPage));
        break;
      case Page.ABOUT:
        document.body.append(createAboutPage(bindGoPage));
        break;
      case Page.PRODUCT:
        document.body.append(
          createProductPage(bindGoPage, this.currentProductId),
        );
        break;
      default:
        document.body.append(createErrorPage(bindGoPage));
    }
  }

  handlerPopstate(event: PopStateEvent) {
    if (event.state) {
      this.getRout();
      this.renderPage();
    }
  }
}

const router = new Router();
export default router;
