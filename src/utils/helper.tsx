export let store = null;
export const getParams = (params: object): string => {
  return params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';
};

export const injectStore = (_store: any) => {
  store = _store;
};
