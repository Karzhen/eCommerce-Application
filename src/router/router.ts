import createLoginPage from '@pages/loginPage/loginPage';
import createErrorPage from '@pages/errorPage/errorPage';
import createRegistrationPage from '@pages/registrationPage/registrationPage';

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
        return Page.LOGIN;
      case `${this.BASE_URL}${Page.LOGIN}`:
        return Page.LOGIN;
      case `${this.BASE_URL}${Page.REGISTR}`:
        return Page.REGISTR;
      default:
        return Page.ERROR;
    }
  }

  goPage(page: Page) {
    console.log(this.currentPage);
    console.log(page);
    window.history.pushState({ page }, '', page);
    this.currentPage = page;
    this.renderPage();
  }

  renderPage() {
    document.body.replaceChildren();
    switch (this.currentPage) {
      case Page.LOGIN:
        document.body.append(createLoginPage(this.goPage.bind(this)));
        break;
      case Page.REGISTR:
        document.body.append(createRegistrationPage());
        break;
      default:
        document.body.append(createErrorPage());
    }
  }

  handlerPopstate(event: PopStateEvent) {
    switch (event.state.page) {
      case Page.LOGIN:
        this.currentPage = Page.LOGIN;
        break;
      case Page.REGISTR:
        this.currentPage = Page.REGISTR;
        break;
      default:
        this.currentPage = Page.ERROR;
    }
    this.renderPage();
  }
}

const router = new Router();
export default router;
