export const findCookie = (key) => {
  const cookies = document.cookie.split('; ')
    .map((cookie) => cookie.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = value;

      return acc;
    }, {});

  return cookies[key];
};
