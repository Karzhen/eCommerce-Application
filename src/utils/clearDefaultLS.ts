export default function clearDefaultAddresses() {
  localStorage.removeItem('sameAddressCheck');
  localStorage.removeItem('defaultBilling');
  localStorage.removeItem('defaultShipping');
}
