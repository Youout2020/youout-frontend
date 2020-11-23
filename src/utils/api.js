const logger = (errorMessage) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(errorMessage);
  }
};

const api = {};

api.get = async({ path, options = {} }) => {
  const token = localStorage.getItem('token');

  try {
    const headers = {
      'content-type': 'application/json',
      Authorization: token,
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, errMessage, status } = await fetch(`https://api.youout.site${path}`, {
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
      Authorization: token,
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, errMessage, status } = await fetch(`https://api.youout.site${path}`, {
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
      Authorization: token,
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const { data, errMessage, status } = await fetch(`https://api.youout.site${path}`, {
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
      Authorization: token,
    };

    Object.keys(options).forEach((key) => {
      headers[key.toLowerCase()] = options[key];
    });

    const response = await fetch(`https://api.youout.site${path}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body),
    });

    return response;
  } catch (err) {
    logger('🔥 Error fired: business -> api -> remove');
    console.error(err);
    throw (err);
  }
};

export default api;
