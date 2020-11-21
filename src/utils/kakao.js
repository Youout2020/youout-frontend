import api from './api';

const translate = async (word) => {
  const url = `https://dapi.kakao.com/v2/translation/translate?query=${word}&src_lang=kr&target_lang=en`;
  const { REACT_APP_KAKAO_API_KEY } = process.env;
  const result = await api.get({ path: url, option: { Authorization: `KakaoAK ${REACT_APP_KAKAO_API_KEY}` }});
  // result = { "translated_text": [['glasses']]};

  return result['translated_text'][0][0];
};

export default {
  translate
};
