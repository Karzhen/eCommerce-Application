export default function clearDefaultAddresses() {
  localStorage.removeItem('sameAddress');
  localStorage.removeItem('defaultBilling');
  localStorage.removeItem('defaultShipping');
}
