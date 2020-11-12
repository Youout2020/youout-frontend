const SERVER_URI = process.env.REACT_APP_SERVER_URI;

const logger = (errorMessage) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(errorMessage);
  }
};

const get = async({ path, options = {} }) => {
  try {
    const headers = {
      'content-type': 'application/json',
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, errMessage, status } = await fetch(`${SERVER_URI}${path}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((result) => result.json());

    if (status >= 400) throw Error(errMessage);

    return data;
  } catch (err) {
    logger('🔥 Error fired: business -> api -> get');
    throw(err);
  }
};

const post = async ({ path, body, options = {} }) => {
  try {
    const headers = {
      'content-type': 'application/json',
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, errMessage, status } = await fetch(`${SERVER_URI}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify(body),
    }).then((result) => result.json());

    if (status >= 400) throw Error(errMessage);

    return data;
  } catch (err) {
    logger('🔥 Error fired: business -> api -> post');
    throw(err);
  }
};

export default {
  get,
  post,
};
