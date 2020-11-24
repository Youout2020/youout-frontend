export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    // resolve({
    //   lat: 37.5058543,
    //   lng: 127.0569843
    // });
    navigator.geolocation.getCurrentPosition((position, err) => {
      if (err) reject(err);

      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  });
};

export const convertMsToMinutes = (milliseconds) => {
  return Math.floor((milliseconds / (1000 * 60)) - 1);
};

export const convertMsToSeconds = (milliseconds) => {
  return (milliseconds % 60000) / 1000;
};

export const convertTimeToMs = (minutes, seconds) => {
  const minutesToMs = minutes * 60 * 1000;
  const secondsToMs = seconds * 1000;

  return minutesToMs + secondsToMs;
};

export const convertTimeFormat = (minutes, seconds) => {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};
