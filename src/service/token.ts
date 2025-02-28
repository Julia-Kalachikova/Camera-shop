const AUTH_TOKEN_NAME = 'b2xpdmVyLmNvbm5lckBnbWFpbC5jb20=' ;
export type Token = string;

export const getToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
};
