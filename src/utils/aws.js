import { translate } from './kakao';
import api from './api';

const compareLabels = async ({ keyword, data }) => {
  if (typeof keyword !== 'string') throw Error(`${keyword} should be string`);

  const translatedKeyword = await translate(keyword);

  return data.Labels.some((label) => (
    label.Name.toLowerCase() === translatedKeyword.toLowerCase()
  ));
};

const detectLabels = async (datauri) => {
  return await api.post({ path: '/aws/rekognition', body: { datauri }});
};

export default {
  compareLabels,
  detectLabels,
};
