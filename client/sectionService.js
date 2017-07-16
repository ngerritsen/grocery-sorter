import jsonRequest from './functions/jsonRequest';

// eslint-disable-next-line max-statements
export default function createSectionService(pubSub) {
  pubSub.subscribe('sectionsReordered', reorder);
  pubSub.subscribe('sectionDeleted', deleteSection);
  pubSub.subscribe('sectionAdded', addSection);

  function populateSections(groceries) {
    return jsonRequest('POST', '/sections/populate', getNames(groceries))
      .then(decorateWithAmounts(groceries));
  }

  function reorder(sections) {
    return jsonRequest('POST', '/sections/reorder', sections);
  }

  function deleteSection(name) {
    return jsonRequest('DELETE', '/sections/' + name);
  }

  function addSection({ name, color }) {
    return jsonRequest('POST', '/sections/' + name, { color });
  }

  function getNames(groceries) {
    return groceries.map(grocery => grocery.name);
  }

  function decorateWithAmounts(groceriesWithAmounts) {
    return result => ({
      groceries: decorateGroceriesWithAmounts(result.groceries, groceriesWithAmounts),
      sections: decorateSectionsWithAmounts(result.sections, groceriesWithAmounts)
    });
  }

  function decorateSectionsWithAmounts(sections, groceriesWithAmounts) {
    return sections.map(section => ({
      ...section,
      groceries: decorateGroceriesWithAmounts(section.groceries, groceriesWithAmounts)
    }));
  }

  function decorateGroceriesWithAmounts(groceries, groceriesWithAmounts) {
    return groceries.map(grocery => ({
      ...grocery,
      amount: groceriesWithAmounts.find(gwa => gwa.name === grocery.name).amount
    }));
  }

  return { populateSections, addSection };
}
