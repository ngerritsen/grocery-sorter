export default function jsonRequest(method, url, body) {
  const options = {
    method,
    headers: new Headers(),
    body: body ? JSON.stringify(body) : null
  };

  options.headers.append('Content-Type', 'application/json');

  return fetch(url, options)
    .then((res) => {
      if (res.status < 200 || res.status >= 400) {
        throw new Error(res.statusText);
      }

      return res.json();
    });
}
