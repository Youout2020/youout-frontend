import { translate } from './kakao';

const AWS = require('aws-sdk');

const config = new AWS.Config({
  accessKeyId: process.env.REACT_APP_AWS_accessKeyId,
  secretAccessKey: process.env.REACT_APP_AWS_secretAccessKey,
  region: 'ap-northeast-2',
});
const client = new AWS.Rekognition(config);

const mockResponse = {
  Labels: [
    {
      Name: 'Accessories',
      Confidence: 99.89769744873047,
      Instances: [],
      Parents: []
    },
    {
      Name: 'Accessory',
      Confidence: 99.89769744873047,
      Instances: [],
      Parents: []
    },
    {
      Name: 'Glasses',
      Confidence: 99.89769744873047,
      Instances: [Array],
      Parents: [Array]
    },
    {
      Name: 'Human',
      Confidence: 99.7414779663086,
      Instances: [],
      Parents: []
    },
    {
      Name: 'Face',
      Confidence: 99.7414779663086,
      Instances: [],
      Parents: [Array]
    },
    {
      Name: 'Person',
      Confidence: 99.7414779663086,
      Instances: [Array],
      Parents: []
    },
    {
      Name: 'Clothing',
      Confidence: 80.54072570800781,
      Instances: [],
      Parents: []
    },
    {
      Name: 'Portrait',
      Confidence: 75.23353576660156,
      Instances: [],
      Parents: [Array]
    },
    {
      Name: 'Photography',
      Confidence: 75.23353576660156,
      Instances: [],
      Parents: [Array]
    },
    {
      Name: 'Beard',
      Confidence: 75.0804672241211,
      Instances: [],
      Parents: [Array]
    }
  ],
  LabelModelVersion: '2.0'
};

const compareLabels = async ({ keyword, response }) => {
  if (typeof keyword !== 'string') throw Error(`${keyword} should be string`);
  const translatedKeyword = await translate(keyword);

  return response.Labels.some((label) => (
    label.Name.toLowerCase() === translatedKeyword.toLowerCase()
  ));
};

const detectLabels = (datauri) => {
  return new Promise((resolve, reject) => {
    resolve(mockResponse);
    // const buffer = Buffer.from(datauri.split(',')[1], 'base64');
    // const params = {
    //   Image: {
    //     Bytes: buffer
    //   },
    //   MaxLabels: 10,
    //   MinConfidence: 70,
    // };

    // client.detectLabels(params, function (err, response) {
    //   if (err) return reject(err);
    //   resolve(response);
    // });
  });
};

export default {
  compareLabels,
  detectLabels,
};
