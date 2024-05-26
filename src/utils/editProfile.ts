export default function toggleAllFields(
  container: HTMLElement,
  disable: boolean,
) {
  const inputs = container.querySelectorAll<HTMLInputElement>('input');
  inputs.forEach((input) => {
    const item = input;
    item.disabled = disable;
    item.readOnly = disable;
    if (disable) {
      item.value = '';
    }
  });

  const selects = container.querySelectorAll<HTMLSelectElement>('select');
  selects.forEach((select) => {
    const item = select;
    item.disabled = disable;
    if (disable) {
      item.value = '';
    }
  });
}
