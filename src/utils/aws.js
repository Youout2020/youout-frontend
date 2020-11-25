import { translate } from './kakao';

const AWS = require('aws-sdk');

const config = new AWS.Config({
  accessKeyId: process.env.REACT_APP_AWS_accessKeyId,
  secretAccessKey: process.env.REACT_APP_AWS_secretAccessKey,
  region: 'ap-northeast-2',
});
const client = new AWS.Rekognition(config);

const compareLabels = async ({ keyword, response }) => {
  if (typeof keyword !== 'string') throw Error(`${keyword} should be string`);
  const translatedKeyword = await translate(keyword);

  return response.Labels.some((label) => (
    label.Name.toLowerCase() === translatedKeyword.toLowerCase()
  ));
};

const detectLabels = (datauri) => {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(datauri.split(',')[1], 'base64');
    const params = {
      Image: {
        Bytes: buffer
      },
      MaxLabels: 10,
      MinConfidence: 70,
    };

    client.detectLabels(params, function (err, response) {
      if (err) return reject(err);
      resolve(response);
    });
  });
};

export default {
  compareLabels,
  detectLabels,
};
