export const getParams = (params: object): string => {
  return params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';
};
