import parseList from './parseList';

export default function createImportForm(importFormEl, sectionService, pubSub) {
  importFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    importList();
  });

  function importList() {
    const importInputEl = document.getElementById('importInput');
    const groceries = parseList(importInputEl.value);

    sectionService.group(groceries)
      .then((groupedGroceries) => {
        pubSub.publish('groceriesImported', groupedGroceries);
      });

    importInputEl.value = '';
  }
}
