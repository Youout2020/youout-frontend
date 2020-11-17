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
    resolve({
      lat: 37.5058543,
      lng: 127.0569843
    });
    // navigator.geolocation.getCurrentPosition((position, err) => {
    //   if (err) reject(err);

    //   resolve({
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   });
    // });
  });
};
