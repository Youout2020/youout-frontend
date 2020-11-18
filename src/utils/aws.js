// const AWS = require('aws-sdk');

// const config = new AWS.Config({
//   accessKeyId: '<AWS_ACCESS_KEY>',
//   secretAccessKey: '<AWS_SECRET_ACCESS_KEY>',
//   region: '<REGION>', //seoul: ap-northeast-2
// });
// const client = new AWS.Rekognition(config);

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

const compareLabels = ({ keyword, response }) => {
  if (typeof keyword !== 'string') throw Error(`${keyword} should be string`);

  return response.Labels.some((label) => (
    label.Name.toLowerCase() === keyword.toLowerCase()
  ));
};

const detectLabels = (datauri) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockResponse);
    }, 1000);
    // const buffer = Buffer.from(datauri.split(',')[1], 'base64');
    // const params = {
    //   Image: {
    //     Bytes: buffer
    //   },
    //   MaxLabels: 5,
    //   MinConfidence: 70,
    // };

    // client.detectLabels(params, function (err, response) {
    //   if (err) return reject(err);

    //   resolve(mockResponse);
    // });
  });
};



export default {
  compareLabels,
  detectLabels,
};
