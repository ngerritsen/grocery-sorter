import parseList from './parseList';

export default function createImportForm(importFormEl, pubSub) {
  importFormEl.addEventListener('submit', e => {
    e.preventDefault();
    importList();
  });

  function importList() {
    const importInputEl = document.getElementById('importInput');
    const items = parseList(importInputEl.value);

    pubSub.publish('listImported', items);

    importInputEl.value = '';
  }
}
