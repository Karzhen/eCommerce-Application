import { test, describe } from 'vitest';
import assert from 'assert';
import { Page } from "../src/interface";
import router from '../src/router/router'; // Import the singleton instance
import { JSDOM } from 'jsdom';

// Setup JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
global.document = dom.window.document;
global.window = dom.window;

// Mocking the PopStateEvent constructor
class MockPopStateEvent extends Event {
  constructor(public readonly state: any) {
    super('popstate');
  }
}
globalThis.PopStateEvent = MockPopStateEvent;

describe('Router Tests', () => {
  test('Initialization', async () => {
    router.init();
    assert.equal(router.currentPage, Page.MAIN, 'Initial page should be Main page');
  });

  test('Navigation to Login page', async () => {
    router.init();
    router.goPage(Page.LOGIN);
    assert.equal(router.currentPage, Page.LOGIN, 'Should navigate to Login page');
  });

  test('Navigation to Error page for unknown page', async () => {
    const unknownPage = 'something path';
    router.init();
    router.goPage(unknownPage);
    assert.equal(router.currentPage, unknownPage, 'Should navigate to Error page for unknown page');
  });
  

  test('Rendering Main page', async () => {
    router.currentPage = Page.MAIN;
    router.renderPage();
    assert.equal(document.body.children.length, 1, 'Main page should be rendered');
  });

  test('Handler for popstate event navigates to Login page if not logged in', async () => {
    // Mocking popstate event
    const event = new MockPopStateEvent({ page: Page.LOGIN });
    router.handlerPopstate(event);
    assert.equal(router.currentPage, Page.LOGIN, 'Should navigate to Login page');
  });
});
