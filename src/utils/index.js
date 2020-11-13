export const findCookie = (key) => {
  const cookies = document.cookie.split('; ')
    .map((cookie) => cookie.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = value;

      return acc;
    }, {});

  return cookies[key];
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position, err) => {
      if (err) reject(err);

      resolve({
        lat: 126.8719347,
        lng: 33.3765812,
      });
    });
  });
};
