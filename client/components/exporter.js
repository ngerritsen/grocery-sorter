import copyToClipboard from '../functions/copyToClipboard';

export default function createExporter(listExportEl, pubSub) {
  const clipboardButtonEl = document.getElementById('clipboardButton');

  clipboardButtonEl.addEventListener('click', copyExportToClipboard);
  pubSub.subscribe('listUpdated', updateExport);

  function updateExport(groceryList) {
    listExportEl.textContent = groceryList
      .map(grocery => `${grocery.amount}x ${grocery.name}`)
      .join('\n');
  }

  function copyExportToClipboard() {
    copyToClipboard(listExportEl.textContent);
  }
}
