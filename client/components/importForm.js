import parseList from '../functions/parseList';

export default function createImportForm(importFormEl, sectionService, pubSub) {
  importFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    importList();
  });

  function importList() {
    const importInputEl = document.getElementById('importInput');
    const groceries = parseList(importInputEl.value);

    sectionService.group(groceries)
      .then((groceryList) => {
        pubSub.publish('groceriesImported', groceryList);
      });

    importInputEl.value = '';
  }
}
