export const MOCK_LAT = 'MOCK_LAT';
export const MOCK_LNG = 'MOCK_LNG';

const mockGeolocation = {
  getCurrentPosition: (callback) => {
    const FAKE_POSITION = {
      coords: {
        latitude: MOCK_LAT,
        longitude: MOCK_LNG,
      },
    };

    callback(FAKE_POSITION, null);
  },
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
