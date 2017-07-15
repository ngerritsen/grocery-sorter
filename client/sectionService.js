import jsonRequest from './functions/jsonRequest';

export default function createSectionService() {
  function group(groceries) {
    return jsonRequest('POST', '/sections/group', getNames(groceries))
      .then(decorateWithAmounts(groceries));
  }

  function store(sections) {
    return jsonRequest('POST', '/sections', sections);
  }

  function getNames(groceries) {
    return groceries.map(g => g.name);
  }

  function decorateWithAmounts(groceries) {
    return results => results['groceries'].map(res => ({
      ...res,
      amount: groceries.find(g => g.name === res.name).amount
    }));
  }

  return { group, store };
}
