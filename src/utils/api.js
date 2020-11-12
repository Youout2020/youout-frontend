const SERVER_URI = process.env.REACT_APP_SERVER_URI;

const logger = (errorMessage) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(errorMessage);
  }
};

const post = async ({ path, body, options }) => {
  try {
    const headers = {
      'content-type': 'application/json',
      credentials: 'include',
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, status, errMessage } = await fetch(`${SERVER_URI}${path}`, {
      headers,
      body,
    });

    if (status >= 400) throw Error(errMessage);

    return data;
  } catch (err) {
    logger('🔥 Error fired: business -> api -> get');
    throw(err);
  }
};

export default {
  post,
};
