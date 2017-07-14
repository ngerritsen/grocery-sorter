export default function createSectionService() {
  function group(groceries) {
    return jsonRequest('POST', '/sections/group', getNames(groceries))
      .then(decorateWithAmounts(groceries));
  }

  function store(sections) {
    return jsonRequest('POST', '/sections', sections);
  }

  function jsonRequest(method, url, body) {
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

  function getNames(groceries) {
    return groceries.map(g => g.name);
  }

  function decorateWithAmounts(groceries) {
    return (results) => {
      results.map(res => ({
        ...res,
        amount: groceries.find(g => g.name === res.name).amount
      }));
    }
  }

  return { group, store };
}
