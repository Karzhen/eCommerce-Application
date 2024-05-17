export default function clearDefaultAddresses() {
  localStorage.removeItem('defaultBilling');
  localStorage.removeItem('defaultShipping');
}
