import copyToClipboard from './copyToClipboard';

export default function createExporter(listExportEl, pubSub) {
  const clipboardButtonEl = document.getElementById('clipboardButton');

  clipboardButtonEl.addEventListener('click', copyExportToClipboard);
  pubSub.subscribe('listUpdated', updateExport);

  function updateExport(items) {
    listExportEl.textContent = items
      .map(item => `${item.amount}x ${item.name}`)
      .join('\n');
  }

  function copyExportToClipboard() {
    copyToClipboard(listExportEl.textContent);
  }
}