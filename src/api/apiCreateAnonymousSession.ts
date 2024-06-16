import { getAnonymousApiClient } from './apiAnonymous';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export default async function apiCreateAnonymousSession() {
  const apiRoot = getAnonymousApiClient();

  try {
    await apiRoot.withProjectKey({ projectKey }).get().execute();
  } catch (error) {
    console.error('ERROR --->', error);
  }
}
