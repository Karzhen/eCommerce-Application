export function getRefreshToken() {
  return localStorage.getItem('refreshToken') || null;
}

export function setRefreshToken(token: string) {
  localStorage.setItem('refreshToken', token);
}
