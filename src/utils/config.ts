const { REACT_APP_ENVIRONMENT } = process.env;

export const tokensLocalStorage = 'infoLocalStorage';

const appEnvironment = REACT_APP_ENVIRONMENT || 'local';

export const apiURL = appEnvironment;
