export default function toggleShippingInputs(
  container: HTMLElement,
  disable: boolean,
) {
  const inputs = container.querySelectorAll<HTMLInputElement>(
    'input[id*="shipping"]',
  );
  inputs.forEach((input) => {
    const item = input;
    item.disabled = disable;
    item.required = !disable;
    if (disable) {
      item.value = '';
      const errorLabel = document.getElementById(`${item.id}Error`);
      if (errorLabel) {
        errorLabel.textContent = '';
      }
    }
  });

  const selects = container.querySelectorAll<HTMLSelectElement>(
    'select[id*="shipping"]',
  );
  selects.forEach((select) => {
    const item = select;
    item.disabled = disable;
  });
}
