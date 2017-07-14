import copyToClipboard from './copyToClipboard';

export default function createExporter(listExportEl, pubSub) {
  const clipboardButtonEl = document.getElementById('clipboardButton');

  clipboardButtonEl.addEventListener('click', copyExportToClipboard);
  pubSub.subscribe('listUpdated', updateExport);

  function updateExport(groupedList) {
    listExportEl.textContent = groupedList
      .map(grocery => `${grocery.amount}x ${grocery.name}`)
      .join('\n');
  }

  function copyExportToClipboard() {
    copyToClipboard(listExportEl.textContent);
  }
}
