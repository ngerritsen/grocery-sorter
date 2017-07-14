export default function createExportButton(exportButtonEl, pubSub) {
  pubSub.subscribe('listUpdated', (groupedList) => {
    if (groupedList.length > 0) {
      exportButtonEl.removeAttribute('disabled');
      return;
    }

    exportButtonEl.setAttribute('disabled', '');
  });
}
