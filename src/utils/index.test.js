import {
  getUserLocation,
  convertMsToMinutes,
  convertMsToSeconds,
  convertTimeToMs,
  convertTimeFormat,
} from './index';
import { MOCK_LAT, MOCK_LNG } from '../setupTests';

describe('utils test', () => {
  it('getUserLocation test', async () => {
    const { lat, lng } = await getUserLocation();

    expect(lat).toEqual(MOCK_LAT);
    expect(lng).toEqual(MOCK_LNG);

    return;
  });

  it('convertMsToMinutes test', () => {
    const MOCK_MS = 120000;
    const MOCK_M = 2;

    const result = convertMsToMinutes(MOCK_MS);

    expect(result).toEqual(MOCK_M);
  });
});
