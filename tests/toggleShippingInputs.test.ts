import { describe, test, beforeEach, afterEach } from 'vitest';
import assert from 'assert';
import toggleShippingInputs from '../src/utils/toggleInputs';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM();
const { document } = window;

describe('toggleShippingInputs Tests', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <input id="shippingAddress1" type="text" />
      <input id="shippingAddress2" type="text" />
      <select id="shippingCountry1">
        <option value="US">United States</option>
      </select>
      <select id="shippingCountry2">
        <option value="DE">Germany</option>
      </select>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('Should disable all shipping inputs and selects', () => {
    toggleShippingInputs(container, true);

    const inputs = container.querySelectorAll<HTMLInputElement>('input[id*="shipping"]');
    const selects = container.querySelectorAll<HTMLSelectElement>('select[id*="shipping"]');

    inputs.forEach((input) => {
      assert.strictEqual(input.disabled, true);
    });

    selects.forEach((select) => {
      assert.strictEqual(select.disabled, true);
    });
  });

  test('Should enable all shipping inputs and selects', () => {
    toggleShippingInputs(container, false);

    const inputs = container.querySelectorAll<HTMLInputElement>('input[id*="shipping"]');
    const selects = container.querySelectorAll<HTMLSelectElement>('select[id*="shipping"]');

    inputs.forEach((input) => {
      assert.strictEqual(input.disabled, false);
    });

    selects.forEach((select) => {
      assert.strictEqual(select.disabled, false);
    });
  });
});
