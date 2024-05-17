export default function checkDefaultShipping(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target) return;

  const isChecked = target.checked;
  localStorage.setItem('defaultShipping', isChecked ? 'true' : 'false');
}

export function checkDefaultBilling(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target) return;

  const isChecked = target.checked;
  localStorage.setItem('defaultBilling', isChecked ? 'true' : 'false');
}
