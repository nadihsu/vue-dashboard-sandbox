const BASE_URL = 'http://localhost:9988/api';

const request = async (method: string, endpoint: string, ...args: (object | undefined)[]) => {
  let body = null;
  let params = null;

  if (args.length === 1) {
    if (method === 'GET') {
      [params] = args;
    }

    if (method !== 'GET') {
      [body] = args;
    }
  }

  const urlWithEndpoint = `${BASE_URL}${endpoint}`;
  const url = new URL(urlWithEndpoint);

  if (params) {
    url.search = new URLSearchParams(params as Record<string, string>).toString();
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    const out = await response.json();
    return out;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default request;
