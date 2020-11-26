const logger = (errorMessage) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(errorMessage);
  }
};

let REACT_APP_SERVER_URI = '';

if (process.env.NODE_ENV === 'development') {
  REACT_APP_SERVER_URI = '';
} else {
  REACT_APP_SERVER_URI = process.env.REACT_APP_SERVER_URI;
}

const api = {};

api.get = async({ path, options = {} }) => {
  const token = localStorage.getItem('token');

  try {
    const headers = {
      'content-type': 'application/json',
      authorization: token,
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, errMessage, status } = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
      method: 'GET',
      headers,
    }).then((result) => result.json());

    if (status >= 400) throw Error(errMessage);

    return data;
  } catch (err) {
    logger('🔥 Error fired: business -> api -> get');
    throw(err);
  }
};

api.post = async ({ path, body, options = {} }) => {
  const token = localStorage.getItem('token');

  try {
    const headers = {
      'content-type': 'application/json',
      authorization: token,
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, errMessage, status } = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
      method: 'POST',
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

api.put = async ({ path, body, options = {} }) => {
  const token = localStorage.getItem('token');

  try {
    const headers = {
      'content-type': 'application/json',
      authorization: token,
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, errMessage, status } = await fetch(`${REACT_APP_SERVER_URI}${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    }).then((result) => result.json());

    if (status >= 400) throw Error(errMessage);

    return data;
  } catch (err) {
    logger('🔥 Error fired: business -> api -> put');
    throw (err);
  }
};

api.delete = async ({ path, body, options = {} }) => {
  const token = localStorage.getItem('token');

  try {
    const headers = {
      'content-type': 'application/json',
      authorization: token,
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    await fetch(`${REACT_APP_SERVER_URI}${path}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body),
    });

    return;
  } catch (err) {
    logger('🔥 Error fired: business -> api -> remove');
    console.error(err);
    throw (err);
  }
};

export default api;
