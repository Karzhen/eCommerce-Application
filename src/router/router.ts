import createLoginPage from '@pages/loginPage/loginPage';
import createErrorPage from '@pages/errorPage/errorPage';

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
      default:
        return Page.ERROR;
    }
  }

  goPage(page: Page) {
    window.history.pushState({ page }, '', page);
    this.currentPage = page;
    this.renderPage();
  }

  renderPage() {
    document.body.replaceChildren();
    switch (this.currentPage) {
      case Page.LOGIN:
        document.body.append(createLoginPage());
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
      default:
        this.currentPage = Page.ERROR;
    }
    this.renderPage();
  }
}

const router = new Router();
export default router;
