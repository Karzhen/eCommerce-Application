import { Customer } from '@/interface';
import store from '@redux/store/configureStore';

export function setUserFields(data: Customer, element: HTMLElement) {
  const inputName = element.querySelector('#name') as HTMLInputElement;
  const inputLastName = element.querySelector('#lastname') as HTMLInputElement;
  const inputDateBirth = element.querySelector(
    '#dateBirth',
  ) as HTMLInputElement;
  const inputEmail = element.querySelector('#email') as HTMLInputElement;

  inputName.value = data?.firstName || '';
  inputLastName.value = data?.lastName || '';
  inputDateBirth.value = data?.dateOfBirth || '';
  inputEmail.value = data?.email || '';
}

export default function fillProfileFields(element: HTMLElement) {
  try {
    const data = store.getState().login.user;

    if (data) {
      setUserFields(data, element);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
