import store from '@redux/store/configureStore';

export default function samePersonalData(container: HTMLElement) {
  const firstName = (container.querySelector('#name') as HTMLInputElement)
    ?.value;
  const lastName = (container.querySelector('#lastname') as HTMLInputElement)
    ?.value;
  const email = (container.querySelector('#email') as HTMLInputElement)?.value;
  const dateOfBirth = (
    container.querySelector('#dateBirth') as HTMLInputElement
  )?.value;

  const data = store.getState().login.user;

  if (
    firstName === data?.firstName &&
    lastName === data.lastName &&
    email === data.email &&
    dateOfBirth === data.dateOfBirth
  ) {
    return true;
  }
  return false;
}
