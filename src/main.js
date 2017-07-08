import createModal from './modal';
import createList from './list';
import createPubSub from './pubSub';
import createImportForm from './importForm';
import createExporter from './exporter';

window.addEventListener('DOMContentLoaded', main);

function main() { // eslint-disable-line max-statements
  const pubSub = createPubSub();

  const exportButtonEl = document.getElementById('exportButton');
  const importButtonEl = document.getElementById('importButton');

  const importModal = createModal(document.getElementById('importModal'));
  const exportModal = createModal(document.getElementById('exportModal'));

  createExporter(document.getElementById('listExport'), pubSub);
  createList(document.getElementById('list'), pubSub);
  createImportForm(document.getElementById('importForm'), pubSub);

  importButtonEl.addEventListener('click', importModal.open);
  exportButtonEl.addEventListener('click', exportModal.open);

  pubSub.subscribe('listUpdated', items => {
    if (items.length > 0) {
      exportButtonEl.removeAttribute('disabled');
      return;
    }

    exportButtonEl.setAttribute('disabled', '');
  });
}
