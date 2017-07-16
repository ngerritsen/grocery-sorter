export default function createExportButton(exportButtonEl, pubSub) {
  pubSub.subscribe('groceryListUpdated', (list) => {
    if (list.length > 0) {
      exportButtonEl.removeAttribute('disabled');
      return;
    }

    exportButtonEl.setAttribute('disabled', '');
  });
}
