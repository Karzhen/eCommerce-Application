import copyBillingToShipping from '@utils/registrationSameInputs';
import validateRegistrForm from '@/pages/registrationPage/registration/validate-registr-form';
import { getCountryCode } from '@/api/apiRegister';
import { getPostalCodePattern } from '@/pages/registrationPage/registration/eventHandlers';
import toggleShippingInputs from './toggleInputs';

export function applyStylesToContainer(element: HTMLElement | Element) {
  if (element instanceof HTMLElement) {
    const item = element;
    item.style.color = 'var(--color-light)';
    item.style.background = 'var(--color-lightest)';
    item.style.font = 'var(--text-header-xs)';
  }
  const header = document.getElementById('shippingTitle');
  if (header) header.style.color = 'var(--color-light)';
}

export function removeStylesToContainer(element: HTMLElement | Element) {
  if (element instanceof HTMLElement) {
    const item = element;
    item.style.color = '';
    item.style.background = '';
  }
  const header = document.getElementById('shippingTitle');
  if (header) {
    header.style.color = 'var(--color-surface-text)';
    header.style.font = `var(--text-header-xs)`;
  }
}

export default function checkSameAddress(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target) return;

  const isChecked = target.checked;
  localStorage.setItem('sameAddress', isChecked ? 'true' : 'false');
  const wrapper = document.getElementById(
    'shipping-address-box',
  ) as HTMLElement;
  toggleShippingInputs(wrapper, isChecked);
  if (isChecked) {
    copyBillingToShipping();
    applyStylesToContainer(wrapper);
  } else {
    removeStylesToContainer(wrapper);
  }
  const selectedCountry = document.getElementById(
    'shippingCountry',
  ) as HTMLSelectElement;
  getPostalCodePattern(selectedCountry?.value);
  getCountryCode(selectedCountry?.value);
  validateRegistrForm();
}
