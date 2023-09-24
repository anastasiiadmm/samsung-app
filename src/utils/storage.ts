import { IJWTokens } from 'interfaces/IJWTokens';

import { tokensLocalStorage } from 'utils/config';

export const defaultLocalStorage = { user: null, token: null };

export const getUserLocalStorage = (tokens: IJWTokens | null = null): IJWTokens | null => {
  try {
    const tokenLocal = JSON.parse(localStorage.getItem(tokensLocalStorage) || '');
    if (!tokenLocal && tokens) return tokens;
    return tokenLocal;
  } catch {
    logoutLocalStorage();
    return null;
  }
};

export const logoutLocalStorage = () => {
  localStorage.clear();
};

export const addLocalStorage = (payload: IJWTokens) => {
  localStorage.setItem(tokensLocalStorage, JSON.stringify(payload));
};
